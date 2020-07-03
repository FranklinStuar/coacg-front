import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueQuillEditor from "vue-quill-editor";
Vue.use(VueQuillEditor);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
