	//ajax + jquery
$(function(){
	// declarem espais html on insertar
	var $playersList = $('#playersList');
	var $rollsList = $('#rollsList');
	var $welcome = $('#welcome');
	var $bestWorst = $('#bestWorst');
	//rebem inputs
	var $userName;
	var $playerId;
	//declarem urls
	var $baseUrl = "http://localhost:8080";

	//GET players  ---- falta mitja de tots els jugadors
	$.ajax({
		type: 'GET',
		url: $baseUrl + '/players',

		success: function(players){
			
			$.each(players, function(i, player){
				
				$playersList.append(
					"<li>" +
						"<p>" + player.playerName + " (<span id='playerPercent"+ player.id +"'></span> %) </p>" +
					"</li>"
				);
				percent(player);
				console.log('success', player)
			});
		},
		error: function(){
			alert('error loading');
		}
	});
	
	//POST players
	$('#enterGame').on('click', function() {
		$userName = $('#newUserName');
		if($userName.val() != ""){
			var player = {
				playerName: $userName.val(),
			};
			
			$.ajax({
				type: 'POST',
				url: $baseUrl + '/players',
				contentType: "application/json",
				data: JSON.stringify(player),
				success: function(newPlayer){
					console.log('success', newPlayer);
					$playerId = newPlayer.id;
					insideLogin();
					getRolls($rollsList, $baseUrl, $playerId);
				},
				error: function(){
					alert('error posting new player');
				}
			});
		}else {
			alert('Write a name');
		}
	});

	//Get 1 player
	$('#enterGameUser').on('click', function() {
		$userName = $('#userName');
		if($userName.val() != ""){
			$.ajax({
				type: 'GET',
				url: $baseUrl + '/players/'+ $userName.val(),
				success: function(player){
					console.log('success', player);
					$playerId = player.id;
					$welcome.append(player.playerName + "!");
					insideLogin();
					getRolls($rollsList, $baseUrl, $playerId);
				},
				error: function(){
					alert('error getting player');
				}
			});
		}else {
			alert('Write a name');
		}
	});

	//POST anonimous
	$('#enterGameAnonimous').on('click', function() {

		var player = {
			playerName: 'Anonimous',
		};
		
		$.ajax({
			type: 'POST',
			url: $baseUrl + '/players',
			contentType: "application/json",
			data: JSON.stringify(player),
			success: function(newPlayer){
				console.log('success', newPlayer);
				$playerId = newPlayer.id;
				insideLogin();
			},
			error: function(){
				alert('error posting anonimous');
			}
		});
	});

	//POST & GET Rolls
	$('#roll').on('click', function() {	
		var d1 = Math.floor(Math.random() * (6 - 1 + 1)) + 1; // return Math.floor(Math.random() * (max - min + 1)) + min;
		var d2 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		var d3 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		var d4 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		var d5 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		var d6 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

		var insertDice1 = document.getElementById("number1");
		var insertDice2 = document.getElementById("number2");
		var insertDice3 = document.getElementById("number3");
		var insertDice4 = document.getElementById("number4");
		var insertDice5 = document.getElementById("number5");
		var insertDice6 = document.getElementById("number6");

		insertDice1.innerHTML = d1;
		insertDice2.innerHTML = d2;
		insertDice3.innerHTML = d3;
		insertDice4.innerHTML = d4;
		insertDice5.innerHTML = d5;
		insertDice6.innerHTML = d6;

		var roll;
		
		if (document.getElementById("dice3").style.display == "none"){
			roll = {
				dice1: d1,
				dice2: d2,
			}
		}else{
			roll = {
				dice1: d1,
				dice2: d2,
				dice3: d3,
				dice4: d4,
				dice5: d5,
				dice6: d6,
			};
		}


		//POST Rolls
		$.ajax({
			type: 'POST',
			url: $baseUrl + '/players/'+ $playerId + '/games',
			contentType: "application/json",
			data: JSON.stringify(roll),
			success: function(newRoll){
				winlos(d1, d2, d3, d4, d5, d6);
				console.log('success',newRoll);
			},
			error: function(){
				alert('error posting new roll');
			}
		});
		
	});

	//DELETE all rolls
	$('#delete').on('click', function(){
		$.ajax({
			type:'DELETE',
			url: $baseUrl + '/players/' + $playerId + '/games',
			success: function(){
				$rollsList.html("");
			}
		});
	});

	//PUT player name (editar nom jugador)
	$('#edit').on('click', function(){
		$newName = $('#playerNewName');

		var newPlayer = {
			playerName : $newName.val(),
		};

		$.ajax({
			type: 'PUT',
			url: $baseUrl + '/players/' + $playerId,
			contentType: "application/json",
			data: JSON.stringify(newPlayer),
			success: function(newEditPlayer){
				console.log('success', newEditPlayer);
			},
			error: function(){
				alert('error editing name');
			}
		});
	});

	//Get winner
	$.ajax({
		type: 'GET',
		url: $baseUrl + '/players/ranking/winner',

		success: function(player){
			$bestWorst.append(
				"<p>BEST PLAYER: " + player.playerName  + " (<span id='playerPercent"+ player.id +"'></span> %) </p>"
			);
			percent(player);
			console.log('success', player);
		},
		error: function(){
			alert('error loading');
		}
	});

	//Get loser
	$.ajax({
		type: 'GET',
		url: $baseUrl + '/players/ranking/loser',

		success: function(player){
			$bestWorst.append(
				"<p>WORST PLAYER: " + player.playerName  + " (<span id='playerPercent"+ player.id +"'></span> %) </p>"
			);
			percent(player);
			console.log('success', player);
		},
		error: function(){
			alert('error loading');
		}
	});
});

