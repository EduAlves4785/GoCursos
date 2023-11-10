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
  // Primeiro, insira os dados na tabela Cadastro
  const cadastroQuery =
    "INSERT INTO Cadastro(`nome_Completo`, `cpf`, `email`, `senha`) VALUES(?, ?, ?, ?)";

  const cadastroValues = [
    req.body.nome_Completo,
    req.body.cpf,
    req.body.email,
    req.body.senha,
  ];

  db.query(cadastroQuery, cadastroValues, (err, result) => {
    if (err) return res.json(err);

    const usuarioId = result.insertId;

    const premiumQuery =
      "INSERT INTO UsuariosPremium(`usuario_id`, `premium`) VALUES(?, ?)";

    const premiumValues = [usuarioId, false];

    db.query(premiumQuery, premiumValues, (err) => {
      if (err) return res.json(err);

      return res.status(200).json("Usuário criado com sucesso.");
    });
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

  const values = [req.body.aluno_id, req.body.curso_id, req.body.status];

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

//Trazer um usuario e curso sendo realizado
export const getUsersCurso = (req, res) => {
  if (req.params.id) {
    const q = `
      SELECT
        AlunoCursos.aluno_id,
        Cadastro.nome_Completo AS nome_aluno,
        Curso.nome_curso,
        Curso.id_curso,
        AlunoCursos.status
      FROM AlunoCursos
      JOIN Cadastro ON AlunoCursos.aluno_id = Cadastro.id
      JOIN Curso ON AlunoCursos.curso_id = Curso.id_curso
      WHERE AlunoCursos.aluno_id = ?;
    `;

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json(data);
    });

    return;
  }
};

//Concluir curso

export const updateCurso = (req, res) => {
  const q =
    "UPDATE AlunoCursos SET `status` = 'Concluído' WHERE `aluno_id` = ? AND `curso_id` = ?";

  const values = [req.body.aluno_id, req.body.curso_id];

  db.query(q, [...values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};


//Trazer um usuario premium
export const getUsersPremium = (req, res) => {
    const q = "select * from  UsuariosPremium WHERE `usuario_id` = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json(data);
    });

    return;
};

//Atualizar premium
export const updateUsersPremium = (req, res) => {
  
  const q = "UPDATE UsuariosPremium SET `premium` = TRUE WHERE `usuario_id` = ?;";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });

  return;

};

