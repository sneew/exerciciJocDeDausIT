package com.ITAcademy.itJocDeDaus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ITAcademy.itJocDeDaus.dao.RollRepository;
import com.ITAcademy.itJocDeDaus.dto.Roll;

@Service
public class RollServiceImpl implements IRollService{
	@Autowired
	RollRepository rollRepository;

	@Override
	public List<Roll> rollList(){
		return rollRepository.findAll();
	}

	@Override
	public Roll saveRoll(Roll roll) {
		return rollRepository.save(roll);
	}

	@Override
	public Roll rollById(Long id) {
		return rollRepository.findById(id).get();
	}

	@Override
	public Roll updateRoll(Roll roll) {
		return rollRepository.save(roll);
	}

	@Override
	public void deleteRoll(Long id) {
		rollRepository.deleteById(id);
	}

	@Override
	public List<Roll> findAllByPlayerId(Long id) {
		// TODO Auto-generated method stub
		return rollRepository.findAllByPlayerId(id);
	}
	
	

}
