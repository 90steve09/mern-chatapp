import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"
const router  = express.Router()


router.get("/signup", signup )

router.get("/login", login)

router.get("logout route", logout)



export default router;

