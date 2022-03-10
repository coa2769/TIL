import express from 'express';
import { Container } from 'typedi';
import userService from '../services/userServices.js';
import path from "path";
const __dirname = path.resolve();

const router = express.Router();

router.get('/', (req, res, next)=>{
    console.log(__dirname);
    console.log(path.join(__dirname, '/public', 'index.html'));
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});
// router.get('/', async(req, res, next)=>{
//     try{
//         //인스턴스 생성
//         const userServiceInstance = Container.get(userService);
//         //users 가져오기
//         const users = userServiceInstance.getUsers({});

//     }catch(err){
//         console.error(err);
//         next(err);
//     }
// });

export default router;