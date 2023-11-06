import express from "express";
import { getUsers,addUser,updateUser,deleteUser,getCursos,realizarCurso,getUserCursos,updateCurso } from "../controllers/user.js";

const router = express.Router()

//Rotas do usuário

router.get("/:cpf?", getUsers)

router.post("/cadastrar",addUser)

router.put("/atualizar",updateUser)

router.delete("/deletar/:cpf",deleteUser)

//Rotas dos cursos

router.get("/cursos/curso",getCursos)

// Trazer usuários e cursos que estão realizando

router.get('/cursos/alunocursos',getUserCursos)

//Rota de realizar curso

router.post("/cursos/realizar",realizarCurso)

//Atualizar status do curso
router.put("/cursos/atualizar",updateCurso)

export default router