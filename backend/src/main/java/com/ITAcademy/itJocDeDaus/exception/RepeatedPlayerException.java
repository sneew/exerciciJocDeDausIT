package com.ITAcademy.itJocDeDaus.exception;

public class RepeatedPlayerException extends Exception {

	public RepeatedPlayerException(String playerName) {
		super("The name player " + playerName + " already exists");
	}
}
