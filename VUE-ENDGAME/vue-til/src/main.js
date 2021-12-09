import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router, //가져온 라우터 인스턴스를 등록
}).$mount('#app');
