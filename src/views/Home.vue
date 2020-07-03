<template>
  <v-container fluid class="pa-0">
    <v-layout row wrap>
      <v-flex xs12>
        <v-container class='pa-0 py-4'>
          <Banner :windowHeight='400'>
          </Banner>
          <v-toolbar dark flat color="secondary px-5" height='70' v-if="linksMenu.length > 0">
            <v-toolbar-items>
              <v-menu offset-y v-for="(menu, index) in linksMenu" :key="index">
                <v-btn slot="activator" dark flat class='subheading font-weight-bold'>
                  {{ menu.title }} &nbsp; <v-icon size="16">fa fa-caret-down</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile v-for="(link, index) in menu.links" :key="index" :to="`/newstopic/${link.idBlog}`" @click="">
                    <v-list-tile-title> {{ link.tituloBlog }} </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-toolbar-items>
          </v-toolbar>
        </v-container>
      </v-flex>
      <v-flex xs12>
        <Services></Services>
      </v-flex>
      <v-flex xs12>
        <v-parallax :src="imgParallax2" :height="parallaxHeight">
          <v-container>
            <v-layout row wrap class="text-xs-center">
              <v-flex xs12 class="pl-5">
                <h1 class="display-3 font-weight-bold mt-0 pt-2 mb-3">{{ english ? "Confidence, Security and Growth" : 'Confianza, Seguridad y Desarrollo'}}</h1>
                <h4 class="title mb-4">{{ english ? "Learn more about the cooperative, and discover what our values ​​are" : 'Conoce más sobre la cooperativa, y descubre cuales son nuestros valores'}}</h4>
                <v-btn large to="/about" color="secondary" class='font-weight-bold'>
                  {{ english ? "Go to Calculators" : 'Ver Más'}}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-parallax>
      </v-flex>
      <v-flex xs12>
        <Gallery></Gallery>
      </v-flex>
      <v-flex xs12>
        <v-parallax height="300" :src="imgParallax" class="">
          <v-container>
            <v-layout row wrap class="text-xs-center">
              <v-flex xs12 class="pl-5">
                <h1 class="display-2 font-weight-bold mt-5 pt-4 mb-3">{{ english ? "Savings and Credit's Calculator" : 'Calculadora de Ahorro y Crédito'}}</h1>
                <h4 class="title mb-4">{{ english ? "Use our simulators to calculate your savings and credit application" : 'Utiliza nuestros simuladores para calcular tu solicitud de ahorro y crédito'}}</h4>
                <v-btn large to="/calculator" color="secondary" class='font-weight-bold'>
                  {{ english ? "Go to Calculators" : 'Ver Calculadoras'}}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-parallax>
      </v-flex>
      <v-flex xs12>
        <Suggestions></Suggestions>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import Banner from "../components/Banner.vue";
import Gallery from "../components/Gallery.vue";
import Services from "../components/Services.vue";
import Suggestions from "../components/Suggestions.vue";
import Parallax from "../assets/parallax3.jpg";
import Parallax2 from "../assets/parallax2.jpg";
import Settings from "@/data/Settings.js";
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      imgParallax: Parallax,
      imgParallax2: Parallax2,
      url: `${Settings.serverDomain}/cViews.php`,
      linksMenu: [],
      linksMenuItem: [],
      english: sessionStorage.english === "true"
    };
  },
  created() {
    this.getLinkedNews();
  },
  components: {
    Banner,
    Gallery,
    Services,
    Suggestions
  },
  methods: {
    getLinkedNews() {
      let data = new FormData();
      data.append("type", "13");
      axios({
        method: "post",
        url: this.url,
        data: data
      }).then(res => {
        this.linksMenu = [];
        let newsLinks = res.data.filter((data, index, self) => {
          return (
            index ===
            self.findIndex(t => t.descripcionEnlace === data.descripcionEnlace)
          );
        });
        newsLinks.forEach(newsLink => {
          let filteredLinks = res.data.filter(data => {
            return data.descripcionEnlace === newsLink.descripcionEnlace;
          });
          this.linksMenu.unshift({
            title: newsLink.descripcionEnlace,
            links: filteredLinks
          });
        });
      });
    }
  },
  computed: {
    parallaxHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "auto";
        case "sm":
          return "auto";
        case "md":
          return "350";
        case "lg":
          return "250";
        case "xl":
          return "250";
      }
    }
  }
};
</script>



<style>
.credit-icon {
  width: 150px;
  height: 150px;
  padding-top: 40px;
  border-radius: 50%;
}

.estilo {
  background: rgba(0, 160, 209, 1);
  background: -moz-linear-gradient(
    left,
    rgba(0, 160, 209, 1) 0%,
    rgba(0, 160, 209, 1) 3%,
    rgba(118, 191, 214, 1) 52%,
    rgba(0, 160, 209, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(0, 160, 209, 1)),
    color-stop(3%, rgba(0, 160, 209, 1)),
    color-stop(52%, rgba(118, 191, 214, 1)),
    color-stop(100%, rgba(0, 160, 209, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(0, 160, 209, 1) 0%,
    rgba(0, 160, 209, 1) 3%,
    rgba(118, 191, 214, 1) 52%,
    rgba(0, 160, 209, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(0, 160, 209, 1) 0%,
    rgba(0, 160, 209, 1) 3%,
    rgba(118, 191, 214, 1) 52%,
    rgba(0, 160, 209, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(0, 160, 209, 1) 0%,
    rgba(0, 160, 209, 1) 3%,
    rgba(118, 191, 214, 1) 52%,
    rgba(0, 160, 209, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(0, 160, 209, 1) 0%,
    rgba(0, 160, 209, 1) 3%,
    rgba(118, 191, 214, 1) 52%,
    rgba(0, 160, 209, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a0d1', endColorstr='#00a0d1', GradientType=1 );
}
.estilo2 {
  background: rgba(198, 210, 72, 1);
  background: -moz-linear-gradient(
    left,
    rgba(198, 210, 72, 1) 0%,
    rgba(202, 209, 121, 1) 52%,
    rgba(198, 210, 72, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(198, 210, 72, 1)),
    color-stop(52%, rgba(202, 209, 121, 1)),
    color-stop(100%, rgba(198, 210, 72, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(198, 210, 72, 1) 0%,
    rgba(202, 209, 121, 1) 52%,
    rgba(198, 210, 72, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(198, 210, 72, 1) 0%,
    rgba(202, 209, 121, 1) 52%,
    rgba(198, 210, 72, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(198, 210, 72, 1) 0%,
    rgba(202, 209, 121, 1) 52%,
    rgba(198, 210, 72, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(198, 210, 72, 1) 0%,
    rgba(202, 209, 121, 1) 52%,
    rgba(198, 210, 72, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c6d248', endColorstr='#c6d248', GradientType=1 );
}
</style>
