<template>
  <v-flex xs12 class='page-header py-4'>
    <h1 class="page-header-title display-3 mt-0 pa-3 font-weight-regular">
      {{ title }}
    </h1>
  </v-flex>
</template>

<script>
export default {
  name: "pageheader",
  data() {
    return {};
  },
  props: ["title"]
};
</script>

<style>
.page-header {
  background-color: var(--color-primary);
  background-image: url("../assets/header.jpg");
  background-size: 100% 100%;
  height: 180px;
}
.page-header-title {
  color: var(--color-light);
  text-align: center;
  z-index: 3;
}
</style>