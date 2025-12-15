import jwt from "jsonwebtoken"

const jwtSecret = "mynameisujjwal"

const authMiddleware = (req,res,next) => {
    try {
        const token = req.header("Authorization")

        if(!token)
            return res.status(401).json({message : "No token, access denied"})

        const decoded = jwt.verify(token, jwtSecret)

        req.user = decoded

        next()
    } catch (error) {
        res.status(401).json({message: "Invalid token"})
    }
}


export default authMiddleware;


