package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.entity.ProductPrice;

public interface ProductPriceRepository extends JpaRepository<ProductPrice, Long> {

	@Query("SELECT p FROM ProductPrice p WHERE p.store.storeId = :storeId AND p.productRegDate = (SELECT MAX(sub.productRegDate) FROM ProductPrice sub WHERE sub.store.storeId = :storeId AND sub.product.productId = p.product.productId)")
	List<ProductPrice> findLatestPricesByStore(@Param("storeId") Long storeId);	
}
