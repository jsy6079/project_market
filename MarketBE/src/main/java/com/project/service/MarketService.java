package com.project.service;

import java.util.List;

import com.project.dto.MarketDTO;

public interface MarketService {

	// 마켓 정보 불러오기
	List<MarketDTO> getMarket();

}
