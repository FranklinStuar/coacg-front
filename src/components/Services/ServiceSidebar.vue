<style>
.service-list {
  /* border-radius: 5px; */
}
.sidebar-title {
  background-color: var(--color-primary) !important;
  font-weight: 400;
}
.service-item {
  background-color: transparent;
  cursor: pointer;
}
.service-title {
  font-size: 14px;
  color: var(--color-light);
}
.menuItemActive {
  background-color: var(--color-cloud-hover) !important;
  color: #fff !important;
  border-right: 6px #a6b405 solid;
}
.menuItemActive .v-list__tile__title {
  font-weight: 500;
  font-size: 15px;
}
</style>

<template>
  <v-container class='pa-0'>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class='service-list'>
          <h3 class="py-3 px-4 font-weight-bold title sidebar-title white--text">{{ label }}</h3>
          <v-expansion-panel>
            <v-expansion-panel-content
              v-for="(menu, menuIndex) in services"
              :key="menuIndex"
              class="pa-0"
            >
              <div slot="header" class="subheading font-weight-black">{{ menu.title }}</div>
              <v-list class="py-0">
              <v-list-tile
                v-for="(service, serviceIndex) in menu.services" 
                class='service-item' 
                :class="{ menuItemActive: service.overlay === '1' }" 
                :key='serviceIndex' 
                @click='onClickItemHandler( menuIndex, serviceIndex )'
              >
                <v-list-tile-content class='service-title pl-4'>
                  <v-list-tile-title class="font-weight-regular subheading">
                    {{ service.titulo }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            </v-expansion-panel-content>
            <v-expansion-panel-content class="pa-0">
              <div slot="header" class="subheading font-weight-black">{{ english ? 'Formalities' : 'Tramites'  }}</div>
              <v-list class="pa-0">
                <v-list-tile
                  class='service-item'
                  @click=""
                  to="/formalities" 
                >
                  <v-list-tile-content class='service-title pl-4'>
                    <v-list-tile-title class="font-weight-regular subheading">
                      {{english ? 'Request' : 'Solicitudes'}}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
            </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "servicesidebar",
  data() {
    return {
      english: sessionStorage.english === 'true',
    };
  },
  computed: {},
  props: ["services", "dataSearch", "onClickItemHandler", "label"],
  methods: {}
};
</script>