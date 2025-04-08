package com.project.data;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;
import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.project.entity.Product;
import com.project.entity.ProductPrice;
import com.project.entity.Store;
import com.project.repository.ProductPriceRepository;
import com.project.repository.ProductRepository;
import com.project.repository.StoreRepository;

import lombok.RequiredArgsConstructor;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class ProductPriceData implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final ProductPriceRepository productPriceRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productPriceRepository.count() == 0) {
            try (Reader reader = new InputStreamReader(
                    new ClassPathResource("prices.csv").getInputStream(),
                    Charset.forName("MS949")
            );
                 CSVReader csvReader = new CSVReaderBuilder(reader).withSkipLines(1).build()) {

                String[] row;
                while ((row = csvReader.readNext()) != null) {
                    if (row.length < 3) continue;

                    Long storeId = Long.parseLong(row[0].trim());
                    Long productId = Long.parseLong(row[1].trim());
                    Long price = Long.parseLong(row[2].trim());

                    Store store = storeRepository.findById(storeId)
                            .orElseThrow(() -> new RuntimeException("Store not found: " + storeId));
                    Product product = productRepository.findById(productId)
                            .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

                    ProductPrice productPrice = new ProductPrice();
                    productPrice.setStore(store);
                    productPrice.setProduct(product);
                    productPrice.setProductPriceCost(price);
                    productPrice.setProductRegDate(LocalDateTime.now());

                    productPriceRepository.save(productPrice);
                }

                System.out.println("ProductPrice 데이터 삽입 완료");

            } catch (Exception e) {
                System.err.println("ProductPrice 데이터 삽입 실패");
                e.printStackTrace();
            }
        }
    }
}