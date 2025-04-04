package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.Market;
import com.project.entity.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {

}
