package com.ITAcademy.itJocDeDaus.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ITAcademy.itJocDeDaus.dto.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {
	
	Player findByplayerName(String name);
	
}
