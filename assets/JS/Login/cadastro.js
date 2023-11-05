async function validaUser(cpfTest) {
  try {
    const response = await fetch(`http://localhost:8800/${cpfTest}`);
    const data = await response.json();

    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro na requisição à API: " + error);
    throw error;
  }
}

// Cadastrar
const url = "http://localhost:8800/cadastrar";
function cadastrar(cpf, nome, email, senha) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome_Completo: nome,
      cpf: cpf,
      email: email,
      senha: senha,
    }),
  })
    .then((resp) => resp.json())
    .then(() => {
      window.alert(
        "Cadastro concluído!\nVocê será redirecionado para o login!"
      );
      window.location.href = "login.html";
    })
    .catch((e) => console.log("Erro no servidor: " + e));
}

//______________________________________________

const btnCadastrar = document.getElementById("btn-cadastro");

btnCadastrar.addEventListener("click", validarFormulario);

async function validarFormulario() {
  // Limpar mensagens de erro anteriores
  document.getElementById("nomeError").innerHTML = "";
  document.getElementById("cpfError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";
  document.getElementById("senhaError").innerHTML = "";
  document.getElementById("confirmaSenhaError").innerHTML = "";

  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmaSenha = document.getElementById("confirma_senha").value;

  const isValid = true;

  if (nome === "") {
    document.getElementById("nomeError").innerHTML =
      "Por favor, preencha o campo Nome.";
    isValid = false;
  }

  if (cpf.length !== 11) {
    document.getElementById("cpfError").innerHTML =
      "O CPF deve ter 11 dígitos numéricos.";
    isValid = false;
  }

  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email.match(emailPattern)) {
    document.getElementById("emailError").innerHTML =
      "Por favor, digite um endereço de e-mail válido.";
    isValid = false;
  }

  if (senha === "") {
    document.getElementById("senhaError").innerHTML =
      "Por favor, preencha o campo Senha.";
    isValid = false;
  }

  if (senha !== confirmaSenha) {
    document.getElementById("confirmaSenhaError").innerHTML =
      "As senhas não coincidem. Por favor, verifique.";
    isValid = false;
  }

  if (isValid) {
    try {
      const isCpfValid = await validaUser(cpf);
      if (!isCpfValid) {
        cadastrar(cpf, nome, email, senha);
      } else {
        window.alert("O CPF já está cadastrado!");
      }
    } catch (error) {
      console.error("Erro na validação do CPF: " + new Error("Houve algum erro na validação de cadastro !"));
    }
  }
}
