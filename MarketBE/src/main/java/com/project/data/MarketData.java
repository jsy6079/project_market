package com.project.data;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.project.entity.Market;
import com.project.repository.MarketRepository;

import lombok.RequiredArgsConstructor;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class MarketData implements CommandLineRunner {

    private final MarketRepository marketRepository;

    @Override
    public void run(String... args) throws Exception {
        if (marketRepository.count() == 0) {
            try (Reader reader = new InputStreamReader(
                    new ClassPathResource("markets.csv").getInputStream(), StandardCharsets.UTF_8);
                 CSVReader csvReader = new CSVReaderBuilder(reader).withSkipLines(1).build()) {

                String[] row;
                while ((row = csvReader.readNext()) != null) {
                    Market market = new Market();
                    market.setMarketName(row[0]);
                    market.setMarketType(row[1]);
                    market.setMarketAddress(row[2]);
                    market.setMarketLat(Double.parseDouble(row[3].replace(",", ".")));
                    market.setMarketLon(Double.parseDouble(row[4].replace(",", ".")));
                    market.setMarketStoreCount(Integer.parseInt(row[5]));
                    market.setMarketItemsList(row[6]);
                    market.setMarketHomePage(row[7]);
                    market.setMarketToliet("Y".equalsIgnoreCase(row[8]));
                    market.setMarketParking("Y".equalsIgnoreCase(row[9]));
                    market.setMarketPhoneNumber(row[10]);

                    marketRepository.save(market);
                }

                System.out.println("시장 데이터 삽입 완료!");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}