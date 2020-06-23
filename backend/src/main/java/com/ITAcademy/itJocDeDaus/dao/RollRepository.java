package com.ITAcademy.itJocDeDaus.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ITAcademy.itJocDeDaus.dto.Roll;

public interface RollRepository extends JpaRepository<Roll, Long> {

	List<Roll> findAllByPlayerId(Long id);

}
