import Vue from 'vue';

import App from './app.vue';

window.app = new Vue({
    render: h => h(App),
}).$mount('#app');