<template>
  <v-footer color='primary' height="auto" class="px-5" dark>
    <v-layout column>
      <Rights></Rights>
      <v-divider></v-divider>
      <FooterBody></FooterBody>
      <v-flex style="border-top: 0.5px rgba(255,255,255,0.3) solid" class="py-3 text-xs-center" xs12>
        &copy;2018 — <strong class="border">HA Services & Adscript Development Studio</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
import Rights from "./Rights.vue";
import FooterBody from "./FooterBody.vue";
export default {
  name: "appfooter",
  components: {
    Rights,
    FooterBody
  }
};
</script>

<style>
</style>
