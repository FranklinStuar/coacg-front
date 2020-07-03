  <template>
  <v-flex xs12>
    <v-layout row wrap class="footer-body">
      <v-flex xs12 md4 style="border-right: 0.5px rgba(255,255,255,0.3) solid">
        <h2 class="footer-body-title pl-4 py-3">{{ english ? 'Links' : 'Enlaces'}}</h2>
        <v-card flat color="transparent" tile>
          <v-card-text class="py-0">
            <v-list flat style="background-color: transparent">
              <v-list-tile v-for="(link, index) in links" :key="index" class="menu-item py-0" :to="link.link">
                <a>
                  <v-icon size="14px">fa fa-angle-double-right</v-icon> &nbsp; {{ english ? link.titleEn : link.title }}
                </a>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>

      </v-flex>

      <v-flex xs12 md4 style="border-right: 0.5px rgba(255,255,255,0.3) solid">

        <h2 class="footer-body-title pl-4 py-3">{{ english ? 'Contancts' : 'Contactos'}}</h2>
        <v-card flat color="transparent">
          <v-card-text class="py-0">
            <v-list class='contacts'>
              <v-list-tile class='py-2'>
                <v-list-tile-action>
                  <v-icon color="green">phone</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>07 2276592 - 07 2275958</v-list-tile-title>
                  <v-list-tile-sub-title>{{ english ? 'Customer Support' : 'Atención al Cliente'}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile class='py-2'>
                <v-list-tile-action>
                  <v-icon color="indigo">mail</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>info@coacgiron.fin.ec </v-list-tile-title>
                  <v-list-tile-sub-title>{{ english ? 'Corporate Email' : 'Correo Corporativo'}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile class='py-2'>
                <v-list-tile-action>
                  <v-icon color="red">location_on</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>Calle Antonio Flor y Calderón</v-list-tile-title>
                  <v-list-tile-sub-title>{{ english ? 'Main Office Girón' : 'Matriz Girón'}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <Socials></Socials>
          </v-card-text>
        </v-card>

      </v-flex>

      <v-flex xs12 md4>

        <h2 class="footer-body-title pl-4 py-3">{{ english ? 'Jobs' : 'Empleo'}}</h2>
        <v-card flat color="transparent" class="pl-4" tile>
          <v-card-title primary-title>
            <v-icon size='45px'>far fa-address-card</v-icon>
          </v-card-title>
          <v-card-text class="py-2 font-weight-bold">
            {{ english ? 'If you want to work with us, leave us your resume and participate in our personnel selection process' : 'Si deseas trabajar con nosotros déjanos tu hoja de vida y participa en nuestro proceso de selección de personal.'}}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class='mt-2'>
            <v-btn class='font-weight-bold' to="/jobs" color="secondary">{{ english ? 'Work with us' : 'Trabaja con Nosotros'}}</v-btn>
          </v-card-actions>
        </v-card>

      </v-flex>

    </v-layout>
  </v-flex>
</template>

<script>
import FooterData from "@/data/FooterData.js";
import NavbarLinks from "@/data/NavbarLinks.js";
import Socials from "@/components/Footer/Socials.vue";
export default {
  name: "footerbody",
  data() {
    return {
      links: NavbarLinks,
      english: sessionStorage.english === "true"
    };
  },
  components: {
    Socials
  }
};
</script>

<style>
.footer-body-title {
  font-weight: 400;
}
.footer-body {
  min-height: 250px;
}
.footer-rights {
  height: 30px;
  color: #fff;
}
.menu {
  list-style: none;
}
.menu-item {
  height: 30px;
}
.menu-item a {
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 12pt;
  color: #fff;
  font-weight: 400;
  transition: ease 0.5s;
  height: 35px;
}
.menu-item a:hover {
  color: #c6d248;
  margin-left: 20px;
  transition: ease 0.5s;
}
.menu-item a:hover > i {
  color: #c6d248;
  transition: ease 0.5s;
}

.card-title {
  font-size: 16pt;
  color: #c6d248;
}
.point {
  padding: 0px;
  font-size: 24pt;
  margin-right: 10px;
}
.contacts {
  background-color: transparent !important;
}
</style>
