// 1) Exiba o boletim do usuário logado. Utilize o recurso:
// /api/v2/minhas-informacoes/boletim/{ano_letivo}/{periodo_letivo}/

// 2) Exiba o carômetro dos alunos que ingressaram no ano de 2019 no campus ZN. Para isso, utilize o recurso: 
// /api/v2/edu/alunos/carometro/{sigla_campus}/{ano_letivo}/

// 3) Exiba o carômetro somente dos alunos que ingressaram no Curso de Informática para internet no ano de 2016 no campus ZN. Para isso, utilize o recurso: 
// /api/v2/edu/alunos/carometro/{sigla_campus}/{ano_letivo}/

// 4) Exiba a lista dos servidores do campus ZN. Utilize o recurso: 
// /api/v2/rh/servidores/

// 5) Exiba a lista dos cursos ofertados na ZN. Utilize o recurso: 
// /api/v2/edu/cursos 
// Observe o campo diretoria para filtrar pela DIAC/ZN.

// 6) Verifique se o usuário logado é aluno ou servidor. Exiba na tela uma imagem que represente o usuário logado (exemplo: para aluno uma mochila, para servidor um crachá). Utilize o recurso: 
// /api/v2/minhas-informacoes/meus-dados/
prefixo = "https://suap.ifrn.edu.br/api/v2/"


$(document).ready(function(e){
	$.ajax({
		headers:{"Authorization":"JWT " + sessionStorage.getItem("token")},
		url: prefixo + "minhas-informacoes/meus-dados/",
		contentType:"application/JSON",
		dataType:"JSON",
		type:"GET",
		success:function(data){
			$(data).each(function(index,element){
				console.log(element.tipo_vinculo)
				if(element.tipo_vinculo == "Aluno"){
					$("#autenticacao").attr("src","mochila.png")
				}
				else{
					$("#autenticacao").attr("src","crachá.png")
				}
			})
		}, 
		error:function(data){}
	})
})


$(document).ready(function(){

	$("#botao-meusdados").click(function(e){
		$.ajax({
				// É necessário informar o token de acesso toda vez que for fazer uma requisição a API do suap
				headers: { 
					"Authorization" : "JWT "+sessionStorage.getItem("token")
				},
				url: prefixo + "minhas-informacoes/meus-dados/",
				contentType: 'application/json',
				dataType: 'JSON',
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
	
		
	$("#botao-disciplinas").click(function(e){
		disciplinas = ""
		$.ajax({
			headers:{ "Authorization": "JWT " + sessionStorage.getItem("token") },
			url: prefixo + "minhas-informacoes/turmas-virtuais/2019/1/",
			contentType:'application/json',
			dataType:'JSON',
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

	$("#botao-boletim").click(function(e){
		ano_letivo = "2019"
		periodo_letivo = "1"
		$.ajax({
			headers: {"Authorization" : "JWT " + sessionStorage.getItem("token")},
			url: prefixo + "minhas-informacoes/boletim/"+ano_letivo+"/"+periodo_letivo+"/",
			contentType:'application/json',
			dataType:"JSON",
			type:"GET",
			success:function(data){
				$(data).each(function(index,elemento){
					disc = $("<b></b>")
					lista = $("<ul></ul>")

					if(elemento.nota_etapa_1.nota == null ){
						elemento.nota_etapa_1.nota = "--"
					}
					if(elemento.nota_etapa_2.nota == null){
						elemento.nota_etapa_2.nota = "--"
					}
					if(elemento.nota_etapa_3.nota == null){
						elemento.nota_etapa_3.nota = "--"
					}
					if(elemento.nota_etapa_4.nota == null){
						elemento.nota_etapa_4.nota = "--"
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

	$("#botao-caro2019").click(function(e){
		$.ajax({
			headers: {"Authorization" : "JWT " + sessionStorage.getItem("token")},
			url: prefixo + "/edu/alunos/carometro/zn/2019",
			contentType: "application/json",
			dataType: "JSON",
			type: "GET",
			success:function(data){
				imgs = ""
				$(data).each(function(index,element){
					img = "<img width='65px' height='80px' src='https://suap.ifrn.edu.br/"+ element.foto +"'>"
					imgs += img
				})
				$('#carometro').append(imgs);
			},
			error:function(data){
				
			}
			
		})
	})

	$("#botao-info2016").click(function(e){
		$.ajax({
			headers:{"Authorization":"JWT " + sessionStorage.getItem("token")},
			url: prefixo + "/edu/alunos/carometro/zn/2016",
			contentType:"application/json",
			dataType:"JSON",
			type:"GET",
			success:function(data){
				nome = "Técnico de Nível Médio em Informática para Internet"
				imgs = ""
				
				$(data).each(function(index,element){
					if(element.curso == nome){
						img = "<img width='65px' height='80px' src='https://suap.ifrn.edu.br/"+ element.foto +"'>"
						imgs += img		
					}	
				})
				$('#informatica').append(imgs);	
			},
			error:function(data){

			}
		})
	})

	$("#botao-servidores").click(function(e){
		
		$.ajax({
			headers:{"Authorization":"JWT " + sessionStorage.getItem("token")},
			url: prefixo + "rh/servidores",
			contentType:"application/json",
			dataType:"json",
			type:"GET",
			success:function(data){
				$(data).each(function(index,element){
					$(element.results).each(function(i,servidor){
						$("#servidores").append(servidor.nome + "<br>")
					})
					
				})
			},
			error:function(data){

			}
		})
	})

	$("#botao-cursos").click(function(e){
		nomediretoria = "DIAC/ZN"
		$.ajax({
			headers:{"Authorization":"JWT " + sessionStorage.getItem("token")},
			url: prefixo + "edu/cursos",
			contentType:"application/json",
			dataType:"JSON",
			type:"GET",
			success:function(data){
				$(data).each(function(index,element){
					$(element.results).each(function(i,curso){
						if(curso.diretoria == nomediretoria){
							$("#cursos-zn").append(curso.descricao + "<br>")
						}
					})
				})
			},
			error:function(data){}
		})
	})
});

