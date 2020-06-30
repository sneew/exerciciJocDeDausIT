package com.ITAcademy.itJocDeDaus.dto;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "roll")
public class Roll {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int dice1;
	private int dice2;
	private int dice3;
	private int dice4;
	private int dice5;
	private int dice6;
	private Result result;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="player_id")
	@JsonIgnore
	private Player player;

	public Roll() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public int getDice1() {
		return dice1;
	}

	public void setDice1(int dice1) {
		this.dice1 = dice1;
	}

	public int getDice2() {
		return dice2;
	}

	public void setDice2(int dice2) {
		this.dice2 = dice2;
	}

	public Result getResult() {
		return result;
	}

	public void setResult(Result result) {
		this.result = result;
	}

	public int getDice3() {
		return dice3;
	}

	public void setDice3(int dice3) {
		this.dice3 = dice3;
	}

	public int getDice4() {
		return dice4;
	}

	public void setDice4(int dice4) {
		this.dice4 = dice4;
	}

	public int getDice5() {
		return dice5;
	}

	public void setDice5(int dice5) {
		this.dice5 = dice5;
	}

	public int getDice6() {
		return dice6;
	}

	public void setDice6(int dice6) {
		this.dice6 = dice6;
	}

	public void introResult(int d1, int d2, int d3, int d4, int d5, int d6) {
		if (d3 == 0 && (d1 + d2) == 7) {
			this.result = result.WINNER;
		}else if (d3 == 0 && (d1 + d2) != 7){
			this.result = result.LOSER;
		}else if((d1 + d2 + d3 + d4 + d5 + d6) == 6 || (d1 + d2 + d3 + d4 + d5 + d6) == 5) {
			this.result = result.WINNER;
		}else {
			this.result = result.LOSER;
		}
		
	}	

}
