import jwt from "jsonwebtoken";

// const authMiddleWare = async (req, res, next) => {
//     const { token } = req.headers;
//     if(!token){
//         return res.json({success:false,message:"Not authorized login again"})
//     }
//     try {
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next()
//     } catch (error) {
//         console.log(error)
//          res.json({success:false,message:"Error"})
//     }
// }
// export default authMiddleWare

const authMiddleWare = async (req, res, next) => {
    const authHeader = req.headers.authorization; // "Bearer TOKEN"
    
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Not authorized"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ SAME NAME AS CONTROLLER EXPECTS
        req.userId = decoded.id;

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};
  

// const authMiddleWare = (req, res, next) => {
//     console.log("AUTH MIDDLEWARE HIT"); // 🔥 MUST PRINT

//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({
//             success: false,
//             message: "Not authorized"
//         });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         console.log("DECODED TOKEN 👉", decoded); // 🔥 MUST PRINT

//         req.user = {
//             id: decoded.id
//         };

//         next(); // 🔥 MUST RUN
//     } catch (error) {
//         console.log("JWT ERROR 👉", error);
//         return res.status(401).json({
//             success: false,
//             message: "Invalid token"
//         });
//     }
// };



export default authMiddleWare;
