import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//Login user
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await userModel.findOne({ email })
//         if (!user) {
//             res.json({ success: false, mesage: "User does not exist" })
//         }
//         const isMatch = await bcrypt.compare(password, user.password)
//         if (!isMatch) {
//             return res.json({ success: false, mesage: "Invalid credentials" })
//         }
//         const token = createToken(user._id)
//         res.json({ success: true, token })
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, mesage: "Error" })
//     }
// }
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(String(password), user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = createToken(user._id);
        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Server error"
        });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
//Register User
// const registerUser = async (req, res) => {
//     const { name, password, email } = req.body;
//     try {
//         if (!name || !email || !password) {
//             return res.json({ success: false, message: "All fields are required" });
//         }
//         // checking isUser already exists
//         const exists = await userModel.findOne({ email })
//         if (exists) {
//             return res.json({ success: false, message: "User already exists" })
//         }
//         //validating email format and strong password
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Plesae enter valid email" })
//         }

//         if (password.length < 8) {
//             return res.json({ success: false, message: "Password must be at least 8 characters" });
//         }

//         //hashing user password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const newUser = new userModel({
//             name: name, email: email, password: hashedPassword
//         })
//         const user = await newUser.save();
//         const token = createToken(user._id)
//         res.json({ success: true, token })


//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "Error" })
//     }
// }
//self
// const registerUser = async (req, res) => {
//     const { name, password, email } = req.body;
//     // console.log("BODY =>", req.body);
//     // console.log("PASSWORD =>", password, typeof password);

//     try {
//         // Empty check
//         if (!name || !email || !password) {
//             return res.json({ success: false, message: "All fields are required" });
//         }

//         // User exists check
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User already exists" });
//         }

//         // Email validation
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter valid email" });
//         }

//         // Password strength

//         const passwordString = String(password);
//         if (passwordString.length < 8) {
//             return res.json({
//                 success: false,
//                 message: "Password must be at least 8 characters"
//             });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         // const hashedPassword = await bcrypt.hash(password, salt);
//         const hashedPassword = await bcrypt.hash(passwordString, salt);

//         // Save user
//         const newUser = new userModel({
//             name,
//             email,
//             password: hashedPassword
//         });

//         const user = await newUser.save();
//         const token = createToken(user._id);

//         res.json({ success: true, token });
//         console.log(user)

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };
//
//ai
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Empty check
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // User exists check
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Email validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" });
        }

        // Password strength
        const passwordString = String(password);
        if (passwordString.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordString, salt);

        // Save user with cartData initialized
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            cartData: {} // <-- ye important hai
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });
        console.log(user);

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
};

//

export { loginUser, registerUser }