package com.project.service;

import java.util.List;

import com.project.dto.StoreDTO;

public interface StoreService {

	// 점포 정보 불러오기
	List<StoreDTO> getStore(Long marketId);

}
