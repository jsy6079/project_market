package com.project.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeId;

    private String storeName;
    
    private String storeImg;

    @ManyToOne
    @JoinColumn(name = "marketId")
    private Market market;

    @ManyToOne
    @JoinColumn(name = "productCategoryId")
    private ProductCategory productCategory;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<ProductPrice> productPrices = new ArrayList<>();
}