package com.project.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.dto.MarketDTO;
import com.project.repository.MarketRepository;

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
