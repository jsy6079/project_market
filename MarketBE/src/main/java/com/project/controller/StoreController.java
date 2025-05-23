package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.StoreDTO;
import com.project.dto.StorePriceDTO;
import com.project.service.StoreService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store")
public class StoreController {
	
	private final StoreService storeService;
	
	// 점포 정보 불러오기
	@GetMapping("/{marketId}")
	public ResponseEntity<List<StoreDTO>> getStore(@PathVariable(name = "marketId") Long marketId){
		
		List<StoreDTO> response = storeService.getStore(marketId);
		
		return ResponseEntity.ok(response);
	}
	
	// 점포 가격 불러오기
	@GetMapping("/detail/{storeId}")
	public ResponseEntity<List<StorePriceDTO>> getStorePrice(@PathVariable(name = "storeId") Long storeId){
		
		List<StorePriceDTO> response = storeService.getStorePrice(storeId);
		
		return ResponseEntity.ok(response);
	}

}
