// Pega parametro do curso
const url = new URL(window.location.href);

const parametro = url.searchParams.get("curso");

if (parametro === null || "") {
  document.querySelector("body").innerHTML = `
  <div class="erro-div">
    <h1>Erro !</h1>
    <h3>Ocorreu um erro inesperado,tente entrar novamente.</h3>

  </div>
  `;
}

//Função para renderizar o botão após o usuário ficar certo tempo na pagina
function renderizarBotao(periodo) {
  setTimeout(function () {
    const botao = document.createElement("button");
    const infoCurso = document.getElementById("info-curso");
    botao.innerHTML += "Imprima seu certificado!";
    botao.id = "botao-certificado";
    botao.onclick = function () {
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

  const content = document.getElementById("info-curso")
    doc.fromHTML(content, 15, 15,{
      orientation: 'portrait' ,
      elementHandlers: specialElementHandlers,
    });
    doc.save("certificado.pdf");
}
