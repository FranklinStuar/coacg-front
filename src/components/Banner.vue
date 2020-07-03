<template>
  <v-carousel v-if="banners.length > 0" class='banner mb-2' :class="carouselHeight" hide-delimiters>
    <v-carousel-item v-for="(banner, index) in banners" :key="index">
      <v-layout row wrap fill-height>
        <v-flex xs12 md9 :class="carouselMargin">
          <img class="banner-image" :src="`${imgDomain}/Banner/${banner.imagen}`" :alt="banner.imagen">
        </v-flex>
        <v-flex xs12 md3>
          <v-card color='primary' class='banner-card'>
            <v-card-title primary-title class='white--text title'>
              {{ banner.titulo }}
            </v-card-title>
            <v-card-text class='white--text subheading'>
              {{ banner.descripcion }}
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn :href="banner.enlace" color="secondary" class="font-weight-black ">{{ english ? 'See more' : 'Ver Más'}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import Settings from "@/data/Settings.js";
import axios from "axios";
export default {
  name: "banner",
  data() {
    return {
      english: sessionStorage.english === "true",
      imgDomain: Settings.resourcesDomain,
      banners: [],
      url: `${Settings.serverDomain}/cViews.php`
    };
  },
  created() {
    this.updateBanners();
  },
  methods: {
    updateBanners() {
      let data = new FormData();
      data.append("type", "3");
      axios({
        method: "post",
        url: this.url,
        data: data
      }).then(res => {
        this.banners = res.data;
      });
    }
  },
  computed: {
    carouselMargin() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "pr-0 mb-2";
        case "sm":
          return "pr-0 mb-2";
        case "md":
          return "pr-2 mb-0";
        case "lg":
          return "pr-2 mb-0";
        case "xl":
          return "pr-2 mb-0";
      }
    },
    carouselHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "banner-height-sm-down";
        case "sm":
          return "banner-height-sm-down";
        case "md":
          return "banner-height-md-up";
        case "lg":
          return "banner-height-md-up";
        case "xl":
          return "banner-height-md-up";
      }
    }
  }
};
</script>

<style type="text/css" media="screen">
.banner .v-carousel__next {
  right: 1% !important;
  bottom: -4% !important;
  top: unset;
}
.banner .v-carousel__prev {
  right: 7% !important;
  bottom: -4% !important;
  top: unset;
  left: unset;
}
.banner-height-md-up {
  height: 400px;
}
.banner-height-sm-down {
  height: auto;
}
.banner-image {
  display: block !important;
  width: 100%;
  height: 100%;
}
.banner-card {
  height: 100%;
}
</style>

