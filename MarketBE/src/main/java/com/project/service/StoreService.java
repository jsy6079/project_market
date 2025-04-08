package com.project.service;

import java.util.List;

import com.project.dto.StoreDTO;
import com.project.dto.StorePriceDTO;

public interface StoreService {

	// 점포 정보 불러오기
	List<StoreDTO> getStore(Long marketId);

	// 점포 가격 불러오기
	List<StorePriceDTO> getStorePrice(Long storeId);

}
