<template>
  <v-container class='px-0'>
    <v-layout row wrap>
      <v-flex xs12 md3 class="pr-4">
        <v-list three-line>
          <v-subheader class="py-3 px-4 font-weight-bold title sidebar-title white--text">
            {{ english ? 'Branch Offices' : 'Sucursales'}}
          </v-subheader>
          <v-divider></v-divider>
          <v-list-tile v-for='(map,index) in maps' :key='index' avatar class="mt-2" @click="changeMarker(index)">
            <v-list-tile-content>
              <v-list-tile-title> {{ map.titulo }} </v-list-tile-title>
              <v-list-tile-sub-title>{{ english ? 'Address:' : 'Dirección:'}} {{ map.direccion }} <br> {{ english ? 'Phone:' : 'Teléfono:'}} {{ map.numeroContacto }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <v-icon color="primary">fas fa-map-marker-alt</v-icon>
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex style="min-height: 500px" xs12 md9>
        <l-map v-if='maps.length > 0' ref="map" :zoom="zoom" :center="center">
          <l-tile-layer :url="layerUrl"></l-tile-layer>
          <l-marker :lat-lng="marker" :icon="icon"></l-marker>
        </l-map>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue2Leaflet from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import MarkeIcon from "../assets/marker-icon.png";
import MarketShadow from "../assets/marker-shadow.png";
import axios from "axios";
import Settings from "@/data/Settings.js";

var { LMap, LTileLayer, LMarker } = Vue2Leaflet;
var greenIcon = L.icon({
  iconUrl: MarkeIcon,
  shadowUrl: MarketShadow
});
export default {
  name: "agenciesmaps",
  components: { LMap, LTileLayer, LMarker },
  data() {
    return {
      english: sessionStorage.english === "true",
      zoom: 30,
      center: "",
      layerUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: "",
      markerStatus: 0,
      icon: greenIcon,
      url: `${Settings.serverDomain}/cViews.php`,
      imgDomain: Settings.resourcesDomain,
      maps: []
    };
  },
  created() {
    this.getMaps();
  },
  methods: {
    getMaps() {
      let data = new FormData();
      data.append("type", "9");
      axios({
        method: "post",
        url: this.url,
        data: data
      }).then(res => {
        this.maps = res.data;
        this.marker = L.latLng(this.maps[0].latitud, this.maps[0].longitud);
        this.center = L.latLng(this.maps[0].latitud, this.maps[0].longitud);
      });
    },
    changeMarker(index) {
      this.marker = L.latLng(
        this.maps[index].latitud,
        this.maps[index].longitud
      );
      this.center = L.latLng(
        this.maps[index].latitud,
        this.maps[index].longitud
      );
    }
  }
};
</script>

<style>
</style>