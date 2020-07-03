<template>
  <v-layout class='pa-0' column>
    <PageHeader title='Costos Financieros'></PageHeader>
    <v-container class='pa-0 py-4'>
      <v-layout row wrap>
        <v-flex xs12 md3>
          <v-container class='pa-0'>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card class='service-list'>
                  <h3 class="py-3 px-4 font-weight-bold title sidebar-title white--text">{{english ? 'Tables' : 'Tablas'}}</h3>
                  <v-expansion-panel>
                    <v-expansion-panel-content v-for="(menu, menuIndex) in english ? menusEn : menus" :key="menuIndex" class="pa-0">
                      <div slot="header" class="subheading font-weight-medium">{{ menu.titulo }}</div>
                      <v-list class="py-0">
                        <v-list-tile v-for="(item, serviceIndex) in menu.items" class='service-item' :class="{ active: item.overlay === '1' }" :key='serviceIndex' @click='selectTable(item.index)'>
                          <v-list-tile-content class='service-title pl-3'>
                            <v-list-tile-title class="font-weight-regular subheading">
                              {{ item.titulo }}
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
        </v-flex>
        <v-flex xs12 md9 class='px-3'>
          <!-- Plazo Fijo -->
          <v-card v-for="(table, index) in english ? tablesEn : tables" :key="index" v-show="table.overlay === 1">
            <transition name='table-fade' mode="out-in">
              <v-layout column>
                <v-card-title primary-title>
                  <v-flex xs12 class="mb-4">
                    <h3 class='display-1'>
                      {{ table.titulo }}
                    </h3>
                  </v-flex>
                  <p class="title mb-4">{{ table.subtitulo }}</p>
                  <v-flex class="text-xs-center" xs12>
                    <img style="max-width: 100%" :src="`${imgDomain}/Assets/${table.imagen}`" alt="">
                  </v-flex>
                </v-card-title>
              </v-layout>
            </transition>
          </v-card>
          <!-- Plazo Fijo -->
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import Settings from "@/data/Settings.js";

export default {
  name: "tables",
  data() {
    return {
      english: sessionStorage.english === "true",
      imgDomain: Settings.resourcesDomain,
      menus: [
        {
          titulo: 'Tasas Pasivas (Ahorro)',
          items: [
            { index: 0, titulo: "Plazo Fijo", overlay: 1 },
            { index: 1, titulo: "Ahorro a la Vista", overlay: 1 },
            { index: 2, titulo: "Ahorro Programado", overlay: 1 }
          ]
        },
        {
          titulo: "Tasas Activas (Créditos)",
          items: [
            { index: 3, titulo: "Tasas Activas de la cooperativa", overlay: 0 },
            { index: 4, titulo: "Gestión de Cobranza", overlay: 0 }
          ]
        },
        {
          titulo: "Costos Financieros",
          items: [
            { index: 5, titulo: "Costos por Apertura de Cuenta", overlay: 0 },
            { index: 6, titulo: "Servicios Financieros Basicos", overlay: 0 },
            {
              index: 7,
              titulo: "Servicios financieros con cargos maximos",
              overlay: 0
            }
          ]
        }
      ],
      menusEn: [
        {
          titulo: 'Pasive Rates (Savings)',
          items: [
            { index: 0, titulo: "Fixed term", overlay: 1 },
            { index: 1, titulo: "Savings at sight", overlay: 1 },
            { index: 2, titulo: "Programmed Savings", overlay: 1 }
          ]
        },
        {
          titulo: "Active Rates (Credits)",
          items: [
            { index: 3, titulo: "Active rates of the cooperative", overlay: 0 },
            { index: 4, titulo: "Collection management", overlay: 0 }
          ]
        },
        {
          titulo: "Financial costs",
          items: [
            { index: 5, titulo: "Account Opening Costs", overlay: 0 },
            { index: 6, titulo: "Basic Financial Services", overlay: 0 },
            {
              index: 7,
              titulo: "Financial services with maximum charges",
              overlay: 0
            }
          ]
        }
      ],
      tables: [
        {index: 0,titulo: "Plazo Fijo",subtitulo: "Tabla Plazo Fijo",imagen: "tablaPlazoFijo.png",overlay: 1},
        {index: 1,titulo: "Ahorro a la vista",subtitulo: "Tabla Ahorro a la vista",imagen: "tablaAhorroalaVista.png",overlay: 0},
        {index: 2,titulo: "Ahorro Programado",subtitulo: "Tabla Ahorro Programado",imagen: "tablaAhorroProgramado.png",overlay: 0},
        {index: 3,titulo: "Tasas Activas",subtitulo: "Tabla de Tasas Activas",imagen: "tasasActivas.png",overlay: 0},
        {index: 4,titulo: "Gestión de Cobranza",subtitulo: "Tabla Gestión de Cobranza",imagen: "gestionCobranza.png",overlay: 0},
        {index: 5,titulo: "Apertura de Cuenta",subtitulo: "Tabla Apertura de Cuenta",imagen: "aperturaCuenta.png",overlay: 0},
        {index: 6,titulo: "Servicios Financieros Basicos",subtitulo: "Tabla Servicios Financieros Basicos",imagen: "serviciosBasico.png",overlay: 0},
        {index: 7,titulo: "Servicios financieros con cargos maximos",subtitulo: "Tabla Servicios financieros con cargos maximos",imagen: "serviciosCargoMaximo.png",overlay: 0}
      ],
      tablesEn: [
        {index: 0,titulo: "Fixed term",subtitulo: "Table of Fixed term",imagen: "tablaPlazoFijo.png",overlay: 1},
        {index: 1,titulo: "Savings at sight",subtitulo: "Table of Savings at sight",imagen: "tablaAhorroalaVista.png",overlay: 0},
        {index: 2,titulo: "Programmed Savings",subtitulo: "Table of Programmed Savings",imagen: "tablaAhorroProgramado.png",overlay: 0},
        {index: 3,titulo: "Active rates of the cooperative",subtitulo: "Table of de Active rates of the cooperative",imagen: "tasasActivas.png",overlay: 0},
        {index: 4,titulo: "Collection management",subtitulo: "Table of Collection management",imagen: "gestionCobranza.png",overlay: 0},
        {index: 5,titulo: "Account Opening Costs",subtitulo: "Table of Account Opening Costs",imagen: "aperturaCuenta.png",overlay: 0},
        {index: 6,titulo: "Basic Financial Services",subtitulo: "Table of Basic Financial Services",imagen: "serviciosBasico.png",overlay: 0},
        {index: 7,titulo: "Financial services with maximum charges",subtitulo: "Table of Financial services with maximum charges",imagen: "serviciosCargoMaximo.png",overlay: 0}
      ],
    };
  },
  components: {
    PageHeader
  },
  methods: {
    selectTable: function(index) {
      this.tables.forEach(table => {
        table.overlay = 0;
      });
      this.tables[index].overlay = 1;
    }
  }
};
</script>

<style scoped>
.service-description {
  position: relative;
}

.table-fade-enter,
.table-fade-leave-to {
  opacity: 0;
  width: 0px;
  height: 0px;
}

.table-fade-enter-to,
.table-fade-leave {
  opacity: 1;
  width: 100%;
  height: auto;
}

.table-fade-enter-active,
.table-fade-leave-active {
  transition: linear 0.5s;
}
</style>