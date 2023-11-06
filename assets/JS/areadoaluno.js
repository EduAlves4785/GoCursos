// Valida usuário logado
const url = new URL(window.location.href);

const parametro = url.searchParams.get("cpf");

if (parametro === null || '') {
  document.querySelector("body").innerHTML = `
  <div class="erro-div">

    <h1>Erro !</h1>
    <h3>Ocorreu um erro inesperado,tente entrar novamente.</h3>

  </div>
  `
}

//Redirecionar para o perfil com parametro na url
const meuperfilBtn=document.getElementById("meuperfil-btn")
meuperfilBtn.addEventListener('click',()=>{
  window.location.href = `Perfil Auno - sem licença.html?cpf=${parametro}`;
})

//Redirecionar para meus cursos
const meusCursosBtn=document.getElementById("meuscursos-btn")
meusCursosBtn.addEventListener('click',()=>{
  window.location.href = `perfilaluno.html?cpf=${parametro}`;
})



//Lógica do filtro
const boxFiltro = document.getElementById("boxFiltro");
const pesquisaBox = document.getElementById("pesquisaBox");
const btnFiltro = document.getElementById("btnFiltro");

btnFiltro.addEventListener("click", () => {
  if (boxFiltro.style.display === "none") {
    pesquisaBox.style.display = "none";
    boxFiltro.style.display = "flex";
    btnFiltro.textContent = "Voltar";
  } else {
    pesquisaBox.style.display = "flex";
    boxFiltro.style.display = "none";
    btnFiltro.textContent = "Filtro";
  }
});

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

// Lógica do filtro funcionalidades
const dataCursos = [];

function getCursos() {
  const url = `http://localhost:8800/cursos/curso`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dataCursos.push(...data);
    });
}

getCursos();

const conteudoCursos = `
  <div class="carousel">
    <div class="card">
      <div class="img">
        <img src="./assets/img/curso1.png" alt="Imagem curso">
      </div>
      <h2>Pacote office</h2>
      <button>Realizar curso</button>
    </div>
    <div class="card">
      <div class="img">
        <img src="./assets/img/curso2.png" alt="Imagem curso">
      </div>
      <h2>Marketing digital</h2>
      <button>Realizar curso</button>
    </div>
    <div class="card">
      <div class="img">
        <img src="./assets/img/curso3.png" alt="Imagem curso">
      </div>
      <h2>Culinária</h2>
      <button>Realizar curso</button>
    </div>
    <div class="card">
      <div class "img">
        <img src="./assets/img/curso4.png" alt="Imagem curso">
      </div>
      <h2>Data Lake</h2>
      <button>Realizar curso</button>
    </div>
    <div class="card">
      <div class="img">
        <img src="./assets/img/curso5.png" alt="Imagem curso">
      </div>
      <h2>Python</h2>
      <button>Realizar curso</button>
    </div>
    <div class="card">
      <div class="img">
        <img src="./assets/img/curso6.jpg" alt="Imagem curso">
      </div>
      <h2>Node JS</h2>
      <button>Realizar curso</button>
    </div>
    <div class="card">
        <div class="img">
          <img src="./assets/img/curso7.png" alt="Imagem curso">
        </div>
          <h2>Duração 1s</h2>
          <h2>Curso teste</h2>
          <button onclick="redirecionarParaCurso(7,'Curso teste')">Realizar curso</button>
        </div>
    </div>
`;

const carouselContainer = document.getElementById("carousel-container");
const btnFiltrar = document.getElementById("btn-filtrar");
const errorMessage = document.getElementById("error-message");

btnFiltrar.addEventListener("click", () => {
  const btnBox = document.getElementById("botoes-box");
  const nomeCurso = document.getElementById("nome-curso").value;

  const cursoProcurado = dataCursos.find((curso) => {
    return curso.nome_curso === nomeCurso;
  });

  btnBox.style.display = "none";

  if (cursoProcurado) {
    carouselContainer.innerHTML = `
    <div class="card">
      <div class="img">
        <img src="./assets/img/curso${cursoProcurado.id_curso}.png" alt="Imagem curso">
      </div>
      <h2>${cursoProcurado.nome_curso}</h2>
      <button>Realizar curso</button>
    </div>`;
  } else {
    carouselContainer.innerHTML = `
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h1>Curso não encontrado : (</h1>
    <br>
    <h2>Digite o nome do curso de acordo com o que está cadastrado !</h2>
  </div>
`;
  }

  if (nomeCurso.trim() === "") {
    errorMessage.innerText = "Preencha o campo !";
  } else {
    errorMessage.innerText = " ";
  }
});

const btnFiltrar2 = document.getElementById("btn-filtrar-aberto");

//Lógica do filtro pelos checkbox
btnFiltrar2.addEventListener("click", () => {
  const cursosEncontrados = [];

  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const selectedCategories = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );

  dataCursos.forEach((curso) => {
    if (selectedCategories.includes(curso.categoria)) {
      cursosEncontrados.push(curso);
    }
  });

  if (cursosEncontrados.length>0) {
    carouselContainer.innerHTML = ""; // Limpe o conteúdo anterior
    cursosEncontrados.forEach(curso => {
      carouselContainer.innerHTML += `
        <div class="card">
          <div class="img">
            <img src="./assets/img/curso${curso.id_curso}.png"  alt="Imagem curso">
          </div>
          <h2>Duração ${curso.duracao}h</h2>
          <h2>${curso.nome_curso}</h2>
          <button onclick="redirecionarParaCurso(${curso.id_curso},${curso.nome_curso})">Realizar curso</button>
        </div>`;
    });
  } else {
    carouselContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1>Curso não encontrado : (</h1>
        <br>
        <h2>Nenhum curso corresponde às categorias selecionadas.</h2>
      </div>`;
  }
});

btnFiltro.addEventListener("click", () => {
  if (btnFiltrar.style.display == "block") {
    btnFiltrar.style.display = "none";
    btnFiltrar2.style.display = "block";
  } else {
    btnFiltrar.style.display = "block";
    btnFiltrar2.style.display = "none";
  }
});

//Lógica ir na página do curso específico

function redirecionarParaCurso(numeroCurso,nomeCurso) {

  //Contabilizar curso que será realizado
  const urlAlunoCurso=`http://localhost:8800/cursos/realizar`
  function cadastrarCurso(aluno_id) {
    fetch(urlAlunoCurso, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aluno_id:aluno_id,
        curso_id:numeroCurso,
        status:"Cursando"
      }),
    })
      .then((resp) => resp.json())
      .catch((e) => console.log("Erro no servidor: " + e));
  }

  const dataUser = [];

  function getUser() {
   const url = `http://localhost:8800/${parametro}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dataUser.push(...data);
        cadastrarCurso(dataUser[0].id)
      });
  }

  getUser()

  // Construa a URL da página com base no número do curso
  const paginaCurso = `telacurso.html?curso=${numeroCurso}&nomeCurso=${nomeCurso}&cpf=${parametro}`;
  window.location.href = paginaCurso;
}



