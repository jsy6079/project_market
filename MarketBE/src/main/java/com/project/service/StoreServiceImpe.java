package com.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.dto.StoreDTO;
import com.project.entity.Market;
import com.project.repository.MarketRepository;
import com.project.repository.StoreRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreServiceImpe implements StoreService {
	
	private final MarketRepository marketRepository;
	private final StoreRepository storeRepository;
	
	// 점포 정보 불러오기
	@Override
	public List<StoreDTO> getStore(Long marketId) {
		
		Market market = marketRepository.findById(marketId).orElseThrow(()-> new IllegalArgumentException("해당 시장이 존재하지 않습니다."));
		
		return storeRepository.findByMarket(market)
				.stream()
				.map(StoreDTO::fromEntity)
				.collect(Collectors.toList());
	}

}
