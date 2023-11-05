import express from "express";
import { getUsers,addUser,updateUser,deleteUser,getCursos } from "../controllers/user.js";

const router = express.Router()

//Rotas do usuário

router.get("/:cpf?", getUsers)

router.post("/cadastrar",addUser)

router.put("/atualizar",updateUser)

router.delete("/deletar/:cpf",deleteUser)

//Rotas dos cursos

router.get("/cursos/curso",getCursos)


export default router