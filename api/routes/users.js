import express from "express";
import { getUsers,addUser,updateUser,deleteUser } from "../controllers/user.js";

const router = express.Router()

router.get("/:cpf?", getUsers)

router.post("/cadastrar",addUser)

router.put("/atualizar",updateUser)

router.delete("/deletar/:cpf",deleteUser)

export default router