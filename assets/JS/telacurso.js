// Pega parametro do curso
const url = new URL(window.location.href);

const parametro = url.searchParams.get("curso");
const cpf = url.searchParams.get("cpf");
const nomeCurso = url.searchParams.get("nomeCurso");

if (parametro === null || "") {
  document.querySelector("body").innerHTML = `
  <div class="erro-div">
    <h1>Erro !</h1>
    <h3>Ocorreu um erro inesperado,tente entrar novamente.</h3>
  </div>
  `;
}
//Pegar nome do usuário
const nomeAluno = [];

function dadosAluno() {
  const urlUser = `http://localhost:8800/${cpf}`;
  fetch(urlUser)
    .then((resp) => resp.json())
    .then((data) => {
      nomeAluno.push(data[0]);
    })
    .catch((error) => {
      console.error("Erro na requisição à API: " + error);
    });
}

dadosAluno();

//Definir curso como conlcuido
function atualizaStatus(aluno_id,curso_id) {
  const urlAtualiza="http://localhost:8800/cursos/atualizar"
  fetch(urlAtualiza, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      aluno_id: aluno_id,
      curso_id: curso_id
    }),
  })
    .then((resp) => resp.json())
    .catch((e) => console.log("Erro no servidor: " + e));
}

//Função para renderizar o botão após o usuário ficar certo tempo na pagina
function renderizarBotao(periodo) {
  setTimeout(function () {
    const botao = document.createElement("button");
    const infoCurso = document.getElementById("info-curso");

    botao.innerHTML += "Imprima seu certificado!";
    botao.id = "botao-certificado";

    botao.onclick = function () {
      atualizaStatus(nomeAluno[0].id,parametro)
      gerarPDF();
    };
    infoCurso.appendChild(botao);
  }, periodo);
}

//Rota do curso na fake-api
const urlCurso = `http://localhost:3000/cursos/${parametro}`;
const section = document.querySelector("section");

function trazerCurso() {
  fetch(urlCurso)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data.duracao);
      const periodoEmMilissegundos = Math.round(data.duracao * 3600000);
      const html = `
            <div class="video-box">
                <iframe width="560" height="315" src="${data.video}" frameborder="0" allowfullscreen></iframe>
            </div>
            <div id="info-curso" class="info-curso">
                <h1>${data.nome}</h1>
                <h4>Assim que aparecer o botão você poderá pegar o certificado.</h4>
                <button onclick="history.back()">Voltar</button>
            </div>
        `;
      section.innerHTML = html;
      // Chame a função para renderizar o botão
      renderizarBotao(periodoEmMilissegundos);
    })
    .catch((error) => {
      console.error("Erro na requisição à API: " + error);
    });
}

trazerCurso();

//Gerar certificado
function gerarPDF() {
  var doc = new jsPDF();
  var specialElementHandlers = {
    "#editor": function (element, renderer) {
      return true;
    },
  };

  const dataAtual = new Date();
  const dia = dataAtual.getDate();
  const mes = dataAtual.toLocaleString("default", { month: "long" }); // Obtém o nome do mês
  const ano = dataAtual.getFullYear();

  const certificado = `
    <div id="certificate" class="certificate">
      <img class="image" src="./assets/img/logo.png" alt="Imagem" width="50px"/>
      <div class="certificate-title">Certificado de Conclusão</div>
      <div class="certificate-text">Certificamos que</div>
      <div class="recipient-name">${nomeAluno[0].nome_Completo}</div>
      <div class="certificate-text">completou com sucesso o curso de</div>
      <div class="course-name"><strong>${nomeCurso}</strong></div>
      <div class="date">em ${dia} de ${mes} de ${ano}</div>
      <div class="signature">
        <img src="./assets/img/assinatura.png" alt="Assinatura do Emissor" width="80px" height="30px"/>
        <div>Neymar</div>
      </div>
    </div>`;

  section.innerHTML = certificado;

  const content=document.getElementById("certificate")

  // Transforma o HTML do certificado em um elemento canvas
  html2canvas(content, {
    onrendered: function (canvas) {
      var imgData = canvas.toDataURL("image/jpeg");
      doc.addImage(imgData, "JPEG", 10, 10, 190, 130); // Ajuste as coordenadas e o tamanho conforme necessário
      doc.save(`certificado-${nomeCurso}.pdf`);
    },
  });
}
