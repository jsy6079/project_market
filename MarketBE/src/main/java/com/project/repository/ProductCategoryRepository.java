package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.Market;
import com.project.entity.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}
