package com.ITAcademy.itJocDeDaus.service;

import java.util.List;

import com.ITAcademy.itJocDeDaus.dto.Roll;

public interface IRollService {
	
	public List<Roll> rollList();

	public Roll saveRoll(Roll roll);
	
	public Roll rollById(Long id);
	
	public Roll updateRoll(Roll roll);
	
	public void deleteRoll(Long id);
}
