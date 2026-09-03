// import express from 'express'
// import { addFood, listFood, removeFood, editFood } from '../controllers/foodController.js';
// // create image storage system 
// import multer from 'multer';

// const foodRouter = express.Router()

// //image storage engine 
// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     } 
// })
// const upload = multer({storage:storage})
// foodRouter.post("/add",upload.single("image"),addFood)
// foodRouter.get("/list",listFood)
// foodRouter.post("/remove",removeFood)
// foodRouter.put("/edit", editFood);

  
// export default foodRouter;


import express from "express";
import { listFood} from '../controllers/foodController.js';

const foodRouter = express.Router();
foodRouter.get("/list",listFood)
foodRouter.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Food router working"
    });
});

export default foodRouter;