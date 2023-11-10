create database PI;
use PI;

desc Cadastro;
select * from Cadastro;
DELETE FROM Cadastro;

ALTER TABLE Cadastro AUTO_INCREMENT = 1;

create table Cadastro(
	nome_Completo varchar(30) not null,
    cpf int(11) not null ,
    email varchar(50) not null,
    senha varchar (59) not null,
    id int primary key auto_increment
);

INSERT INTO Cadastro (nome_Completo, cpf, email, senha) VALUES
('João da Silva', 12345678901, 'joao@email.com', 'senha123'),
('Maria Oliveira', 98765432101, 'maria@email.com', 'senha456'),
('Carlos Pereira', 45678912301, 'carlos@email.com', 'senha789'),
('Ana Santos', 78912345601, 'ana@email.com', 'senhaabc'),
('Paulo Sousa', 15935724601, 'paulo@email.com', 'senha789xyz'),
('Juliana Lima', 25836914701, 'juliana@email.com', 'senha123abc'),
('Fernando Rodrigues', 75395185201, 'fernando@email.com', 'senha123456'),
('Mariana Costa', 95175385201, 'mariana@email.com', 'senhamariana'),
('Ricardo Alves', 12398765401, 'ricardo@email.com', 'senha456789'),
('Isabel Ribeiro', 32145678901, 'isabel@email.com', 'senha789123'),
('Gustavo Silva', 85236914701, 'gustavo@email.com', 'senha123xyz'),
('Eduarda Mendes', 98765485201, 'eduarda@email.com', 'senhaabcxyz'),
('Sandra Santos', 36985214701, 'sandra@email.com', 'senhasandra123'),
('Roberto Oliveira', 65498732101, 'roberto@email.com', 'senha123456xyz'),
('Helena Pereira', 12332112301, 'helena@email.com', 'senhahelena');

ALTER TABLE Cadastro
MODIFY cpf VARCHAR(11);

ALTER TABLE Cadastro
MODIFY nome_Completo VARCHAR(30) NOT NULL,
MODIFY cpf INT(11) NOT NULL,
MODIFY email VARCHAR(50) NOT NULL,
MODIFY senha VARCHAR(59) NOT NULL;

INSERT INTO Curso (nome_curso, duracao, descricao, status_curso, nivel_curso, categoria, fk_curso)
VALUES
  ('Curso teste', 3, 'Curso teste', 'Ativo', 'Avançado', 'Programação', 7);

select * from Curso;

UPDATE Curso
SET duracao = 0.001
WHERE nome_curso = 'Curso teste';

create table Curso(
	id_curso int primary key auto_increment,
    nome_curso varchar(70) not null,
    duracao int(4) not null,
    descricao varchar(255) not null,
    status_curso varchar(25) not null,
    nivel_curso varchar(25) not null,
    categoria varchar(50) not null,
    fk_curso int not null,
    foreign key (fk_curso) references Cadastro (id)
) default char set = UTF8;


create table feedback(
	id_feedback int primary key auto_increment,
    feedback varchar(255) not null,
    usuario_id int not null,
    foreign key (usuario_id) references Cadastro (id)
)default char set = UTF8;

create table Compartilha_Projeto(
	id_projeto int primary key auto_increment,
    nome_projeto varchar(70)not null,
    descricao varchar(255) not null,
    fk_projeto int,
    foreign key (fk_projeto) references Cadastro (id)
)default char set = UTF8;

CREATE TABLE AlunoCursos (
    aluno_curso_id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT,
    curso_id INT,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES Cadastro(id),
    FOREIGN KEY (curso_id) REFERENCES Curso(id_curso)
)default char set = UTF8;

INSERT INTO AlunoCursos (aluno_id,curso_id, status)
VALUES (1,6,'Em progresso');

SELECT
    AlunoCursos.aluno_id,
    Cadastro.nome_Completo AS nome_aluno,
    Curso.nome_curso,
    AlunoCursos.status
FROM AlunoCursos
JOIN Cadastro ON AlunoCursos.aluno_id = Cadastro.id
JOIN Curso ON AlunoCursos.curso_id = Curso.id_curso;

SELECT
    AlunoCursos.aluno_id,
    Cadastro.nome_Completo AS nome_aluno,
    Curso.nome_curso,
    Curso.id_curso,
    AlunoCursos.status
FROM AlunoCursos
JOIN Cadastro ON AlunoCursos.aluno_id = Cadastro.id
JOIN Curso ON AlunoCursos.curso_id = Curso.id_curso;

UPDATE AlunoCursos
SET status = 'Concluído'
WHERE aluno_id = 1 and curso_id = 6;

DELETE FROM AlunoCursos;

desc AlunoCursos;

CREATE TABLE UsuariosPremium (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    premium BOOLEAN NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Cadastro(id)
) DEFAULT CHARSET = UTF8;

INSERT INTO UsuariosPremium (usuario_id, premium)
SELECT id, CASE WHEN RAND() > 0.5 THEN TRUE ELSE FALSE END
FROM Cadastro;

UPDATE UsuariosPremium
SET premium = FALSE
WHERE usuario_id = 4;

select * from UsuariosPremium; 


