package com.project.data;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.project.entity.Product;
import com.project.entity.ProductCategory;
import com.project.repository.ProductCategoryRepository;
import com.project.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class ProductData implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            try (Reader reader = new InputStreamReader(
                    new ClassPathResource("products.csv").getInputStream(),
                    Charset.forName("MS949")
            );
                 CSVReader csvReader = new CSVReaderBuilder(reader).withSkipLines(1).build()) {

                String[] row;
                while ((row = csvReader.readNext()) != null) {
                    if (row.length < 3) continue;

                    String name = row[0].trim();
                    String desc = row[1].trim();
                    Long categoryId = Long.parseLong(row[2].trim());

                    ProductCategory category = productCategoryRepository.findById(categoryId)
                            .orElseThrow(() -> new RuntimeException("❌ 카테고리 없음: " + categoryId));

                    Product product = new Product();
                    product.setProductName(name);
                    product.setProductDescription(desc);
                    product.setProductCategory(category);

                    productRepository.save(product);
                }

                System.out.println("✅ Product 데이터 삽입 완료!");
            } catch (Exception e) {
                System.err.println("❌ Product 데이터 삽입 실패");
                e.printStackTrace();
            }
        }
    }
}