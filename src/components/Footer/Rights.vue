	<template>
  <v-flex xs12 class="text-xs-center footer-rights">
    <v-layout row wrap class="py-5 pl-4">
      <v-flex xs12 class="text-xs-center">
        <img src="../../assets/logoFooter.png" :class="imgResponsive">
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  computed: {
    imgResponsive() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "footer-img-sm";
        case "sm":
          return "footer-img-sm";
        case "md":
          return "footer-img-md";
        case "lg":
          return "footer-img-md";
        case "xl":
          return "footer-img-md";
      }
    }
  }
};
</script>

<style>
.footer-rights {
  height: auto !important;
}

.footer-img-md {
  max-width: 40%;
}
.footer-img-sm {
  max-width: 100%;
}
</style>
