package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.MarketDTO;
import com.project.service.MarketService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/market")
public class MarketController {
	
	private final MarketService marketService;
	
	// 마켓 정보 불러오기
	@GetMapping("/")
	public ResponseEntity<List<MarketDTO>> getMarket(){
		
		List<MarketDTO> response = marketService.getMarket();
		
		return ResponseEntity.ok(response);
		
	}

}
