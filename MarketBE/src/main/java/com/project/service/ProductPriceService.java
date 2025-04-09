package com.project.service;

import java.util.List;

import com.project.dto.StorePriceCompareDTO;

public interface ProductPriceService {

	// 상품별 점포 금액 리스트
	List<StorePriceCompareDTO> getProductPrice(Long productId, String sort);

}
