<template>
  <v-container fluid class='social-networks pa-0'>
    <v-layout column>
      <v-tooltip right>
        <v-btn small slot="activator" color="cyan darken-2" dark fab class="lenguague-button subheading font-weight-bold">
          <v-icon color='white' :size='iconSize'>fa fa-eye</v-icon>
        </v-btn>
        <span>{{ english ? `Visits: ${visitTotal}` : `Visitas: ${visitTotal}` }} </span>
      </v-tooltip>
      <v-tooltip right>
        <v-btn small slot="activator" @click="changeLanguage" color="green darken-2" dark fab class="lenguague-button subheading font-weight-bold">
          <v-icon color='white' :size='iconSize'>fa fa-globe</v-icon>
        </v-btn>
        <span>{{ english ? 'Language: English' : 'Idioma: Español' }} </span>
      </v-tooltip>
      <v-tooltip right>
        <v-btn small slot="activator" href="https://twitter.com/coacgiron" target="_blank" dark fab class="twitter">
          <v-icon color='white' :size='iconSize'>fab fa-twitter</v-icon>
        </v-btn>
        <span> Twitter </span>
      </v-tooltip>
      <v-tooltip right>
        <v-btn small slot="activator" href="https://www.facebook.com/coacgiron/" target="_blank" dark fab class="facebook">
          <v-icon color='white' :size='iconSize'>fab fa-facebook</v-icon>
        </v-btn>
        <span> Facebook </span>
      </v-tooltip>
      <v-tooltip right>
        <v-btn small slot="activator" href="https://www.instagram.com/coacgiron/?hl=es-la" target="_blank" dark fab class="instagram">
          <v-icon color='white' :size='iconSize'>fab fa-instagram</v-icon>
        </v-btn>
        <span> Instagram </span>
      </v-tooltip>
      <v-tooltip right>
        <v-btn small slot="activator" href="https://www.youtube.com/user/COACGiron" target="_blank" dark fab class="youtube">
          <v-icon color='white' :size='iconSize'>fab fa-youtube</v-icon>
        </v-btn>
        <span> Youtube </span>
      </v-tooltip>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios';
import Settings from "@/data/Settings.js";
export default {
  name: "socialnetwork",
  data() {
    return {
      english: sessionStorage.english === "true",
      url: `${Settings.serverDomain}/cViews.php`,
      visitTotal: '',
      iconSize: '18px',
    };
  },
  created() {
    let data = new FormData();
    data.append("type", "18");
    axios({
      method: "post",
      url: this.url,
      data
    })
    .then( res => { 
      this.visitTotal = res.data.total;
    } )
  },
  methods: {
    changeLanguage() {
      let data = new FormData();
      data.append("type", "0");
      axios({
        method: "post",
        url: this.url,
        data
      })
        .then( res => {
          if (res.data === 1) {
            if (window.sessionStorage) {
              sessionStorage.setItem("english", true);
            } else {
              console.log("Session Storage not supported");
            }
          } else {
            sessionStorage.setItem("english", false);
          }
          location.reload();
        } )
        .catch( err => console.log(err) );
    }
  }
};
</script>
<style>
.social-networks {
  width: 70px;
  position: fixed;
  z-index: 6100;
  top: 30%;
  left: 20px;
  transition: ease 0.8s;
}
.social-network-icon {
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
  color: white;
}
.social-network-icon:hover {
  border-left: 13px var(--color-secondary) solid;
}
.social-network-icon a {
  text-decoration: none;
}

.twitter {
  background-color: #55acee !important;
}
.twitter:hover {
  background-color: var(--color-secondary) !important;
}
.facebook {
  background-color: #3b5998 !important;
}
.facebook:hover {
  background-color: var(--color-secondary) !important;
}
.instagram {
  background-color: #125688 !important;
}
.instagram:hover {
  background-color: var(--color-secondary) !important;
}
.youtube {
  background-color: #bb0000 !important;
}
.youtube:hover {
  background-color: var(--color-secondary) !important;
}

.lenguague-button:hover {
  background-color: var(--color-secondary) !important;
}
</style>