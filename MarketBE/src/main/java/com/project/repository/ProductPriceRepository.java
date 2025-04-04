package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.Market;
import com.project.entity.ProductPrice;

public interface ProductPriceRepository extends JpaRepository<ProductPrice, Long> {

}
