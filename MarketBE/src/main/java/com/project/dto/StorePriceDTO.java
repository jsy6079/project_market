package com.project.dto;

import java.time.LocalDateTime;

import com.project.entity.ProductPrice;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StorePriceDTO {
	
	private Long productPriceId;
	private Long productPriceCost;
	private LocalDateTime proudctRegDate;
	private Long storeId;
	private Long productId;
	private String productName;
	private String productDescription;
	
	public static StorePriceDTO fromEntity(ProductPrice productPrice) {
		return new StorePriceDTO(
				productPrice.getProductPriceId(),
				productPrice.getProductPriceCost(),
				productPrice.getProductRegDate(),
				productPrice.getStore().getStoreId(),
				productPrice.getProduct().getProductId(),
				productPrice.getProduct().getProductName(),
				productPrice.getProduct().getProductDescription()
		);
	}

}
