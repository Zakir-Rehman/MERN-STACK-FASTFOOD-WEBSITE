import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'
import { userOrders } from '../controllers/orderController.js'
import authMiddleWare from '../middleware/auth.js'
const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/userorders", authMiddleWare, userOrders)
export default userRouter;