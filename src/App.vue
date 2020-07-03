<template>
  <v-app :style="`background: url(${Background}) no-repeat fixed`">
    <SocialNetwork class="hidden-sm-and-down"></SocialNetwork>
    <Navigation></Navigation>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view style="background-color:white;"></router-view>
      </transition>
    </v-content>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script>
import SocialNetwork from "./components/SocialNetwork.vue";
import Navigation from "./components/Navigation.vue";
import AppFooter from "./components/Footer/Footer.vue";
import Background from "./assets/background.png";
import axios from 'axios';
import Settings from "@/data/Settings.js";

export default {
  name: "app",
  data() {
    return {
      english: sessionStorage.english === "true",
      url: `${Settings.serverDomain}/cViews.php`,
      Background
    };
  },
  created() {
    let data = new FormData();
    data.append("type", "17");
    axios.post(this.url, data)
    .then( res => console.log('Welcome!') )
    .catch( err => console.log(err) )
  },
  components: {
    SocialNetwork,
    Navigation,
    AppFooter
  }
};
</script>

<style>
:root {
  --color-primary: #0085ae;
  --color-primary-tab-active: rgba(52, 155, 187, 0.35);
  --color-primary-hover: rgba(0, 133, 173, 0.35);
  --color-secondary: #c6d248;
  --color-secondary-hover: rgba(20, 20, 16, 0.35);
  --color-light: #fff;
  --color-cloud: #ecf0f1ff;
  --color-cloud-hover: rgb(243, 246, 247);
  --color-dark: #282828;
}

@media only screen and (min-width: 1264px) {
  .container {
    max-width: 87%;
  }
}
@media only screen and (min-width: 960px) {
  .container {
    max-width: 85%;
  }
}
@media only screen and (min-width: 1904px) {
  .application {
    justify-content: center;
    background: none !important;
  }
  .application--wrap {
    max-width: 1366px;
  }
  .navigation {
    max-width: 1366px;
    position: relative;
  }
  .v-content {
    padding: 0 !important;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  margin-right: -200px;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
  margin-right: 0px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all ease 0.5s;
}
* {
  font-family: "Open Sans", sans-serif;
}
</style>
