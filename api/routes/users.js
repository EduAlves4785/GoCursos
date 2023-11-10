import express from "express";
import { getUsers,addUser,updateUser,deleteUser,getCursos,realizarCurso,getUserCursos,updateCurso,getUsersCurso,getUsersPremium,updateUsersPremium } from "../controllers/user.js";

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

// Trazer um usuário e cursos que esta realizando

router.get('/cursos/alunocursos/:id',getUsersCurso)

//Rota de realizar curso

router.post("/cursos/realizar",realizarCurso)

//Atualizar status do curso
router.put("/cursos/atualizar",updateCurso)

//Retorna usuario premium
router.get("/usario/premium/:id",getUsersPremium)

//Atualiza usuario para premium
router.put("/usuario/premium/ativar/:id",updateUsersPremium)

export default router