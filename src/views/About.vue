<template>
  <v-container fluid class='pa-0'>
    <v-layout row wrap>
      <PageHeader :title=" english ? 'About Us' : 'Nosotros' " id='about-header'>
      </PageHeader>
      <v-container class='py-0 px-0' tag='section'>
        <v-layout column>
          <v-carousel class='py-3 about' style='box-shadow: none; height:auto' flat hide-delimiters dark :cycle="false">
            <v-carousel-item class='pt-1'>
              <v-layout row wrap>
                <v-flex class="text-xs-center mb-1" xs12>
                  <img class="about-image" :src="`${imgDomain}/About/mision.jpg`" alt="Mision">
                </v-flex>
                <v-flex xs12>
                  <v-layout column>
                    <v-card class="about-description title text-xs-center pa-4">
                      {{ english ? 'Contribute to the development of partners to boost the local economy with quality and sustainable financial services.' : 'Aportar al desarrollo de los socios para dinamizar la economía local con servicios financieros de calidad y sostenibles.'}}
                    </v-card>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-carousel-item>
            <v-carousel-item class='pt-1'>
              <v-layout row wrap>
                <v-flex class="text-xs-center mb-1" xs12>
                  <img class="about-image" :src="`${imgDomain}/About/vision.jpg`" alt="Vision">
                </v-flex>
                <v-flex xs12>
                  <v-layout column>
                    <v-card class="about-description title text-xs-center pa-4">
                      {{ english ? "Improve the cooperative's competitive position in order to be among the first cooperatives in azuay." : 'Mejorar la posición competitiva de la cooperativa de manera de ubicarse entre las primeras cooperativas en azuay.'}}
                    </v-card>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-carousel-item>
            <v-carousel-item class='pt-1'>
              <v-layout row wrap>
                <v-flex class="text-xs-center mb-1" xs12>
                  <img class="about-image" :src="`${imgDomain}/About/reseHisto.jpg`" alt="Reseña Histórica">
                </v-flex>
                <v-flex xs12>
                  <v-layout column>
                    <v-card class="about-description title pa-4">
                      <p class="py-2">{{ english ? 'The Savings and Credit Cooperative "Señor de Girón", is a financial institution, regulated by the Superintendence of Popular and Solidarity Economy; founded on November 13, 2002, with 52 people who decide to conform, as a response to the need for financial services in the area, including sectors that have traditionally been excluded from savings and credit. It has legal recognition through Ministerial Agreement 013, granted by the Sub Directorate of Cooperatives of the Austro Ministry of Social Welfare.' : 'La Cooperativa de Ahorro y Crédito "Señor de Girón", es una institución financiera, regulada por la Superintendencia de Economía Popular y Solidaria; fundada el 13 noviembre de 2002, con 52 personas que deciden conformarla, como una respuesta a la necesidad de servicios financieros en la zona, incluyendo a los sectores que tradicionalmente han estado excluidos del ahorro y el crédito. Cuenta con reconocimiento jurídico mediante Acuerdo Ministerial 013, otorgado por la Sub Dirección de Cooperativas del Ministerio de Bienestar Social del Austro.'}}</p>
                      <p class="py-2">{{ english ? 'The institution strengthened its activities in Girón, province of Azuay, supporting its associates in the different micro-productive and development activities, existing a universe of possibilities for entrepreneurship in this temperate climate town, which has as main axes of its economy, agriculture, livestock, tourism, commerce and services. After a time, strengthened and strengthened in the mind of the community, it undertakes new challenges, deciding to extend its coverage to other geographical areas, thus, in 2004 it broadens its horizons reaching the San Fernando Canton, in 2005 it is located in Cuenca, in 2011 in Paute and finally he got closer to his people with Agencies in La Asunción and San Gerardo in October 2011.' : 'La institución potenció sus actividades en Girón, provincia de Azuay, apoyando a sus asociados en las diferentes actividades micro productivas y de desarrollo, existiendo un universo de posibilidades para el emprendimiento en esta localidad de clima templado, que tiene como ejes principales de su economía, la agricultura, ganadería, turismo, comercio y servicios. Transcurrido un tiempo, fortalecida y afianzada en la mente de la comunidad, emprende nuevos retos, decidiendo extender su cobertura a otras áreas geográficas, así, en el año 2004 amplía sus horizontes llegando al Cantón San Fernando, en el 2005 se ubica en Cuenca, en el 2011 en Paute y por último se acercó más a su gente con Agencias en La Asunción y San Gerardo en octubre de 2011.'}}</p>
                      <p class="py-2">{{ english ? 'Thanks to the trust of its more than ten thousand members, it has been possible to contribute to the individual and collective development of those who live in the areas of influence.' : 'Gracias a la confianza de sus más de diez mil socios, se ha podido contribuir al desarrollo tanto individual como colectivo de quienes habitan en las zonas de influencia.'}}</p>
                    </v-card>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-carousel-item>
            <v-carousel-item class='pt-1'>
              <v-layout row wrap>
                <v-flex class="text-xs-center mb-1" xs12>
                  <img class="about-image" :src="`${imgDomain}/About/valores.jpg`" alt="Nuestros Valores">
                </v-flex>
                <v-flex xs12>
                  <v-card class="px-4 py-4">
                  <v-layout row wrap>
                    <v-flex xs12 class="mb-2">
                        <v-btn fab color="secondary"><v-icon color="white">fa fa-balance-scale</v-icon></v-btn>&nbsp;
                        <span class="title">{{ english ? 'Honesty:' : 'Honestidad:'}}</span> &nbsp;
                        <span class="">{{ english ? 'Promote ethical values ​​permanently.' : 'Promover valores éticos permanentemente.'}}</span>
                    </v-flex>
                    <v-flex xs12 class="mb-2">
                        <v-btn fab color="secondary"><v-icon color="white">fa fa-hands</v-icon></v-btn>&nbsp;
                        <span class="title">{{ english ? 'Transparency:' : 'Transparencia:'}}</span> &nbsp;
                        <span>{{ english ? 'Report at all times internally and externally all products and results obtained by the entity.' : 'Informar en todo momento a nivel interno y externo todos los productos y resultados obtenidos por la entidad.'}}</span>
                    </v-flex>
                    <v-flex xs12 class="mb-2">
                        <v-btn fab color="secondary"><v-icon color="white">fa fa-hands-helping</v-icon></v-btn>&nbsp;
                        <span class="title">{{ english ? 'Cooperation:' : 'Cooperación:'}}</span> &nbsp;
                        <span>{{ english ? 'Promote solidarity among the partners and among the actors of the popular and solidarity financial sector.' : 'Promover la solidaridad entre los socios y entre los actores del sector financiero popular y solidario.'}}</span>
                    </v-flex>
                    <v-flex xs12 class="mb-2">
                        <v-btn fab color="secondary"><v-icon color="white">fa fa-clock</v-icon></v-btn>&nbsp;
                        <span class="title">{{ english ? 'Perseverance:' : 'Perseverancia:'}}</span> &nbsp;
                        <span>{{ english ? 'Be persistent in generating and obtaining the results presented.' : 'Ser perseverantes en la generación y obtención de los resultados planteados.'}}</span>
                    </v-flex>
                  </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-carousel-item>
            <v-carousel-item class='pt-1'>
              <v-layout row wrap>
                <v-flex class="text-xs-center mb-1" xs12>
                  <img class="about-image" :src="`${imgDomain}/About/organigrama.jpg`" alt="Mision">
                </v-flex>
              </v-layout>
            </v-carousel-item>
          </v-carousel>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
import Settings from "@/data/Settings.js";

export default {
  name: "services",
  data() {
    return {
      english: sessionStorage.english === 'true',
      imgDomain: Settings.resourcesDomain,
    };
  },
  components: {
    PageHeader
  }
};
</script>

<style>
.about .v-carousel__next {
    bottom: unset;
    top: 280px !important;
    color: var(--color-secondary) !important;
}
.about .v-carousel__next i {
    color: var(--color-secondary) !important;
}
.about .v-carousel__prev {
    bottom: unset;
    top: 280px !important;
    left:unset;
    color: var(--color-secondary) !important;
}
.about .v-carousel__prev i {
    color: var(--color-secondary) !important;
}
.about-header {
  text-align: center;
}
.about-image {
  width: 100%;
  /* height: 400px; */
  object-fit: contain;
}
.about-title {
  font-size: 26px;
  font-weight: 400;
  width: 100%;
  text-align: center;
  color: #000 !important;
}
.about-description {
  font-size: 16px;
  font-weight: 400;
  text-align: justify;
  width: 100%;
}
</style>