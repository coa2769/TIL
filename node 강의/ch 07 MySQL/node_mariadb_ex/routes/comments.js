import express from 'express';
import { Container } from 'typedi';

const router = express.Router();

router.post('/', async(req, res, next)=>{
    try{
        //payload 추출
        const { id, comment } = req.body;
        //인스턴스 초기화
        const commentServiceInstance = Container.get("commentService");
        const userServiceInstance = Container.get("userService");
        //comment 생성
        await commentServiceInstance.addComment({ id, comment });
        //해당 commenter의 comment를 모두 가져온다.
        let comments = await userServiceInstance.getUserComments({ id });
        //응답 전송
        res.status(201).json(comments);
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
        const { comment, commenter } = req.body;
        //인스턴스 초기화
        const commentServiceInstance = Container.get("commentService");
        const userServiceInstance = Container.get("userService");
        //comment 수정
        await commentServiceInstance.modifyComment({id, comment});
        let comments = await userServiceInstance.getUserComments({ id : commenter });
        //응답 전송
        res.status(201).json(comments);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.delete('/:id', async(req, res, next)=>{
    try{
        //파라미터 추출
        const { id } = req.params;
        const { commenter } = req.body;
        //인스턴스 초기화
        const commentServiceInstance = Container.get("commentService");
        const userServiceInstance = Container.get("userService");
        //comment 삭제
        await commentServiceInstance.deleteComment({id});
        //comments 가져오기
        let comments = await userServiceInstance.getUserComments({ id:commenter });
        //응답 전송
        res.status(201).json(comments);
    }catch(err){
        console.error(err);
        next(err);
    }
});

export default router;