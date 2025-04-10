package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.StorePriceCompareDTO;
import com.project.service.ProductPriceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductPriceController {
	
	private final ProductPriceService productPriceService;
	
	// 상품별 점포 금액 리스트
	@GetMapping("/cost/{productId}")
	public ResponseEntity<List<StorePriceCompareDTO>> getProductPrice(@PathVariable (name = "productId") Long productId, @RequestParam(name = "sort") String sort){
		List<StorePriceCompareDTO> response = productPriceService.getProductPrice(productId,sort);
		
		return ResponseEntity.ok(response);
	}
	
	
	// 해당 상품의 해당 점포 금액 (결과 1개)
	@GetMapping("/cost/detail/{productPriceId}")
	public ResponseEntity<List<StorePriceCompareDTO>> getDetailProductPrice(@PathVariable (name = "productPriceId") Long productPriceId){
		List<StorePriceCompareDTO> response = productPriceService.getDetailProductPrice(productPriceId);
		
		return ResponseEntity.ok(response);
	}
	
	

}
