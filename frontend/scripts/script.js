//ajax + jquery
$(function(){
	// declarem espais html on insertar
	var $playersList = $('#playersList');
	var $shopSelect = $('#selectShop');
	var $paintingList = $('#paintingList');
	var $selectShopToShow = $('#selectShopToShow');
	//rebem inputs
	var $userName;
	var $paintingName = $('#paintingName');
	var $authorName = $('#authorName');
	//declarem urls
	var $baseUrl = "http://localhost:8080";
	var $url2 = "http://localhost/vistajocdedaus/pages/page1";

	//GET players falta mitja de tots els jugadors
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
				window.location.href=$url2;
				console.log('success', newPlayer)
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
				window.location.href=$url2;
				console.log('success', player)
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
				window.location.href=$url2;
				console.log('success', newPlayer)
			},
			error: function(){
				alert('error posting anonimous');
			}
		});
	});

	//POST Rolls
	$('#roll').on('click', function() {
		
		var roll = {
			player: $userName.val(),
		};
		
		$.ajax({
			type: 'POST',
			url: $baseUrl + '/players/'+ $userName.val() + '/game',
			contentType: "application/json",
			data: JSON.stringify(roll),
			success: function(newRoll){
				window.location.href=$url2;
				console.log('success',newRoll)
			},
			error: function(){
				alert('error posting new roll');
			}
		});
	});

	//DELETE
	$('#burn-paintings').on('click', function(){
		var $idshop = $selectShopToShow.val();
		console.log($idshop);
		$.ajax({
			type:'DELETE',
			url: $baseUrl + '/shops/' + $idshop + '/paintings',
			success: function(){
				window.location.href=$url2;
			}
		});
	});

});