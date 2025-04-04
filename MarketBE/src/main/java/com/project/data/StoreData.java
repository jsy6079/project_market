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
import com.project.entity.Market;
import com.project.entity.ProductCategory;
import com.project.entity.Store;
import com.project.repository.MarketRepository;
import com.project.repository.ProductCategoryRepository;
import com.project.repository.StoreRepository;

import lombok.RequiredArgsConstructor;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class StoreData implements CommandLineRunner {

    private final StoreRepository storeRepository;
    private final MarketRepository marketRepository;
    private final ProductCategoryRepository productCategoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (storeRepository.count() == 0) {
            try (Reader reader = new InputStreamReader(
                    new ClassPathResource("stores.csv").getInputStream(), Charset.forName("MS949"));
                 CSVReader csvReader = new CSVReaderBuilder(reader).withSkipLines(1).build()) {

                String[] row;
                while ((row = csvReader.readNext()) != null) {
                    if (row.length < 3) continue;

                    String storeName = row[0].trim();
                    Long marketId = Long.parseLong(row[1].trim());
                    Long categoryId = Long.parseLong(row[2].trim());

                    Market market = marketRepository.findById(marketId)
                            .orElseThrow(() -> new RuntimeException("Market not found: " + marketId));
                    ProductCategory category = productCategoryRepository.findById(categoryId)
                            .orElseThrow(() -> new RuntimeException("Category not found: " + categoryId));

                    Store store = new Store();
                    store.setStoreName(storeName);
                    store.setMarket(market);
                    store.setProductCategory(category);

                    storeRepository.save(store);
                }

                System.out.println("✅ Store 데이터 삽입 완료!");

            } catch (Exception e) {
                System.err.println("❌ Store 데이터 삽입 실패");
                e.printStackTrace();
            }
        }
    }
}