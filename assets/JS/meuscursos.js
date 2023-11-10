// Valida usuário logado
const url = new URL(window.location.href);

const parametro = url.searchParams.get("cpf");

if (parametro === null || "") {
  document.querySelector("body").innerHTML = `
  <div class="erro-div">

    <h1>Erro !</h1>
    <h3>Ocorreu um erro inesperado,tente entrar novamente.</h3>

  </div>
  `;
}

//Lógica do carousel
const carousel = document.querySelector(".carousel");
const cards = document.querySelectorAll(".card");
const cardWidth = cards[0].offsetWidth;
const totalCards = cards.length;
const visibleCards = 1; // Número de cartões visíveis de cada vez

let currentIndex = 0;

function showCard(index) {
  if (index < 0) {
    index = totalCards - visibleCards;
  } else if (index > totalCards - visibleCards) {
    index = 0;
  }

  const offset = -index * cardWidth;
  carousel.style.transform = `translateX(${offset}px)`;
  currentIndex = index;
}

function nextCard() {
  showCard(currentIndex + 1);
}

function prevCard() {
  showCard(currentIndex - 1);
}

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

prevButton.addEventListener("click", prevCard);
nextButton.addEventListener("click", nextCard);

showCard(currentIndex);

//Lógica para renderizar cursos em andamento

const dataCursos = [];
const dataUser=[]

function getAlunoId() {
  const url = `http://localhost:8800/${parametro}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dataUser.push(...data);
      getCursosPorAlunoId(dataUser[0].id) // Retorna o ID do aluno
    })
    .catch((error) => {
      console.error("Erro ao obter ID do aluno:", error);
      return null; // Em caso de erro, retorna null ou um valor padrão
    });
}

// Função para obter os cursos do aluno com base no ID
function getCursosPorAlunoId(alunoId) {
  const url = `http://localhost:8800/cursos/alunocursos/${alunoId}`;

  return fetch(url)
    .then((res) => res.json())
    .then(data=>{
      dataCursos.push(...data)
      renderizarCursos()
    })
    .catch((error) => {
      console.error("Erro ao obter cursos do aluno:", error);
      return []; // Em caso de erro, retorna um array vazio ou outro valor padrão
    });
}

getAlunoId()

const carouselContainer=document.getElementById("carousel-container")
function redirecionarParaCurso(cursoId, nomeCurso) {
  const paginaCurso = `telacurso.html?curso=${cursoId}&nomeCurso=${nomeCurso}&cpf=${parametro}`;
  window.location.href = paginaCurso;
}

function perfilAcessar(){
  window.location.href = `Perfil Auno - sem licença.html?cpf=${parametro}`;
}

function Suporte(){
  window.location.href = `suporte.html`;
}

function AreaCursos(){
  window.location.href = `areadoaluno.html?cpf=${parametro}`;
}

//Gerar certificado

function gerarPDF(nomeAluno,nomeCurso) {
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
      <div class="recipient-name">${nomeAluno}</div>
      <div class="certificate-text">completou com sucesso o curso de</div>
      <div class="course-name"><strong>${nomeCurso}</strong></div>
      <div class="date">em ${dia} de ${mes} de ${ano}</div>
      <div class="signature">
        <img src="./assets/img/assinatura.png" alt="Assinatura do Emissor" width="80px" height="30px"/>
        <div>Neymar</div>
      </div>
    </div>`;

  const bodyElement = document.body;
  bodyElement.innerHTML += certificado;


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

function renderizarCursos() {
  carouselContainer.innerHTML = " ";
  dataCursos.forEach((curso) => {
    if(curso.status=="Concluído"){
      carouselContainer.innerHTML += `
      <div class="card">
        <div class="img">
          <img src="./assets/img/curso${curso.id_curso}.png" alt="Imagem curso">
        </div>
        <h2>${curso.nome_curso}</h2>
        <h2>${curso.status}</h2>
        <button onclick="gerarPDF('${dataUser[0].nome_Completo}', '${curso.nome_curso}')">Imprimir certificado</button>
      </div>`;
    }else{
      carouselContainer.innerHTML += `
      <div class="card">
        <div class="img">
          <img src="./assets/img/curso${curso.id_curso}.png" alt="Imagem curso">
        </div>
        <h2>${curso.nome_curso}</h2>
        <h2>${curso.status}</h2>
        <button onclick="redirecionarParaCurso(${curso.id_curso}, '${curso.nome_curso}')">Continuar curso</button>
      </div>`;
    }
    
  });
}