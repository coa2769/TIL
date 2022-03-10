import express from 'express';
import { Container } from 'typedi';
import userService from '../services/userServices.js';

const router = express.Router();

router.get('/', async(req, res, next)=>{
    try{
        //사용 인스턴스 초기화
        const userServiceInstance = Container.get("userService");
        //user 정보 가져오기
        const users = await userServiceInstance.getUsers({});

        //응답 보내기
        res.json(users);
    }catch(err){
            console.error(err);
            next(err);
    }
});

router.post('/', async(req, res, next)=>{
    try{
        //payload에서 추출
        const { name, age, married } = req.body;
        //사용 인스턴스 초기화
        const userServiceInstance = Container.get("userService");
        //user 정보 생성하기
        await userServiceInstance.addUser({
            name, age, married
        });
        //user 정보 리스트 가져오기
        let users = await userServiceInstance.getUsers({});

        //응답 보내기
        res.status(201).json(users);

    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/:id/comments', async(req, res, next)=>{
    try{
        //파라미터 추출
        const { id } = req.params;
        console.log(id);
        //사용 인스턴스 초기화
        const userServiceInstance = Container.get("userService");
        //특정 user의 comments 가져오기
        const comments = await userServiceInstance.getUserComments({ id });
        //응답 보내기
        res.json(comments);

    }catch(err){
        console.error(err);
        next(err);
    }
});

export default router;