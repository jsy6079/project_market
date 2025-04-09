package com.project.dto;

import com.project.entity.ProductPrice;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StorePriceCompareDTO {
	
	// 점포별 해당하는 상품의 가격을 가져오는 DTO
	
	private Long marketId;
	private String marketName;
	private String marketAdress;
	
	private Long storeId;
	private String storeName;
	
	private Long productId;
	private String productName;
	private Long productPriceCost;
	
	
	public static StorePriceCompareDTO formEntiry(ProductPrice productPrice) {
		return new StorePriceCompareDTO(
				productPrice.getStore().getMarket().getMarketId(),
				productPrice.getStore().getMarket().getMarketName(),
				productPrice.getStore().getMarket().getMarketAddress(),
				productPrice.getStore().getStoreId(),
				productPrice.getStore().getStoreName(),
				productPrice.getProductPriceId(),
				productPrice.getProduct().getProductName(),
				productPrice.getProductPriceCost()
		);
	}

}
