<template>
  <v-layout class='pa-0' row wrap>
    <PageHeader :title="english ? 'News' : 'Noticias'">
    </PageHeader>
    <v-flex xs12 class='news-container'>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 md3 :class='dynamicMargin'>
            <v-container class='pa-0'>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card class='service-list'>
                    <h3 class="py-2 px-4 sidebar-title subheading white--text font-weight-black"> {{ english ? 'Categories' : 'Categorías'}} </h3>
                    <v-list class="py-0">
                      <v-list-tile 
                      v-for="(category, index) in categories" 
                      class='service-item' 
                      :class="{ active: category.overlay === '1' }" 
                      :key='index' 
                      @click="selectCategory(index,category.id)"
                      v-if="category.cantNoticias !== '0'"
                      >
                        <v-list-tile-content class='service-title pl-3'>
                          <v-list-tile-title class="subheading">
                            {{  category.descripcion  }}
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex xs12 md9 class='news-list pa-0'>
            <v-layout column nowrap>
                <v-flex xs12
                v-for="(news, index) in filterNews" :key='index' 
                >
                  <v-card class="black--text mb-3" 
                    v-if="(currentPage - 1) * maxItemPerPage <= index  && currentPage * maxItemPerPage > index"
                    :key="index"
                  >
                    <v-layout>
                      <v-flex xs4>
                        <v-card-media :src="`${imgDomain}/Blog/${news.imagen}`" height="160px" cover></v-card-media>
                      </v-flex>
                      <v-flex xs8>
                        <v-card-title primary-title class='pb-0'>
                          <div>
                            <div class="headline">{{ news.titulo }}</div>
                            <div class="mb-4 subheading">{{ news.autor }}</div>
                          </div>
                        </v-card-title>
                        <v-card-actions class="pl-3 subheading">
                          {{ news.fecha }} 
                          <v-spacer></v-spacer>
                          <v-btn :to="`/newstopic/${news.id}`" color="secondary" class='font-weight-bold'>{{english ? 'Read More' : 'Leer Más'}}</v-btn>
                        </v-card-actions>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              
            </v-layout>
            <v-layout row wrap align-center>
              <v-flex xs12>
                <v-pagination v-model="currentPage" :length="numberOfPages" v-show="numberOfPages > 0"></v-pagination>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import Settings from "@/data/Settings.js";
import axios from "axios";
export default {
  name: "news",
  data() {
    return {
      categories: [],
      news: [],
      selectedCategory: '',
      english: sessionStorage.english === 'true',
      url: `${Settings.serverDomain}/cViews.php`,
      imgDomain: Settings.resourcesDomain,
      maxItemPerPage: 5,
      numberOfPages: 1,
      currentPage: 1,
      categorySelected: '',
    };
  },
  created() {
    this.getNewsInfo();
    this.getCategories();
  },
  components: {
    PageHeader,
  },
  methods: {
    getNewsInfo() {
      let data = new FormData();
      data.append("type", "5");
      axios({
        method: "post",
        url: this.url,
        data: data
      })
        .then(res => {
          this.news = res.data;
          this.numberOfPages = Math.round(this.filterNews.length / this.maxItemPerPage);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategories() {
      let data = new FormData();
      data.append("type", "7");
      axios({
        method: "post",
        url: this.url,
        data: data
      })
        .then( res => {
          this.categories = res.data;
          let index = this.categories.findIndex( k => {
            return k.cantNoticias !== '0';
          })
          this.selectedCategory = this.categories[index].id;
        } )
        .catch(err => console.log(err));
    },
    selectCategory: function(index, selectedCategory) {
      this.selectedCategory = selectedCategory
      this.categories.forEach(function(category, key) {
        category.overlay = "0";
      });
      this.categories[index].overlay = "1";
      this.numberOfPages = Math.round(this.filterNews.length / this.maxItemPerPage);
    },
  },
  computed: {
    dynamicMargin() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "pr-0 mb-4";
        case "sm":
          return "pr-0 mb-4";
        case "md":
          return "pr-4 mb-0";
        case "lg":
          return "pr-4 mb-0";
        case "xl":
          return "pr-4 mb-0";
      }
    },
    filterNews(){
      let filteredNews = this.news.filter( (news) => {
        if(news.categoriaId === this.selectedCategory){
          return true;
        } else {
          return false;
        }
      });
      return filteredNews;
    }
  }
};
</script>

<style>
.news-header {
  background-color: var(--color-primary);
  background-size: cover;
  height: 250px;
  flex-basis: auto;
}

.news-sidebar {
  height: 800px;
  border: 1px lightgrey solid;
}

.news-content {
  text-align: justify;
}
</style>