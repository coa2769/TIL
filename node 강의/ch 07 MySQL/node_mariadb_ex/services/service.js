import model from "../models/mariadb.js";

//("쿼리","에러 메시지")=>("정보 객체")=>{singlequery} 구조이다.
//export하는 class에 등록되는 함수는 ("정보 객체")=>{singlequery}이다.
const serviceFuc = (query, message)=>
    async(object)=>{
        try{
            const result = await model.singleQuery(query, object);
            return result;
        }catch(e){
            e.message = message;
            console.log("e", e);
            throw(e);
        }
    };

export default serviceFuc;