$(document).ready(function(){

	$("#botao-meusdados").click(function(e){
		$.ajax({
				headers: { 
					"Authorization" : "JWT "+sessionStorage.getItem("token")
				},
				url: "https://suap.ifrn.edu.br/api/v2/minhas-informacoes/meus-dados/",
				contentType: 'application/json',
				dataType: 'json',
				type: 'GET',
				success: function (data) {
				$('#dados').html(JSON.stringify(data)) // Exibir todos meus dados 
					$("#usuario-nome_usual").html(data.nome_usual);
					$("#usuario-tipo_vinculo").html(data.tipo_vinculo);
					$("#usuario-email").html(data.email);
					$('#usuario-matricula').html(data.matricula)
					$('#usuario-img').attr('src', "https://suap.ifrn.edu.br/" + data.url_foto_75x100)
				},
				error: function(data){
					alert("Impossível recuperar dados. Você deve fazer login!");
					window.location.href = "login.html";
				}
		});
	});
	
	
	/* COLOQUE AS NOVAS FUNCIONALIDADES AQUI ABAIXO, AINDA DENTRO DO $(document).ready */
		
	$("#botao-disciplinas").click(function(e){
		disciplinas = ""
		$.ajax({
			headers:{ "Authorization":"JWT " + sessionStorage.getItem("token") },
			url: "https://suap.ifrn.edu.br/api/v2/minhas-informacoes/turmas-virtuais/2019/1/",
			contentType:'application/json',
			dataType:'json',
			type:'GET',
			success:function(data){
				$(data).each(function(index, elemento){
					disciplinas = elemento.descricao +"<br>"
					$('#disciplinas').append(disciplinas)
				})
			},
			error: function(data){
				alert("Impossível recuperar dados");
			}

		})
	})
});

