package com.ITAcademy.itJocDeDaus.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ITAcademy.itJocDeDaus.dto.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {
	
	Player findByplayerName(String name);
	/**
	 * Returns whether an entity with the given id exists.
	 *
	 * @param id must not be {@literal null}.
	 * @return {@literal true} if an entity with the given id exists, {@literal false} otherwise.
	 * @throws IllegalArgumentException if {@literal id} is {@literal null}.
	 */
	
}
