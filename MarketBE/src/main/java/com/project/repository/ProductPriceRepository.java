package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.entity.Product;
import com.project.entity.ProductPrice;

public interface ProductPriceRepository extends JpaRepository<ProductPrice, Long> {

	// 점포 1개에 상품 리스트 나열 (최신 기준)
	@Query("SELECT p FROM ProductPrice p WHERE p.store.storeId = :storeId AND p.productRegDate = (SELECT MAX(sub.productRegDate) FROM ProductPrice sub WHERE sub.store.storeId = :storeId AND sub.product.productId = p.product.productId)")
	List<ProductPrice> findLatestPricesByStore(@Param("storeId") Long storeId);

	// 상품별 점포 여러 리스트 나열 (최신 기준)
	@Query("SELECT p FROM ProductPrice p WHERE p.product.productId = :productId AND p.productRegDate = (SELECT MAX(sub.productRegDate)FROM ProductPrice sub WHERE sub.product.productId = :productId AND sub.store.storeId = p.store.storeId)")
		List<ProductPrice> findLatestPricesByProduct(@Param("productId") Long productId);

}
