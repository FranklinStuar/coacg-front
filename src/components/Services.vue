<template>
  <div class="services ">
    <v-container class='services px-0'>
      <v-layout column>
        <h1 class="services-header mb-1 display-2 font-weight-light">{{ english ? 'Our Services' : 'Los servicios que ofrecemos'}}</h1>
        <v-carousel 
        v-if="services.length > 0" 
        class='py-5' 
        style='box-shadow: none; height:auto'
        hide-delimiters 
        interval='6000' 
        light
        >
          <v-carousel-item 
          v-for="(service, index) in services" 
          :key='index' 
          contain
          >
            <v-card flat>
              <v-layout row wrap>
                <v-flex xs12>
                <img
                  class="service-image"
                  :src="`${imgDomain}/Services/${service.imagen}`"
                  :alt="service.imagen"
                >
                <h1 style="position:absolute; bottom: 4%; left: 2%;" class='display-2 white--text'>{{ service.titulo }}</h1>
                  <v-btn large to="/services" dark regular color="secondary" style="position:absolute; bottom: 5%; right: 2%;" class='font-weight-bold'>
                    {{ english ? 'See more' : 'Ver Más'}}
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Settings from "@/data/Settings.js";
export default {
  name: "services",
  data() {
    return {
      english: sessionStorage.english === 'true',
      services: [],
      url: `${Settings.serverDomain}/cViews.php`,
      imgDomain: Settings.resourcesDomain
    };
  },
  created() {
    this.updateServices();
  },
  methods: {
    updateServices() {
      let data = new FormData();
      data.append("type", "16");
      fetch(this.url, {
        method: "POST",
        body: data
      })
        .then(res => res.json())
        .then(data => {
          this.services = data;
        });
    }
  }
};
</script>

<style>

.services-header {
  text-align: center;
}
.service-image {
  max-width: 100%;
}
.service-title {
  font-size: 26px;
  font-weight: 400;
  width: 100%;
  text-align: center;
  color: #000 !important;
}
.service-description {
  font-size: 20px;
  font-weight: 300;
  text-align: justify;
}
</style>