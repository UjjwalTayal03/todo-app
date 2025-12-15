import express from "express"
const router = express.Router()
import authMiddleware from "../middleware/authMiddleware.js"

router.get("/protected", authMiddleware, (req,res)=>{
    res.json(
        {
            message: "You are allowed",
            user: req.user
        }
    )
})


export default router