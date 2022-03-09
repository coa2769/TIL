import mariadb from 'mariadb';

import dotenv from 'dotenv';
dotenv.config();

const pool = mariadb.createPool({
    host : process.env.DB_HOST,
    port : 3306,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    connectionLimit : 5,
});


//query 생성 함수
const createQuery = (method, ob)=>{
    //method가 없다면 error
    if(method === undefined) return undefined;

    let values = [];
    let query = undefined;

    //해당 method에 따라 생성되는 query와 values가 다르다.
    switch(method){
      case "insertUser":
        query = `
        INSERT INTO
        users(name, age, married)
        VALUES(?,?,?)
        `;
        values = [ob.name, ob.age, ob.married ];
        break;
      case "selectUsers":
        query=`
        SELECT
          *
        FROM
          users
        `;
        break;
      case "selectUserComments":
        query = `
        SELECT
          *
        FROM
          comments
        WHERE
          commenter = ?
        `;
        values = [ob.id];
        break;
      case 'insertComment':
        query=`
        INSERT INTO
        comments(commenter, comment)
        VALUES(?,?)
        `;
        values = [ob.id, ob.comment];
        break;
      case 'updateComment':
        query=`
        UPDATE comments
        SET
          comment = ?
        WHERE
          id=?
        `;
        values = [ob.comment, ob.id];
        break;
      case 'deleteComment':
        query=`
        DELETE FROM 
          comments
        WHERE
          id=?
        `;
        values = [ob.id];
        break;
    }

    return { query, values };
}

let dbModel = {};

dbModel.singleQuery = async(method, value, etc)=>{
    let conn;
    const { query, values } = createQuery(method, value);
    let result = undefined;
    try{
        //DB에 접속
        conn = await pool.getConnection();

        if(values !== undefined) result = await conn.query(query, values);
        else result = await conn.query(query);
        return result;
    }catch(e){
        conn.release();
        console.log("e", e);
        throw e;
    } finally{ 
        if(conn) conn.end();
    }
};

export default dbModel;

/*
//단일 쿼리 처리기 (메소드, 객체 오브젝트, 그외)
dbModel.singleQuery = async (method, value, etc) => {
  let conn;
  const { query, values } = dbValue(method, value);
  let result = undefined;
  try {
    conn = await pool.getConnection();

    if (values !== undefined) result = await conn.query(query, values);
    else result = await conn.query(comQuery);
    return result;
  } catch (e) {
    console.log("e", e);
    throw e;
  } finally {
    if (conn) conn.end();
  }
};
//다수 쿼리 처리기 (메소드, 객체 오브젝트, 그외)
//트랜젝션 사용
dbModel.batchQuery = async (method, value, etc) => {
  let conn;
  const { query, values } = dbValue(method, value);
  let result = undefined;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();
    result = await conn.batch(query, values);
    conn.commit();
    return result;
  } catch (e) {
    console.log("e", e);
    conn.rollback();
    throw e;
  } finally {
    if (conn) conn.end();
  }
};
*/