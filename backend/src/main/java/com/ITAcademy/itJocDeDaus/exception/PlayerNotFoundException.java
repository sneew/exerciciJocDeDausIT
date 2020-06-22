package com.ITAcademy.itJocDeDaus.exception;


public class PlayerNotFoundException extends RuntimeException {

	public PlayerNotFoundException(String playerName) {
		super("The name player " + playerName + " already exists");
	}
}
