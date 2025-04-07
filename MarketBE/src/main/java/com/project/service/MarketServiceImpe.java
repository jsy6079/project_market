package com.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.dto.MarketDTO;
import com.project.dto.StoreDTO;
import com.project.entity.Market;
import com.project.repository.MarketRepository;
import com.project.repository.StoreRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MarketServiceImpe implements MarketService {
	
	private final MarketRepository marketRepository;

	// 마켓 정보 불러오기
	@Override
	public List<MarketDTO> getMarket() {
			return marketRepository.findAll()
					.stream()
					.map(MarketDTO::fromEntity)
					.collect(Collectors.toList());
	}

}
