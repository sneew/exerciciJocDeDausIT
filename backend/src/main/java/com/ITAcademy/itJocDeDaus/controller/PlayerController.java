package com.ITAcademy.itJocDeDaus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ITAcademy.itJocDeDaus.dto.Player;
import com.ITAcademy.itJocDeDaus.exception.PlayerNotFoundException;
import com.ITAcademy.itJocDeDaus.exception.RepeatedPlayerException;
import com.ITAcademy.itJocDeDaus.service.PlayerServiceImpl;
import com.ITAcademy.itJocDeDaus.service.RollServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost")
public class PlayerController {
	
	@Autowired
	PlayerServiceImpl playerServiceImpl;

	@Autowired
	RollServiceImpl rollServiceImpl;
	
	//new player
	@PostMapping("/players")
	Player newPlayer(@RequestBody Player newPlayer) throws RepeatedPlayerException {
		Player player =  new Player();
		boolean isRepeated = false;
		List<Player> playerList = playerServiceImpl.playerList();
		
		if(newPlayer.getPlayerName().equals("Anonimous")) {
			return playerServiceImpl.savePlayer(newPlayer);
		}else {
			for(Player p : playerList) {
				if(p.getPlayerName().equals(newPlayer.getPlayerName())) {
					player = p;
					isRepeated = true;
				}
			}
			if (isRepeated) {
				throw new RepeatedPlayerException(player.getPlayerName());
			} else {
				return playerServiceImpl.savePlayer(newPlayer);
			}
		}
	}
	
	//edit player
	@PutMapping("/players/{id}")
	Player replacePlayer(@RequestBody Player newPlayer, @PathVariable Long id) {
		
		Player oldPlayer;
		
		oldPlayer = playerServiceImpl.playerById(id);
		
		oldPlayer.setPlayerName(newPlayer.getPlayerName());
		
		playerServiceImpl.savePlayer(oldPlayer);
		
		return oldPlayer;
	}
	
	//get all players 
	@GetMapping("/players")
	List<Player> playerList(){
		return playerServiceImpl.playerList();
	}
	
	//get one player
	@GetMapping("/players/{playerName}")
	Player one(@PathVariable String playerName) {
		List<Player> playerList = playerServiceImpl.playerList();
		boolean isRepeated = false;
		for (Player p : playerList) {
			if(p.getPlayerName().equals(playerName)) {
				isRepeated = true;
			}
		}
		if (!isRepeated) {
			throw new PlayerNotFoundException(playerName);
		} else {
			return playerServiceImpl.playerByName(playerName);
		}
	}
	
	//get loser
	@GetMapping("/players/ranking/loser")
	Player one() {
		return 
	}
	
	
	//get winner

}
