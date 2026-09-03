import { mongo } from "mongoose";

const isProd = process.env.MODE === 'prod';
const config = {
    baseUrl: isProd ? process.env.PROD_BASE_URL : process.env.DEV_BASE_URL,
    jwtSecret: isProd ? process.env.PROD_JWT_SECRET : process.env.DEV_JWT_SECRET, 
    mongodbUrl: isProd ? process.env.PROD_MONGODB_URL : process.env.DEV_MONGODB_URL
}
 
export default config