function getRolls($rollsList, $baseUrl, $playerId){
	//GET Rolls
	$rollsList.html("");

	$.ajax({
		type: 'GET',
		url: $baseUrl + '/players/'+ $playerId +'/games',

		success: function(rolls){
			$.each(rolls, function(i, roll){
				$rollsList.append(
					"<li>"+
						"<p>" + roll.id  +": "+ roll.result + " (" + roll.dice1 + " + " + roll.dice2 + ")</p>" +
					"</li>"
				);
				console.log('success', roll)
			});
		},
		error: function(){
			alert('error loading rolls');
		}
	});
}

function insideLogin(){
	var arrayOfPage1 = document.getElementsByClassName("page1");
	for(var i = 0; i < arrayOfPage1.length; i++){
		arrayOfPage1[i].style.display ="none";
	}

	var arrayOfPage2 = document.getElementsByClassName("page2");
	
	for(var i = 0; i < arrayOfPage2.length; i++){
		arrayOfPage2[i].style.display ="block";
	}

}

function winlos(dau1, dau2, dau3, dau4, dau5, dau6){
	document.getElementById("winlos").style.display = "block";
	if(document.getElementById("dice3").style.display == "none" && (dau1 + dau2) == 7){
		document.getElementById("rollResult").innerHTML = "WINNER!";
	}else if (document.getElementById("dice3").style.display == "none" && (dau1 + dau2) != 7){
		document.getElementById("rollResult").innerHTML = "LOSER... :(";
	}else if ((dau1 + dau2 + dau3 + dau4 + dau5 + dau6) == 6 || (dau1 + dau2 + dau3 + dau4 + dau5 + dau6) == 5){
		document.getElementById("rollResult").innerHTML = "WINNER!";
	}else{
		document.getElementById("rollResult").innerHTML = "LOSER... :(";
	}
}

function percent(player){
	var $baseUrl = "http://localhost:8080";
	var insert = document.getElementById("playerPercent"+player.id);
	$.ajax({
		type: 'POST',
		url: $baseUrl + '/players/ranking',
		contentType: "application/json",
		data: JSON.stringify(player),
		success: function(percentage){
			insert.innerHTML = percentage;
		},
		error: function(){
			alert('error loading percentages');
		},

	});
}

function playSixGame(){
	var arrayofSixGame = document.getElementsByClassName("sixGame");
	if(document.getElementById("dice1").style.display == "none"){
		for(var i = 0; i < arrayofSixGame.length; i++){
			arrayofSixGame[i].style.display = "block";
		}
		document.getElementById("dice1").style.display = "block";
		document.getElementById("dice2").style.display = "block";
	}else{
		for(var i = 0; i < arrayofSixGame.length; i++){
			arrayofSixGame[i].style.display = "block";
		}
		document.getElementById("dice1").style.display = "block";
		document.getElementById("dice2").style.display = "block";
	}
	document.getElementById("dice1").style.marginLeft = "270px";
	document.getElementById("dice2").style.marginRight = "15px";
	document.getElementById("dice2").style.marginTop = "22px";
	document.getElementById("dice2").style.float = "left";
}

function playTwoGame(){
	var arrayofSixGame = document.getElementsByClassName("sixGame");
	if(document.getElementById("dice3").style.display == "block"){
		for(var i = 0; i < arrayofSixGame.length; i++){
			arrayofSixGame[i].style.display = "none";
		}
		document.getElementById("dice1").style.marginLeft = "450px";
		document.getElementById("dice2").style.float = "";
		document.getElementById("dice2").style.marginTop = "42px";
	}else{
		document.getElementById("dice1").style.display = "block";
		document.getElementById("dice2").style.display = "block";
		for(var i = 0; i < arrayofSixGame.length; i++){
			arrayofSixGame[i].style.display = "none";
		}
		document.getElementById("dice1").style.marginLeft = "450px";
		document.getElementById("dice2").style.float = "";
		document.getElementById("dice2").style.marginTop = "42px";
	}
}