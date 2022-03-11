<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>
      <form id="user-form" v-on:submit.prevent="postUser">
        <fieldset>
          <legend>사용자 등록</legend>
          <div><input id="username" type="text" placeholder="이름" v-model="userName"></div>
          <div><input id="age" type="number" placeholder="나이" v-model="userAge"></div>
          <div><input id="married" type="checkbox" v-model="userMarried"><label for="married">결혼 여부</label></div>
          <button type="submit">등록</button>
        </fieldset>
      </form>
    </div>
    <br>
    <table id="user-list">
      <thead>
      <tr>
        <th>아이디</th>
        <th>이름</th>
        <th>나이</th>
        <th>결혼여부</th>
      </tr>
      </thead>
      <tbody>
        <tr v-bind:key="user.id" v-for="user in users">
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.age}}</td>
          <td v-if="user.married">기혼</td>
          <td v-else>미혼</td>
        </tr>
      </tbody>
    </table>
    <br>
    <div>
      <form id="comment-form" v-on:submit.prevent="postComment">
        <fieldset>
          <legend>댓글 등록</legend>
          <div><input id="userid" type="text" placeholder="사용자 아이디" v-model="commenter"></div>
          <div><input id="comment" type="text" placeholder="댓글" v-model="comment"></div>
          <button type="submit">등록</button>
        </fieldset>
      </form>
    </div>
    <br>
    <table id="comment-list">
      <thead>
      <tr>
        <th>아이디</th>
        <th>작성자</th>
        <th>댓글</th>
        <th>수정</th>
        <th>삭제</th>
      </tr>
      </thead>
      <tbody>
        <tr v-bind:key="comment.id" v-for="comment in comments">
          <td>{{comment.id}}</td>
          <td>{{comment.commenter}}</td>
          <td>{{comment.comment}}</td>
          <td><button v-on:click="openUpdatePrompt(comment.id)">수정</button></td>
          <td><button v-on:click="deleteComment(comment.id)">삭제</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';

let host = 'http://localhost:3000';

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  mounted(){
    //user 가져오기
    this.getUsers();
  },
  data: ()=>{
    return {
      userName : '',
      userAge : null,
      userMarried : false,
      commenter : null,
      comment : '',
      users : [
        {
          id : 1,
          name : '이름이다',
          age : 13,
          married : false
        },
      ],
      comments : [
        {
          id : 1,
          commenter : 1,
          comment : '안녕하세요',
        }
      ]
    }
  },
  methods: {
    async getUsers(){
      try{
        let result = await axios.get(`${host}/users`);
        console.log(result);
        this.users = result.data;
      }catch(err){
        console.error(err);
      }

    },
    async getComment(id){
      try{
        let result = await axios.get(`${host}/users/${id}/comments`);
        console.log(result);
        this.comments = result.data;
      }catch(err){
        console.error(err);
      }
    },
    async postUser(){
      if(!this.userName) return alert('이름을 입력하세요');
      if(!this.userAge) return alert('나이를 입력하세요');

      try{
        //1. 전송
        await axios.post('/users', {
          name : this.userName,
          age : this.userAge,
          married : this.userMarried,
        });
        //2. user 리스트 업데이트
        this.getUsers();
        //3. 입력 값 비우기
        this.userName = '';
        this.userAge = null;
        this.userMarried = false;
      }catch(err){
        console.error(err);
      }
    },
    async postComment(){
      if(!this.commenter) return alert('아이디를 입력하세요');
      if(!this.comment) return alert('댓글을 입력하세요');

      try{
        //1. 전송
        await axios.post('/comments', {
          id : this.commenter,
          comment : this.comment,
        });

        //2. comment 리스트 업데이트
        this.getComment(this.commenter);
        //값 비우기
        this.comment = '';
      }catch(err){
        console.error(err);
      }
    },
    async openUpdatePrompt(id){
      //1. 바꿀 내용 입력
      const newComment = prompt('바꿀 내용을 입력하세요');
      if(!newComment){
        return alert('내용을 반드시 입력하셔야 합니다');
      }
      try{
        await axios.put(`/comments/${id}`, {comment : newComment});
        this.getComment(this.commenter);
      }catch(err){
        console.error(err);
      }
    },
    async deleteComment(id){
      try{
        axios.delete(`/comments/${id}`);
        this.getComment(this.commenter);
      }catch (err){
        console.error(err);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}

table {
  border: 1px solid black;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid black;
}

</style>
