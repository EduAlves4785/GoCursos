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

function meusCursos(){
  window.location.href = `meuscursos.html?cpf=${parametro}`
}
function Suporte(){
  window.location.href = `suporte.html`;
}

const dataUser = [];

function renderizarDados() {
  const url = `http://localhost:8800/${parametro}`;
  const bodyElement = document.body;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      function verificarStatusPremium(id) {
        const url = `http://localhost:8800/usario/premium/${id}`;
        fetch(url)
          .then((res) => res.json())
          .then((data2) => {
            console.log(data2);
            if (data2.length > 0 && data2[0].premium === 1) {
              bodyElement.innerHTML = `
              <nav>
              <div class="itens">
                <button>Area do aluno</button>
                <button>Meus cursos</button>
                <button>Postagens</button>
                <button>Suporte</button>
              </div>
              <img
                class="logo"
                src="./assets/img/logo.png"
                alt="Logo da go cursos"
                width="100px"
              />
            </nav>
        
            
        <div class="conteiner">
            <section class="cursos">
              <div class="image-container">
                <div>
                  <img src="./assets/img/person.png" />
                </div>
                
              </div>
              
                <div class="dados-pessoais">
                  <h2>Dados Pessoais</h2>
                  <p>Nome: <span id="nome" contenteditable="true">Seu Nome</span></p>
                  <p>CPF: <span id="cpf" contenteditable="true">Seu CPF</span></p>
                  <p>Email: <span id="email" contenteditable="true">Seu Email</span></p>
                </div>
        
              </section>
            </div>
        
          <div class="conteiner2">
              <h5 style="color: black;"> Assinatura: </h5><br/><br/>
          </div>
        
        
          <div class="conteiner2">
          <div >
            <h1 style="color: blue;"> Premium Ativado </h1>
            
          </div>
          <div>
            <img src="./assets/img/selo.png" />
          </div>
                `;
            }else{
                bodyElement.innerHTML=`
                <nav>
                <div class="itens">
                  <button onclick="history.back()">Área de cursos</button>
                  <button onclick="meusCursos()">Meus cursos</button>
                  <button onclick="Suporte()">Suporte</button>
                </div>
                <img
                  class="logo"
                  src="./assets/img/logo.png"
                  alt="Logo da go cursos"
                  width="100px"
                />
              </nav>
          
              
          <div id="conteiner" class="conteiner">
              <section class="cursos">
                <div class="image-container">
                  <div>
                    <img src="./assets/img/person.png" />
                  </div>
                  
                </div>
                
                  <div class="dados-pessoais">
                    <h2>Dados Pessoais</h2>
                    <p>Nome: <span id="nome" contenteditable="true">Seu Nome</span></p>
                    <p>CPF: <span id="cpf" contenteditable="true">Seu CPF</span></p>
                    <p>Email: <span id="email" contenteditable="true">Seu Email</span></p>
                  </div>
          
                </section>
              </div>
          
            <div class="conteiner2">
                <h5 style="color: black;"> Assinatura: </h5><br/><br/>
            </div>
          
          
            <div id="conteiner2" class="conteiner2">
            <div >
              <h1 style="color: rgb(255, 0, 0);"> Premium não Ativado </h1>
              
            </div>
           
          
            </div><br>
          
            <div class="Centralizar_Botao_Premium">
              <div class="Ativar">
                <center><button onClick="redirecionarPagamento()">Ativar Premium</button> </center>
              </div>
            </div>
            <script src="./assets/JS/perfilaluno.js"></script>
                `
            }
            document.getElementById("nome").textContent = data[0].nome_Completo;
            document.getElementById("cpf").textContent = data[0].cpf;
            document.getElementById("email").textContent = data[0].email;
          });
      }
      verificarStatusPremium(data[0].id);
    });
}
renderizarDados();


function redirecionarPagamento(){
  window.location.href=`areapagamento.html?cpf=${parametro}`
}