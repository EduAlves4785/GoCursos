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

function atualizandoPremium(id){
  const url=`http://localhost:8800/usuario/premium/ativar/${id}`

  fetch(url,{
      method:'PUT',
      headers:{
          'Content-Type':'application/json'
      },
      }).then((resp)=>{resp.json()})
      .catch((e)=>console.log("Erro no servidor: "+e))
}
function atualizaPremium(){
  const url=`http://localhost:8800/${parametro}`

  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    atualizandoPremium(data[0].id)
  });
  

}

function gerarBoleto() {
  var doc = new jsPDF();
  var specialElementHandlers = {
    "#editor": function (element, renderer) {
      return true;
    },
  };

  const boletoHtml = `
  <img id="boleto" src="./assets/img/boleto.png">
`;

  const bodyElement = document.body;
  bodyElement.innerHTML += boletoHtml;


  const content=document.getElementById("boleto")

  // Transforma o HTML do certificado em um elemento canvas
  html2canvas(content, {
    onrendered: function (canvas) {
      var imgData = canvas.toDataURL("image/jpeg");
      doc.addImage(imgData, "JPEG", 10, 10, 190, 130); // Ajuste as coordenadas e o tamanho conforme necessário
      doc.save(`boleto-${parametro}.pdf`);
    },
  });

}

const numeroCartaoInput = document.getElementById("numero-cartao");
const codigoSegurancaInput = document.getElementById("codigo-seguranca");
const pagamentoCartaoRadio = document.getElementById("pagamento-cartao");
const pagamentoBoletoRadio = document.getElementById("pagamento-boleto");
const btnConfirmar = document.querySelector(".btn-confirmar");
const btnVoltar = document.getElementById("btn-voltar");

btnVoltar.addEventListener("click", () => {
  window.location.href = `Perfil Auno - sem licença.html?cpf=${parametro}`;
});

btnConfirmar.addEventListener("click", () => {
  // Limpar mensagens de erro
  document.getElementById("erro-numero-cartao").textContent = "";
  document.getElementById("erro-codigo-seguranca").textContent = "";

  // Validação para o número do cartão se o pagamento for por cartão
  if (pagamentoCartaoRadio.checked && numeroCartaoInput.value.trim() === "") {
    document.getElementById("erro-numero-cartao").textContent =
      "Por favor, insira o número do cartão de crédito.";
    return;
  }

  // Validação para o código de segurança se o pagamento for por cartão
  if (
    pagamentoCartaoRadio.checked &&
    codigoSegurancaInput.value.trim() === ""
  ) {
    document.getElementById("erro-codigo-seguranca").textContent =
      "Por favor, insira o código de segurança do cartão de crédito.";
    return;
  }

  // Determinar o método de pagamento escolhido
  let metodoPagamento = "";
  if (pagamentoCartaoRadio.checked) {
    atualizaPremium()
    setTimeout(function() {
      window.location.href = `aprovandopagamento.html?cpf=${parametro}`;
    }, 1000);
  } else if (pagamentoBoletoRadio.checked) {
    atualizaPremium()
    metodoPagamento = "Boleto";
    gerarBoleto()
    setTimeout(function() {
      window.location.href = `aprovandopagamento.html?cpf=${parametro}`;
    }, 1000);
  }

  // Agora você pode usar a variável metodoPagamento para enviar os dados do pagamento para o servidor ou realizar a lógica necessária com base no método escolhido.
});

