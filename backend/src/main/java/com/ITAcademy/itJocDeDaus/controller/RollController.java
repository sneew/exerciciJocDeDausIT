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

import com.ITAcademy.itJocDeDaus.dto.Roll;
import com.ITAcademy.itJocDeDaus.service.RollServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost")
public class RollController {
	
	@Autowired
	RollServiceImpl rollServiceImpl;
	
	
	@PostMapping("/players/{id}/games/")
	Roll newRoll(@RequestBody Roll newRoll) {
		return rollServiceImpl.saveRoll(newRoll);
	}
	
	@DeleteMapping("/players/{id}/games/")
	void deleteRoll(@PathVariable Long id) {
		rollServiceImpl.deleteRoll(id);
	}
	
	@GetMapping("/players/{id}/games")
	List<Roll> all(){
		return rollServiceImpl.rollList();
	}

}
