import express from 'express';
import { Container } from 'typedi';

const router = express.Router();

router.post('/', async(req, res, next)=>{
    try{
        //payload 추출
        const { id, comment } = req.body;
        //인스턴스 초기화
        const commentServiceInstance = Container.get("commentService");
        //comment 생성
        await commentServiceInstance.addComment({ id, comment });
        //응답 전송
        res.status(201).end()
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.put('/:id', async(req, res, next)=>{
    try{
        //파라미터 추출
        const { id } = req.params; //comment의 id
        //payload 추출
        const { comment } = req.body;
        //인스턴스 초기화
        const commentServiceInstance = Container.get("commentService");
        //comment 수정
        await commentServiceInstance.modifyComment({id, comment});
        //응답 전송
        res.status(201).end();
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
        const commentServiceInstance = Container.get("commentService");
        //comment 삭제
        await commentServiceInstance.deleteComment({id});
        //응답 전송
        res.status(201).end();
    }catch(err){
        console.error(err);
        next(err);
    }
});

export default router;