import express from 'express';
import { Container } from 'typedi';
import commentService from '../services/commentService.js';

const router = express.Router();

router.post('/', async(req, res, next)=>{
    try{
        //payload 추출
        const { id, comment } = req.body;
        //인스턴스 초기화
        const commentServiceInstance = Container.get(commentService);
        //comment 생성
        const newComment = await commentServiceInstance.addComment({ id, comment });
        //응답 전송
        res.status(201).json(newComment);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.put('/:id', async(req, res, next)=>{
    try{
        //파라미터 추출
        const { id } = req.params;
        //payload 추출
        const { comment } = req.body;
        //인스턴스 초기화
        const commentServiceInstance = Container.get(commentService);
        //comment 수정
        const result = await commentServiceInstance.modifyComment({id, comment});
        //응답 전송
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.delete('/:id', async(req, res, next)=>{
    try{
        //파라미터 추출
        const { id } = req.params;
        //인스턴스 초기화
        const commentServiceInstance = Container.get(commentService);
        //comment 삭제
        const result = await commentServiceInstance.deleteComment({id});
        //응답 전송
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
});

export default router;