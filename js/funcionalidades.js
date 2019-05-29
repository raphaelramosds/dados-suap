$(document).ready(function(){

	$("#botao-meusdados").click(function(e){
		$.ajax({
				// É necessário informar o token de acesso toda vez que for fazer uma requisição a API do suap
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
			headers:{ "Authorization": "JWT " + sessionStorage.getItem("token") },
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

/*
<b id="disc"></b>
<ul>
	<li id="primeiro_b"></li>
	<li id="segundo_b"></li>
	<li id="terceiro_b"></li>
	<li id="quarto_b"></li>
</ul>
*/

	$("#botao-boletim").click(function(e){
		ano_letivo = "2019"
		periodo_letivo = "1"
		$.ajax({
			headers: {"Authorization" : "JWT " + sessionStorage.getItem("token")},
			url: "https://suap.ifrn.edu.br/api/v2/minhas-informacoes/boletim/"+ano_letivo+"/"+periodo_letivo+"/",
			contentType:'application/json',
			dataType:"json",
			type:"GET",
			success:function(data){
				$(data).each(function(index,elemento){
					disc = $("<b></b>")
					lista = $("<ul></ul>")
					//d = elemento.disciplina +": "+ elemento.nota_etapa_1.nota + "<br>"
					if(elemento.nota_etapa_1.nota == null || elemento.nota_etapa_2.nota == null || elemento.nota_etapa_3.nota == null || elemento.nota_etapa_4.nota == null){
						elemento.nota_etapa_1.nota, elemento.nota_etapa_2.nota, elemento.nota_etapa_3.nota, elemento.nota_etapa_4.nota = "--"
					}
					disc.append(elemento.disciplina)
					lista.append("<li>N1: "+elemento.nota_etapa_1.nota+"</li>")
					lista.append("<li>N2: "+elemento.nota_etapa_2.nota+"</li>")
					lista.append("<li>N3: "+elemento.nota_etapa_3.nota+"</li>")
					lista.append("<li>N4: "+elemento.nota_etapa_4.nota+"</li>")
					$('#boletim').append(disc)
					$('#boletim').append(lista)
				})
			},
			error: function(data){
				alert("Impossível recuperar dados");
			}
		})
	})
});

