package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.Market;

public interface MarketRepository extends JpaRepository<Market, Long> {

}
