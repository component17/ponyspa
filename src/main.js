// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'

import('./assets/css/main.css');

import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.72/api';
// axios.defaults.baseURL = '/api';

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
    iconfont: 'mdi'
});


