import { db } from "../db.js";

export const getUsers = (req, res) => {
  if (req.params.cpf) {
    const q = "select * from Cadastro WHERE `cpf` = ?";

    db.query(q, [req.params.cpf], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json(data);
    });

    return;
  }

  const q = "select * from Cadastro";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO Cadastro(`nome_Completo`, `cpf`, `email`, `senha`) VALUES(?)";

  const values = [
    req.body.nome_Completo,
    req.body.cpf,
    req.body.email,
    req.body.senha,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE Cadastro SET `nome_Completo` = ?, `cpf` = ?, `email`= ?, `senha` = ? WHERE `cpf` = ?";

  const values = [
    req.body.nome_Completo,
    req.body.cpf,
    req.body.email,
    req.body.senha,
  ];

  db.query(q, [...values, req.body.cpf], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM Cadastro WHERE `cpf` = ?";

  db.query(q, [req.params.cpf], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};

//Controllers dos cursos
export const getCursos = (_, res) => {
  const q = "select * from Curso";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

//Controllers de realizar curso
export const realizarCurso = (req, res) => {
  const q =
    "INSERT INTO AlunoCursos(`aluno_id`,`curso_id`, `status`) VALUES(?)";

  const values = [
    req.body.aluno_id,
    req.body.curso_id,
    req.body.status,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

// Trazer usuários e cursos que estão realizando

export const getUserCursos = (req, res) => {

  const q = "select * from AlunoCursos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

//Concluir curso

export const updateCurso = (req, res) => {
  const q =
    "UPDATE AlunoCursos SET `status` = 'Concluído' WHERE `aluno_id` = ? AND `curso_id` = ?";

  const values = [
    req.body.aluno_id,
    req.body.curso_id,
  ];

  db.query(q, [...values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
}