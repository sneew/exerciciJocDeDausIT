	//ajax + jquery
$(function(){
	// declarem espais html on insertar
	var $playersList = $('#playersList');
	var $rollsList = $('#rollsList');
	var $paintingList = $('#paintingList');
	var $selectShopToShow = $('#selectShopToShow');
	//rebem inputs
	var $userName;
	var $playerId;
	var $paintingName = $('#paintingName');
	var $authorName = $('#authorName');
	//declarem urls
	var $baseUrl = "http://localhost:8080";
	var $url2 = "http://localhost/vistajocdedaus/";

	//GET players  ---- falta mitja de tots els jugadors
	$.ajax({
		type: 'GET',
		url: $baseUrl + '/players',

		success: function(players){
			
			$.each(players, function(i, player){
				$playersList.append(
					"<li>"+
						"<p>" + player.playerName  + ": "+ "" + "</p>" +
					"</li>"
				);
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
				getRolls();
				insideLogin();
			},
			error: function(){
				alert('error posting new player');
			}
		});
	});

	//Get 1 player
	$('#enterGameUser').on('click', function() {
		$userName = $('#userName')
		$.ajax({
			type: 'GET',
			url: $baseUrl + '/players/'+ $userName.val(),
			success: function(player){
				console.log('success', player);
				$playerId = player.id;
				getRolls();
				insideLogin();
			},
			error: function(){
				alert('error getting player');
			}
		});
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
				getRolls();
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

		var insertDice1 = document.getElementById("number1");
		var insertDice2 = document.getElementById("number2");

		insertDice1.innerHTML = d1;
		insertDice2.innerHTML = d2;
		
		var roll = {
			dice1: d1,
			dice2: d2,
		};
		//POST Rolls
		$.ajax({
			type: 'POST',
			url: $baseUrl + '/players/'+ $playerId + '/games',
			contentType: "application/json",
			data: JSON.stringify(roll),
			success: function(newRoll){
				winlos(d1, d2);
				console.log('success',newRoll);
			},
			error: function(){
				alert('error posting new roll');
			}
		});
		
	});

	
	

	//DELETE
	$('#delete').on('click', function(){
		$.ajax({
			type:'DELETE',
			url: $baseUrl + '/players/' + $playerId + '/games',
			success: function(){
				$rollsList.html("");
			}
		});
	});

});

function getRolls(){
	//GET Rolls
	$rollsList.html("");

	$.ajax({
		type: 'GET',
		url: $baseUrl + '/players/'+ $playerId +'/games',

		success: function(rolls){
			$rollsList.html("");
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
	document.getElementById("newUser").style.display = "none";
	document.getElementById("oldUser").style.display = "none";
	document.getElementById("anonimousUser").style.display = "none";
	document.getElementById("response1").style.display = "none";

	document.getElementById("dice1").style.display = "block";
	document.getElementById("dice2").style.display = "block";
	document.getElementById("roll").style.display = "block";
	document.getElementById("titol").style.display = "block";
	document.getElementById("response2").style.display = "block";



}

function winlos(dau1, dau2){
	document.getElementById("winlos").style.display = "block";
	if((dau1 + dau2) == 7){
		document.getElementById("rollResult").innerHTML = "WINNER";
	}else {
		document.getElementById("rollResult").innerHTML = "LOSER";
	}

	


}