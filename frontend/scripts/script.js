//ajax + jquery
$(function(){
	// declarem espais html on insertar
	var $playersList = $('#playersList');
	var $shopSelect = $('#selectShop');
	var $paintingList = $('#paintingList');
	var $selectShopToShow = $('#selectShopToShow');
	//rebem inputs
	var $newUserName = $('#newUserName');
	var $shopCapacity = $('#shopCapacity');
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

		var player = {
			playerName: $newUserName.val(),
		};
		
		$.ajax({
			type: 'POST',
			url: $baseUrl + '/players',
			contentType: "application/json",
			data: JSON.stringify(player),
			success: function(newPlayer){
				window.location.href=$url2;
				console.log('success',newPlayer)
			},
			error: function(){
				alert('error posting new shop');
			}
		});
	});

	//POST Paintings
	$('#add-painting').on('click', function() {
		
		var painting = {
			paintingName: $paintingName.val(),
			authorName: $authorName.val(),
		};
		
		$.ajax({
			type: 'POST',
			url: $baseUrl + '/shops/'+ $shopSelect.val() + '/paintings',
			contentType: "application/json",
			data: JSON.stringify(painting),
			success: function(newPainting){
				window.location.href=$url2;
				console.log('success',newPainting)
			},
			error: function(){
				alert('error posting new painting');
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