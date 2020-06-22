package com.ITAcademy.itJocDeDaus.service;

import java.util.List;

import com.ITAcademy.itJocDeDaus.dto.Player;

public interface IPlayerService {
	
	public List<Player> playerList();
	
	public Player savePlayer(Player player);
	
	public Player playerByName(String playerName);
	
	public Player playerById(Long playerId);
	
	public Player updatePlayer(Player player);
	
	public void deletePlayer(String playerName);
}
