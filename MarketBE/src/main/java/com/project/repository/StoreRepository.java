package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.entity.Market;
import com.project.entity.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {

	List<Store> findByMarket(Market market);


}
