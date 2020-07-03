<template>
  <v-layout class='pa-0' column>
    <PageHeader :title="english ? 'Services' : 'Servicios'"></PageHeader>
    <v-container class='pa-0 py-4'>
      <v-layout row wrap>
        <v-flex xs12 md3>
          <ServiceSidebar :label="english ? 'Services' : 'Servicios'" :services='categoriesMenu' :onClickItemHandler='selectService'>
          </ServiceSidebar>
        </v-flex>
        <quill-editor ref="servicesQuill" v-show="false"></quill-editor>
        <v-flex xs12 md9 class='px-3'>
            <transition name='fade' mode="out-in">
              <v-card v-for="(service, index) in services" :key='index' v-if="service.overlay === '1'">
                  <v-layout column>
                    <v-card-media v-if="service.imagen !== '0'" style="height: 400px">
                      <img style="object-fit: contain" :src="`${imgDomain}/Services/${service.imagen}`" >
                    </v-card-media>
                      <v-card-title primary-title>
                        <v-flex xs12>
                          <h3 class='display-1'>
                            {{ service.titulo }}
                          </h3>
                        </v-flex>
                        <v-flex xs12>
                          <div class="mt-4 px-4" :id="`service-render`">
                          </div>
                          <img @error="updateRender" v-show="false" src="" alt="">
                        </v-flex>
                      </v-card-title>
                  </v-layout>
              </v-card>
            </transition>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import ServiceSidebar from "@/components/Services/ServiceSidebar.vue";
import Settings from "@/data/Settings.js";
import "@/assets/quill.snow.css";
import axios from "axios";

export default {
  name: "services",
  data() {
    return {
      services: [],
      categoriesMenu: [],
      serviceToRender: [],
      url: `${Settings.serverDomain}/cViews.php`,
      imgDomain: Settings.resourcesDomain,
      english: sessionStorage.english === 'true',
    };
  },
  components: {
    PageHeader,
    ServiceSidebar
  },
  created() {
    this.getServices();
  },
  methods: {
    getServices() {
      let data = new FormData();
      data.append("type", "4");
      axios({
        method: "post",
        url: this.url,
        data: data
      })
        .then(res => {
          this.services = res.data;
          this.services[0].overlay = '1';
          let servicesCategories = res.data.filter( (data, index, self) => {
            return index === self.findIndex( t => t.catServDescripcion === data.catServDescripcion)
          } )
          servicesCategories.forEach( (servicesCategory) => {
            let filteredLinks = res.data.filter( data => {
              return data.catServDescripcion === servicesCategory.catServDescripcion
            } )
            this.categoriesMenu.push({ title: servicesCategory.catServDescripcion, services: filteredLinks})
          })
        })
        .then( res => this.updateServices() )
        .catch(err => console.log(err));
  },
    selectService: function(category, index) {
      this.categoriesMenu.forEach( (menu) => {
        menu.services.forEach( (service) => {
          service.overlay = "0"
        })
      });
      this.categoriesMenu[category].services[index].overlay = "1";
      this.updateServices();
    },
    updateServices(){
      let { services, $refs } = this;
      let currentService = services.find( service => {
        return service.overlay === '1';
      } )
      this.serviceToRender = currentService;
    },
    updateRender(){
      this.$refs.servicesQuill.quill.setContents(JSON.parse(this.serviceToRender.descripcion));
      document.getElementById(`service-render`).innerHTML = this.$refs.servicesQuill.quill.container.firstElementChild.innerHTML;
    }
  },
};
</script>

<style scoped>
.service-services-fade-enter,
.service-services-fade-leave-to {
  opacity: 0;
}

.service-fade-enter-to,
.service-fade-leave {
  opacity: 1;
}

.service-fade-enter-active,
.service-fade-leave-active {
  transition: linear 0.5s;
}
</style>