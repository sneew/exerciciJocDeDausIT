package com.ITAcademy.itJocDeDaus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ITAcademy.itJocDeDaus.dto.Player;
import com.ITAcademy.itJocDeDaus.dto.Roll;
import com.ITAcademy.itJocDeDaus.service.PlayerServiceImpl;
import com.ITAcademy.itJocDeDaus.service.RollServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost")
public class RollController {
	
	@Autowired
	RollServiceImpl rollServiceImpl;
	
	@Autowired
	PlayerServiceImpl playerServiceImpl;
	
	
	@GetMapping("/players/{id}/games")
	List<Roll> all(@PathVariable Long id){
		return rollServiceImpl.findAllByPlayerId(id);
	}
	
	@PostMapping("/players/{id}/games")
	Roll newRoll(@RequestBody Roll newRoll, @PathVariable Long id) {
		Player player = playerServiceImpl.playerById(id);
		newRoll.setPlayer(player);
		newRoll.introResult(newRoll.getDice1(), newRoll.getDice2());
		return rollServiceImpl.saveRoll(newRoll);
	}
	
	@DeleteMapping("/players/{id}/games")
	void deleteRoll(@PathVariable Long id) {
		List<Roll> rList = rollServiceImpl.findAllByPlayerId(id);
		for (Roll r : rList) {
			rollServiceImpl.deleteRoll(r.getId());
		}
	}
}
