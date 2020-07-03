// DEPENDENCIES
  import Vue from 'vue';
  import Router from 'vue-router';
// DEPENDENCIES

// VIEWS IN THE PAGE 
  import Home from './views/Home.vue';
  import About from './views/About.vue';
  import Agencies from './views/Agencies.vue';
  import News from './views/News.vue';
  import Services from './views/Services.vue';
  import Jobs from './views/Jobs.vue';
  import NewsTopic from './views/NewsTopic.vue';
  import Calculator from './views/Calculator.vue';
  import Formalities from './views/Formalities.vue';
  import Tables from './views/Tables.vue';
// VIEWS IN THE PAGE 

// FORUM VIEWS
  import Forum from './forum/Forum.vue';
  import ForumUserRegister from './forum/ForumUserRegister.vue';
  import ForumUser from './forum/ForumUser.vue';
  import ForumCategories from './forum/ForumCategories.vue';
  import ForumTopics from './forum/ForumTopics.vue';
  import ForumReplies from './forum/ForumReplies.vue';
  import ForumCompleteRegister from './forum/ForumCompleteRegister.vue';
  import ForumPassRecovery from './forum/ForumPassRecovery.vue';
// FORUM VIEWS

Vue.use(Router);
// 
export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/agencies', name: 'agencies', component: Agencies },
    { path: '/services', name: 'services', component: Services },
    { path: '/news', name: 'news', component: News },
    { path: '/newstopic/:id', name: 'newstopic', component: NewsTopic, },
    { path: '/jobs', name: 'jobs', component: Jobs },
    { path: '/calculator', name: 'calculator', component: Calculator },
    { path: '/formalities', name: 'formalities', component: Formalities },
    { path: '/tables', name: 'tables', component: Tables },
    { path: '/completeregister/:token', name: 'completeregister', component: ForumCompleteRegister },
    { path: '/recoveryPassword/:token', name: 'recoveryPassword', component: ForumPassRecovery },
    { path: '/forumregister', name: 'register', component: ForumUserRegister },
    { 
      path: '/forum', 
      name: 'forum', 
      component: Forum,
      children: [
        { path: '', name: 'categories', component: ForumCategories },
        { path: 'topics/:id',name: 'topics', component: ForumTopics, },
        { path: 'user/:user', name: 'user', component: ForumUser },
        { path: 'topicsreplies/:id', name: 'topicsreplies', component: ForumReplies },
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition){
    return { x: 0, y:0 }
  }
})
