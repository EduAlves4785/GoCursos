const btnEnviar = document.getElementById("btn-enviar");

btnEnviar.addEventListener("click", validateForm);

function validateForm() {
  const cpf = document.getElementById("cpf");
  const senha = document.getElementById("senha");
  const cpfError = document.getElementById("cpfError");
  const senhaError = document.getElementById("senhaError");

  cpfError.textContent = "";
  senhaError.textContent = "";

  function isValidCPF(inputCPF) {
    const cleanCPF = inputCPF.replace(/\D/g, "");

    if (cleanCPF.length !== 11) {
      return false;
    }

    return true;
  }

  if (cpf.value === "") {
    cpf.classList.add("error");
    cpfError.textContent = "Por favor, preencha o campo de CPF.";
    return false;
  } else if (!isValidCPF(cpf.value)) {
    cpf.classList.add("error");
    cpfError.textContent = "CPF inválido. Verifique o formato.";
    return false;
  }

  if (senha.value === "") {
    senha.classList.add("error");
    senhaError.textContent = "Por favor, preencha o campo de senha.";
    return false;
  }

  const url = `http://localhost:8800/${cpf.value}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data[0].senha);
      if (data[0].senha === senha.value) {
        const cpfUser = cpf.value; 

        const urlFinal = `areadoaluno.html?cpf=${cpfUser}`;

        window.location.href = urlFinal;
      } else {
        senhaError.textContent = "Senha ou usuário inválidos";
      }
    })
    .catch((error) => {
      console.error("Erro na requisição à API: " + error);
    });
}
