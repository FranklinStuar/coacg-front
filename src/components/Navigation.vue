<template>
  <div>
    <v-toolbar color='primary' class='navigation hidden-sm-and-down px-0' app fixed height='90'>
      <v-toolbar-items>
        <v-btn flat v-for="(button, index) in buttons" :key="index" class='menu-button white--text' active-class='menu-button-active' :to='button.link'>
          {{ english ? button.titleEn : button.title}}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <img class="navigation-logo hidden-md-and-down" src="../assets/logo.png" alt="logo">
      </v-toolbar-items>
    </v-toolbar>

    <v-toolbar color='primary' class='navigation pl-3 hidden-lg-and-up' app fixed height='90'>
      <v-toolbar-items>
        <v-layout column fill-height justify-center>
          <img height="55" src="../assets/logoFooter.png" alt="logo">
        </v-layout>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="toggleDrawer" flat>
          <v-icon color="white" size="24px">fa fa-bars</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="mt-5 pt-5 grey lighten-4 hidden-lg-and-up" disable-resize-watcher>
      <v-list class="grey lighten-4" dense>
        <v-list-tile v-for="(button, index) in buttons" @click="" :to="button.link" :key="index">
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">
              {{ button.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>


<script>
import NavbarLinks from "@/data/NavbarLinks.js";
export default {
  name: "navigation",
  data() {
    return {
      drawer: false,
      buttons: NavbarLinks,
      english: sessionStorage.english === "true"
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style type="text/css">
.navigation {
  z-index: 9999;
}
.navigation-logo {
  position: fixed;
  right: 0;
  top: 0;
}
.menu-button {
  font-size: 0.8rem;
  font-weight: 900;
}
.menu-button:hover {
  -webkit-box-shadow: 3px 3px 50px -33px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 3px 50px -33px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 3px 50px -33px rgba(0, 0, 0, 0.75);
  background-color: transparent;
  color: var(--color-secondary) !important;
}
.menu-button-active {
  /* -webkit-box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.37);
  -moz-box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.37);
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.37); */
  color: #fff !important;
  background-color: var(--color-secondary) !important;
}
.menu-button-active:hover {
  color: #fff !important;
}
</style>