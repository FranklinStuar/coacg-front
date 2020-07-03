<template>
  <transition name="lightbox-show">
    <v-card class="lightbox" v-show="show">
      <div class="lightbox-overlay"></div>
      <v-card-actions class="lightbox-actions">
        <v-spacer></v-spacer>
        <v-btn icon @click="onCancelClick">
          <v-icon color="secondary">cancel</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-media style="width:100%; height:100%">
        <v-container fill-height fluid pa-2>
          <v-layout fill-height>
            <img class="lightbox-image" :src="src" alt="">
          </v-layout>
        </v-container>
      </v-card-media>
    </v-card>
  </transition>
</template>


<script>
export default {
  name: "lightbox",
  data() {
    return {};
  },
  props: ["src", "title", "show", "onCancelClick"],
  mounted() {}
};
</script>

<style type="text/css">
.lightbox {
  position: fixed;
  z-index: 99999;
  left: 25%;
  top: 5%;
  width: 614px;
  height: 500px !important;
}
.lightbox-overlay {
  position: fixed;
  width: 200%;
  height: 100%;
  background-color: #000;
  top: 0;
  left: 0;
  z-index: 2999;
  opacity: 0.1;
}
.lightbox-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.lightbox-actions {
  background-color: transparent !important;
  position: absolute;
  right: 0;
  z-index: 3001;
}
.lightbox-show-enter,
.lightbox-show-leave-to {
  opacity: 0;
  width: 10%;
  max-height: 10% !important;
}

.lightbox-show-enter-to,
.lightbox-show-leave {
  opacity: 1;
  width: 614px;
  height: 500px !important;
}

.lightbox-show-enter-active,
.lightbox-show-leave-active {
  transition: ease 0.3s;
}
</style>