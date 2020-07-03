<template>
	<v-container class="pt-0">
		<v-layout row wrap>

			<!-- *************** TOPICS HEADER *************** -->
			<v-flex xs12>
				<v-card>
					<v-list style="width: 100%" three-line>
						<v-list-tile>
							<v-layout row wrap>
								<v-flex d-flex align-center justify-center class="text-xs-left" xs12 md6>
									<v-list-tile-avatar size="60px" class="pt-3 pl-2 title" style="max-width: 80px">
										<h3 class="category-icon">{{ forumCategory.slice(0,3).toUpperCase() }}</h3>
									</v-list-tile-avatar>
									<v-list-tile-content class="pl-4">
										<v-list-tile-title style="height: auto" class="display-1">
											{{ forumCategory }}
										</v-list-tile-title>
									</v-list-tile-content>
								</v-flex>
							</v-layout>
						</v-list-tile>
					</v-list>
					<v-toolbar flat height="50px" class="" dark color="primary">
						<v-layout row wrap fill-height>
							<v-flex d-flex align-center justify-center class="text-xs-center" xs12 md6>
								<h5 class="subheading font-weight-black">{{ english ? 'Topics' : 'Temas'}}</h5>
							</v-flex>
							<v-flex d-flex align-center justify-center class="text-xs-center" xs12 md6>
								<h5 class="subheading font-weight-black">{{ english ? 'Replies' : 'Respuestas'}}</h5>
							</v-flex>
						</v-layout>
					</v-toolbar>
					<v-layout row wrap>
						<v-list class="pa-0" three-line style="width: 100%">
							<v-list-tile @click="" v-for="(topic,index) in forumTopics" :key="index" avatar :to="`/forum/topicsreplies/${topic.id}`"
							v-show="(currentPage - 1) * maxItemPerPage <= index  && currentPage * maxItemPerPage > index"
							>
								<v-layout row wrap>
									<v-flex d-flex align-center justify-center class="text-xs-left" xs12 md6>
										<v-list-tile-avatar size="60px" class="pt-3 pl-2 title" style="max-width: 80px">
											<h3 class="category-icon">{{ topic.titulo.slice(0,3).toUpperCase() }}</h3>
										</v-list-tile-avatar>
										<v-list-tile-content class="pl-4">
											<v-list-tile-title class="title">
												{{topic.titulo}}
											</v-list-tile-title>
											<v-list-tile-sub-title>
												{{ topic.creador }}
												<v-spacer></v-spacer>
												{{ topic.fInicial }}
											</v-list-tile-sub-title>
										</v-list-tile-content>
									</v-flex>
									<v-flex d-flex align-center justify-center class="text-xs-center" xs12 md6>
										<h5 class="subheading">{{ topic.totalRespuestas }}</h5>
									</v-flex>
								</v-layout>
							</v-list-tile>
						</v-list>
					</v-layout>
					<v-layout row wrap align-center>
					<v-flex xs12 class="text-xs-center py-2" style="background-color: var(--color-secondary)" v-show="numberOfPages > 1"> 
							<v-pagination v-model="currentPage" :length="numberOfPages" ></v-pagination>
					</v-flex>
				</v-layout>
				</v-card>
			</v-flex>
			<!-- *************** TOPICS HEADER *************** -->

		</v-layout>
	</v-container>
</template>
<script>
import Settings from "@/data/Settings.js";
import axios from "axios";
export default {
  name: "forumTopics",
  data() {
    return {
      url: `${Settings.serverDomain}/cPost.php`,
      english: sessionStorage.english === "true",
      forumTopics: [],
			forumCategory: "",
			maxItemPerPage: 6,
			numberOfPages: 1,
			currentPage: 1,
    };
  },
  created() {
    this.getForumTopics();
  },
  methods: {
    getForumTopics() {
      let data = new FormData();
      data.append("type", "7");
      data.append("categoriaId", this.$route.params.id);
      axios({ method: "post", url: this.url, data })
        .then(res => {
          this.forumTopics = res.data;
          this.forumCategory = this.forumTopics[0].tituloCategoria;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
<style>
.category-icon {
  border: 4px var(--color-secondary) solid;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  padding-top: 16px;
}
</style>