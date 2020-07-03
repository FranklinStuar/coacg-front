<template>
  <v-flex d-flex xs12 class="footer-socials py-2">
    <v-btn v-for="(icon,index) in icons" :key="index" class="mx-0 white--text border" flat block large :href="icon.link" target="_blank" style="min-width: 0px !important;">
      <v-icon size="25px">{{ icon.icon }}</v-icon>
    </v-btn>
  </v-flex>
</template>

<script>
import FooterData from "@/data/FooterData.js";
export default {
  name: "socials",
  data() {
    return {
      icons: FooterData[0].icons
    };
  }
};
</script>

<style>
.footer-socials {
  flex: 0 0 auto;
}
</style>
