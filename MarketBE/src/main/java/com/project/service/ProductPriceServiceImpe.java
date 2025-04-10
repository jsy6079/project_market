package com.project.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.StorePriceCompareDTO;
import com.project.entity.Product;
import com.project.entity.ProductPrice;
import com.project.repository.ProductPriceRepository;
import com.project.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductPriceServiceImpe implements ProductPriceService {
	
	private final ProductPriceRepository productPriceRepository;
	private final ProductRepository productRepository;

	// 상품별 점포 금액 리스트
	@Override
	public List<StorePriceCompareDTO> getProductPrice(Long productId, String sort) {
		
	    Product product = productRepository.findById(productId).orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다."));
		
	    List<ProductPrice> pricePrice = productPriceRepository.findLatestPricesByProduct(productId);
	    
	    if(sort.equals("asc")) {
	    	pricePrice.sort(Comparator.comparing(ProductPrice::getProductPriceCost));
	    } else if(sort.equals("desc")) {
	    	pricePrice.sort(Comparator.comparing(ProductPrice::getProductPriceCost).reversed());
	    }

	    return pricePrice.stream()
	            .map(StorePriceCompareDTO::formEntiry)
	            .toList();
	}

	// 해당 상품의 해당 점포 금액 (결과 1개)
	@Override
	public List<StorePriceCompareDTO> getDetailProductPrice(Long productPriceId) {
		
		ProductPrice productPrice = productPriceRepository.findById(productPriceId).orElseThrow(() -> new IllegalArgumentException("해당 상품의 가격이 존재하지 않습니다."));
		
		
		// 객체 하나만 받을때
		return List.of(StorePriceCompareDTO.formEntiry(productPrice));
	}
		
		
	

}
