<template>
  <!--
    button을 눌렀을 때 submit 이벤트가 발생하고 이벤트 버블링이 일어나기 때문에
    form에서도 이벤트가 발생한다.

    prevent : 이벤트에 대한 기본적인 동작을 막아준다.
  -->
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <input id="username" type="text" v-model="username">
    </div>
    <div>
      <label for="password">password: </label>
      <input id="password" type="password" v-model="password">
    </div>
    <button type="submit">login</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data : function(){
    return {
      username:'',
      password:'',
    }
  },
  methods: {
    submitForm: function(event){
      //submit button이 눌린 후에는 새로고침 된다.
      //이를 막기 위해 preventDefault 함수를 실행해 준다. (JS 방식)
      event.preventDefault();
      console.log(this.username, this.password);
      var url = 'https://jsonplaceholder.typicode.com/users';
      var data = {
        username : this.username,
        password : this.password,
      }
      axios.post(url, data)
      .then(function(response){
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      });
    }
  }
}
</script>

<style>

</style>