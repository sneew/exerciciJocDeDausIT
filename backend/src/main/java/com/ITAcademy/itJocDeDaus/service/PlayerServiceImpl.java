package com.ITAcademy.itJocDeDaus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ITAcademy.itJocDeDaus.dao.PlayerRepository;
import com.ITAcademy.itJocDeDaus.dto.Player;

@Service
public class PlayerServiceImpl implements IPlayerService{
	
	@Autowired
	PlayerRepository playerRepository;
	
	@Override
	public List<Player> playerList(){
		return playerRepository.findAll();
	}

	@Override
	public Player savePlayer(Player player) {
		return playerRepository.save(player);
	}

	@Override
	public Player playerByName(String playerName) {
		return playerRepository.findByplayerName(playerName);
	}
	
	@Override
	public Player playerById(Long playerId) {
		return playerRepository.findById(playerId).get(); //sense el get no agafa bé el tipus
	}

	@Override
	public Player updatePlayer(Player player) {
		// TODO Auto-generated method stub
		return playerRepository.save(player);
	}

	@Override
	public void deletePlayer(String playerName) {
		Player player = playerRepository.findByplayerName(playerName);
		playerRepository.delete(player);
		
	}

}
