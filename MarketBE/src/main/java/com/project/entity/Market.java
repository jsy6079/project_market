package com.project.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Market {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @OneToMany(mappedBy = "market", cascade = CascadeType.ALL)
    private List<Store> stores = new ArrayList<>();
}