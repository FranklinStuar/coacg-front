<template>
  <v-container class='gallery pa-0 py-4' grid-list-xl tag='section'>
    <v-dialog hide-overlay fullscreen v-model="lightboxVisible" :overlay="true" transition="dialog-transition" width="70%">
      <v-card style="background-color: rgba(0,0,0,0.6); height: 100%" flat class="pa-4" dark>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="lightboxVisible = false" flat>
            <v-icon color="secondary">fa fa-times</v-icon>
          </v-btn>
        </v-card-actions>
        <v-layout row wrap justify-center align-center @click="lightboxVisible = false" style="height: 85%">
          <img class="lightbox-img" :src="`${imgDomain}/Album/${lightboxImg}`" alt="">
        </v-layout>
        <v-btn fab color="secondary" style="position: absolute; top: 42%; left: 6%" @click="prevImage">
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn fab color="secondary" style="position: absolute; top: 42%; right: 6%" @click="nextImage">
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
    <v-layout row wrap justify-space-around class="pb-3">

      <v-flex xs12>
        <h1 class="gallery-header display-2 py-4 font-weight-light">
          {{ english ? 'Photo Gallery' :'Galería de Fotos'}}
        </h1>
      </v-flex>

      <v-flex xs12 md3 class='pa-0'>
        <v-list>
          <h3 class="py-3 px-4 font-weight-bold title sidebar-title white--text">{{ english ? 'Albums' : 'Álbumes' }}</h3>
          <v-divider></v-divider>
          <v-flex xs12 class="gallery-sidebar-container">
            <v-list-tile @click="" avatar v-for="(album, index) in albums" :key="index" class="pt-2 agency-item">
              <v-list-tile-avatar>
                <img :src="`${imgDomain}/Album/${album.imagen}`" :alt="album.imagen">
              </v-list-tile-avatar>
              <v-list-tile-content @click="changeQuantyOfPage(album.id)">
                <v-list-tile-title>{{ album.descripcion }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-flex>
        </v-list>
      </v-flex>

      <v-flex xs12 md8 class='pa-0 pl-4 pt-2'>
        <v-layout row wrap grid-list-lg class='pa-0'>
          <v-flex v-for="(photo, index) in GalleryData" :key='index' v-show="(currentPage - 1) * maxItemPerPage <= index  && currentPage * maxItemPerPage > index" xs12 md4>
            <v-card flat class='gallery-item' @mouseover='overlayShows(index)' @mouseout='overlayHide(index)'>
              <transition name='photo-overlay-fade'>
                <div v-show="photo.overlay === '1'" class="photo-overlay">
                </div>
              </transition>
              <transition name='photo-actions-slide'>
                <v-card-title v-show="photo.overlay === '1'" class="photo-actions pa-0">
                  <v-layout column d-flex justify-center align-center xs12>
                    <v-btn class='photo-details' flat color="white" @click="openLightbox(index)">
                      <v-icon size='52px'>
                        fa fa-eye
                      </v-icon>
                    </v-btn>
                  </v-layout>
                </v-card-title>
              </transition>
              <v-card-media :src="`${imgDomain}/Album/${photo.imagen}`" height="200px">
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center>
          <v-flex xs12 class="text-xs-center">
            <v-pagination v-model="currentPage" :length="numberOfPages" v-show="numberOfPages > 0"></v-pagination>
          </v-flex>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import Settings from "@/data/Settings.js";
import axios from "axios";
export default {
  name: "gallery",
  data() {
    return {
      english: sessionStorage.english === "true",
      GalleryData: [],
      albums: [],
      selectedAlbum: "",
      maxItemPerPage: 6,
      numberOfPages: 1,
      currentPage: 1,
      lightboxVisible: false,
      lightboxImg: "",
      url: `${Settings.serverDomain}/cViews.php`,
      imgDomain: Settings.resourcesDomain,
      currentImage: ""
    };
  },
  components: {},
  mounted() {
    this.updateAlbums();
  },
  computed: {},
  methods: {
    updateAlbums() {
      let data = new FormData();
      data.append("type", "1");
      axios({
        method: "post",
        url: this.url,
        data: data
      })
        .then(res => {
          this.albums = res.data;
        })
        .then(res => {
          let albumId = new FormData();
          albumId.append("type", "8");
          albumId.append("albumId", this.albums[0].id);
          axios({
            method: "post",
            url: this.url,
            data: albumId
          }).then(res => {
            this.GalleryData = res.data;
            this.numberOfPages = Math.round(
              this.GalleryData.length / this.maxItemPerPage
            );
          });
        });
    },
    changeQuantyOfPage(albumSelected) {
      let albumId = new FormData();
      albumId.append("type", "8");
      albumId.append("albumId", albumSelected);
      axios({ method: "post", url: this.url, data: albumId }).then(res => {
        this.GalleryData = res.data;
        this.numberOfPages = Math.round(
          this.GalleryData.length / this.maxItemPerPage
        );
        this.currentPage = 1;
      });
    },
    overlayShows(index) {
      this.GalleryData[index].overlay = "1";
    },
    overlayHide(index) {
      this.GalleryData[index].overlay = "0";
    },
    openLightbox(index) {
      this.currentImage = index;
      this.lightboxImg = this.GalleryData[this.currentImage].imagen;
      this.lightboxVisible = true;
    },
    nextImage() {
      this.lightboxImg = this.GalleryData[this.currentImage].imagen;
      if (this.currentImage < this.GalleryData.length) {
        this.currentImage = this.currentImage + 1;
        this.lightboxImg = this.GalleryData[this.currentImage].imagen;
      }
    },
    prevImage() {
      if (this.currentImage > 0) {
        this.currentImage = this.currentImage - 1;
        this.lightboxImg = this.GalleryData[this.currentImage].imagen;
      }
    },
    closeLightbox(imgSrc) {
      this.lightboxImg = "";
      this.lightboxVisible = false;
    }
  }
};
</script>

<style>
.v-dialog__content {
  z-index: 999999 !important;
}
.v-dialog__content {
  z-index: 99999 !important;
}
.gallery-header {
  text-align: center;
  color: #000;
}

.gallery-item {
  border: 1px var(--color-cloud) solid;
  transition: ease 0.7s;
}

.gallery-sidebar-container {
  max-height: 300px;
  overflow-y: scroll;
}

.lightbox-img {
  object-fit: contain;
  height: 500px;
}

.gallery-item:hover {
  -webkit-box-shadow: 2px 11px 26px -4px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 11px 26px -4px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 11px 26px -4px rgba(0, 0, 0, 0.75);
  transition: ease 0.7s;
}
.gallery-item-title {
  color: #000;
  font-size: 14px !important;
}

.photo-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #c6d248;
  opacity: 0.3;
  z-index: 500;
  border-radius: 10px;
}

.photo-actions {
  position: absolute;
  top: 40%;
  z-index: 1000;
  width: 100%;
  transition: ease 0.5s;
}

.photo-overlay-fade-enter,
.photo-overlay-fade-leave-to {
  opacity: 0;
}
.photo-overlay-fade-enter-to,
.photo-overlay-fade-leave {
  opacity: 0.3;
}
.photo-overlay-fade-enter-active,
.photo-overlay-fade-leave-active {
  transition: opacity, ease 0.5s;
}
/*  */
.photo-actions-slide-enter,
.photo-actions-slide-leave-to {
  top: 15%;
  opacity: 0;
}
.photo-actions-slide-enter-to,
.photo-actions-slide-leave {
  top: 50%;
  opacity: 1;
}
.photo-actions-slide-enter-active,
.photo-actions-slide-leave-active {
  transition: ease 0.5s;
}
</style>