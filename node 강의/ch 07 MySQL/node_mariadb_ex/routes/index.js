import express from 'express';
import { Container } from 'typedi';
import userService from '../services/userServices.js';

const router = express.Router();

router.get('/', async(req, res, next)=>{
    try{
        //인스턴스 생성
        const userServiceInstance = Container.get(userService);
        //users 가져오기
        const users = userServiceInstance.getUsers({});

    }catch(err){
        console.error(err);
        next(err);
    }
});

export default router;