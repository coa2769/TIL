import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';

//1. 플러그인을 초기화(실행을 위한)하기위해 Vue.use함수를 사용한다.
Vue.use(VueRouter);

//2. VueRouter의 인스턴스를 생성하여 export로 외부에서 사용할 수 있도록 했다.
export default new VueRouter({
  routes: [
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/signup',
      component: SignupPage,
    },
  ],
});
