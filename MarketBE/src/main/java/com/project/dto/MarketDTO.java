package com.project.dto;

import com.project.entity.Market;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MarketDTO {
	
	// 시장 정보를 가져오는 DTO
	
    private Long marketId;

    private String marketName;
    private String marketType;
    private String marketAddress;
    private Double marketLat;
    private Double marketLon;
    private int marketStoreCount;
    private String marketItemsList;
    private String marketHomePage;
    private Boolean marketToliet;
    private Boolean marketParking;
    private String marketPhoneNumber;
    
	public static MarketDTO fromEntity(Market market) {
		return new MarketDTO(
				market.getMarketId(),
				market.getMarketName(),
				market.getMarketType(),
				market.getMarketAddress(),
				market.getMarketLat(),
				market.getMarketLon(),
				market.getMarketStoreCount(),
				market.getMarketItemsList(),
				market.getMarketHomePage(),
				market.getMarketToliet(),
				market.getMarketParking(),
				market.getMarketPhoneNumber()
				
		);
	}

}
