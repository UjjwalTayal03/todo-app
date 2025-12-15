import express from "express"
import Task from "../models/taskModel.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", authMiddleware, async (req, res) => {
    try {
        const {title} = req.body
        if(!title)
            return res.status(400).json({message: "Title is required"})

        const task = await Task.create({
            title,
            user: req.user.id
        })

        res.status(201).json(task)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get("/",authMiddleware, async(req,res)=>{
    try {
        const tasks = await Task.find({user: req.user.id})
        res.json(tasks)
    } catch (error) {
        res.status(500).message({message: error.message})
    }
})


router.put("/:id",authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id, user: req.user.id},
            req.body,
            {new: true}
        )

        if(!task)
            return res.status(404).json({message: "Task not found"})

        res.json(task)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


router.delete("/:id",authMiddleware, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete({
            _id: req.params.id,
            user:req.user.id
        })
        if(!task)
            res.status(404).json({message: "Task not found"})

        res.json({message: "Task deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router