<template>
    <v-container fluid class="px-0">
      <input type="hidden" id="focusElement"
      @keyup.left.prevent="prevImage"
      @keyup.right.prevent="nextImage" 
      >
    <v-dialog
    v-model="lightboxVisible"
    :overlay="true"
    transition="dialog-transition"
    width="70%"
    hide-overlay
    fullscreen
    >
      <v-card 
      ref="lightbox" 
      style="background-color: rgba(0,0,0,0.6); height: 100%" 
      flat 
      class="pa-0" 
      dark
      >    
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="lightboxVisible = false" flat>
              <v-icon color="secondary">fa fa-times</v-icon>
            </v-btn>
          </v-card-actions>
          <v-layout 
          @click="lightboxVisible = false" 
          row wrap 
          justify-center 
          align-center 
          style="height: 85%"
            
          >
            <img class="lightbox-img" :src="`${imgDomain}/Album/${lightboxImg}`" alt="">
          </v-layout>
            <v-btn ref="prevImage" fab flat style="position: absolute; top: 42%; left: 6%" @click="prevImage"
            >
              <v-icon color="secondary">chevron_left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn fab flat style="position: absolute; top: 42%; right:6%" @click="nextImage">
              <v-icon color="secondary">chevron_right</v-icon>
            </v-btn>
      </v-card>
    </v-dialog>
        <v-layout row wrap>
            <quill-editor ref="myQuillEditor" v-show="false"></quill-editor>
            <v-flex xs12 md10 offset-md1>
                <img class="topic-img" :src="`${imgDomain}/Blog/${news.imagen}`" alt="">
            </v-flex>
            <v-flex xs12 md8 offset-md2>
                <v-card flat class="pa-5">
                  <v-layout row wrap justify-center>
                  <h2 class="display-2 mb-5">{{news.titulo}}</h2>
                    <v-flex xs12 id="contentRenderer">
                    </v-flex>
                  </v-layout>
                </v-card>
            </v-flex>
          <v-flex xs12 md8 offset-md2 class="">
            <v-layout row wrap grid-list-xg class=''>
            <v-flex 
            v-for="(photo, index) in galleryData" 
            :key='index' 
            v-show="(currentPage - 1) * maxItemPerPage <= index  && currentPage * maxItemPerPage > index" 
            xs12 md4
            >
              <v-card flat class='gallery-item' @mouseover='overlayShows(index)' @mouseout='overlayHide(index)'>
                <transition name='photo-overlay-fade'>
                  <div v-show="photo.overlay === '1'" class="photo-overlay">
                  </div>
                </transition>
                <transition name='photo-actions-slide'>
                  <v-card-title v-show="photo.overlay === '1'" class="photo-actions pa-0">
                    <v-layout column d-flex justify-center align-center xs12>
                      <v-btn class='photo-details' flat color="white" @click="openLightbox(index)">
                        <v-icon size='52px' >
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
        </v-flex>
        <v-flex xs12 md8 offset-md2>
          <v-layout row wrap align-center class="py-4">
            <v-flex xs12 class="text-xs-center">
              <v-pagination v-model="currentPage" :length="numberOfPages" v-show="numberOfPages > 0"></v-pagination>
            </v-flex>
          </v-layout>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import "@/assets/quill.snow.css";
import Settings from "@/data/Settings.js";
import axios from "axios";

export default {
  name: "newstopic",
  data() {
    return {
      news: [],
      url: `${Settings.serverDomain}/cViews.php`,
      imgDomain: Settings.resourcesDomain,
      galleryData: [],
      selectedAlbum: "",
      maxItemPerPage: 6,
      numberOfPages: 1,
      currentPage: 1,
      lightboxVisible: false,
      currentImage: '',
      lightboxImg: "",
    };
  },
  created() {
    this.getNewsById();
  },
  components: {
    PageHeader
  },
  methods: {
  getNewsById() {
      let data = new FormData();
      data.append("type", "6");
      data.append("id", this.$route.params.id);
      axios({
        method: "post",
        url: this.url,
        data: data
      })
        .then( res => {
          this.news = res.data;
          this.selectedAlbum = this.news.albumId;
          this.$refs.myQuillEditor.quill.setContents(JSON.parse(this.news.descripcion));
          document.getElementById("contentRenderer").innerHTML = this.$refs.myQuillEditor.quill.container.firstElementChild.innerHTML;
        } )
        .then( () => {
          this.getPhotosFromGallery();
        } )
        .catch(err => {
          console.log(err);
        });
    },
  getPhotosFromGallery(){
      let data = new FormData();
      data.append("type", "8");
      data.append("albumId", this.selectedAlbum);
      axios({
        method: "post",
        url: this.url,
        data
      })
      .then(res => {
        this.galleryData = res.data;
        this.numberOfPages = Math.round(this.galleryData.length / this.maxItemPerPage);
      })
      .catch(err => console.log(err));
    },
  changeQuantyOfPage(albumSelected) {
        let data = new FormData();
        data.append("type", "8");
        data.append("albumId", this.selectedAlbum);
        axios({ method: "post", url: this.url, data: data }).then(res => {
          this.galleryData = res.data;
          this.numberOfPages = Math.round(this.galleryData.length / this.maxItemPerPage);
          this.currentPage = 1;
        });
    },
  overlayShows(index) {
    this.galleryData[index].overlay = "1";
  },
  overlayHide(index) {
    this.galleryData[index].overlay = "0";
  },
  openLightbox(index) {
    this.currentImage = index;
    this.lightboxImg = this.galleryData[this.currentImage].imagen;
    this.lightboxVisible = true;
    document.getElementById('focusElement').focus()
  },
  nextImage(){
    this.lightboxImg = this.galleryData[this.currentImage].imagen;
    if (this.currentImage < this.galleryData.length ) {
      this.currentImage = this.currentImage + 1;
      this.lightboxImg = this.galleryData[this.currentImage].imagen;
    }
  },
  prevImage(){
    
    if (this.currentImage > 0) {
        this.currentImage = this.currentImage - 1;
        this.lightboxImg = this.galleryData[this.currentImage].imagen;
      }
    },
  closeLightbox(imgSrc) {
      this.lightboxImg = "";
      this.lightboxVisible = false;
    }
  },
};
</script>

<style>
.topic-img {
  height: 400px;
  object-fit: cover;
  width: 100%;
}
.title-line {
  width: 100%;
  height: 80px;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 320px;
  text-align: center;
  display: flex;
  justify-content: center;
}
.title-line span {
  color: #fff;
  font-size: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ql-align-justify img,
.ql-align-center img,
.ql-align-left img,
.ql-align-right img
{
  max-width: 100%;
}
</style>
