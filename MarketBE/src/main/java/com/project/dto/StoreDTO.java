package com.project.dto;

import com.project.entity.Store;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StoreDTO {
	
	// 점포 상세 정보를 가져오는 DTO
	
    private Long storeId;
    private String storeName;
    private Long marketId;
    private Long productCategoryId;
    private String productCategoryName;

	public static StoreDTO fromEntity(Store store) {
		return new StoreDTO(
				store.getStoreId(),
				store.getStoreName(),
				store.getMarket().getMarketId(),
				store.getProductCategory().getProductCategoryId(),
				store.getProductCategory().getProductCategoryName()
		);
	}

}
