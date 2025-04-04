package com.project.data;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.project.entity.ProductCategory;
import com.project.repository.ProductCategoryRepository;

import lombok.RequiredArgsConstructor;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class ProductCategoryData implements CommandLineRunner {

    private final ProductCategoryRepository productCategoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productCategoryRepository.count() == 0) {
            String[] cn = {"농산물","축산물","수산물"};

            for (String name : cn) {
                ProductCategory productCategory = new ProductCategory();
                productCategory.setProductCategoryName(name);
                productCategoryRepository.save(productCategory);
            }

            System.out.println("카테고리 데이터 삽입 성공");
        }
    }
}