<template>
	<v-container class="pt-0">
		<v-layout row wrap>

			<!-- *************** CATEGORIES Header *************** -->
			<v-flex xs12>
				<v-card >
					<v-toolbar flat height="50px" class="mb-1" dark color="primary">
						<v-layout row wrap fill-height>
							<v-flex d-flex align-center justify-center class="text-xs-center" xs12 md6>
								<h5 class="subheading font-weight-black">{{ english ? 'Category' : 'Categoría'}}</h5>
							</v-flex>
							<v-flex d-flex align-center justify-center class="text-xs-center" xs12 md6>
								<h5 class="subheading font-weight-black">{{ english ? 'Topics' :  'Temas'}}</h5>
							</v-flex>
							<!-- <v-flex d-flex align-center justify-center class="text-xs-center" xs12 md2>
								<h5 class="subheading font-weight-black">{{ english ? 'Replies' : 'Respuestas'}}</h5>	
							</v-flex>
							<v-flex d-flex align-center justify-center class="text-xs-center" xs12 md2>
								<h5 class="subheading font-weight-black">Last Post</h5>		
							</v-flex> -->
						</v-layout>
					</v-toolbar>
					<v-layout row wrap>
						<v-list class="pa-0" three-line style="width: 100%">
							<v-list-tile 
							@click="" 
							v-for="(category,index) in forumCategories"
							:key="index"
							avatar
							v-show="(currentPage - 1) * maxItemPerPage <= index  && currentPage * maxItemPerPage > index"
							:to="`/forum/topics/${category.id}`"
							>
							<v-layout row wrap>
								<v-flex d-flex align-center justify-center class="text-xs-left" xs12 md6>
									<v-list-tile-avatar size="60px" class="pt-3 pl-2 title" style="max-width: 80px">
										<h3 class="category-icon">{{ category.titulo.slice(0,3).toUpperCase() }}</h3>
									</v-list-tile-avatar>
									<v-list-tile-content class="pl-4">
										<v-list-tile-title class="title">
											{{ category.titulo }}
										</v-list-tile-title>
										<v-list-tile-sub-title>{{ category.descripcion }}</v-list-tile-sub-title>
									</v-list-tile-content>
								</v-flex>
								<v-flex d-flex align-center justify-center class="text-xs-center" xs12 md6>
									<h5 class="subheading">{{ category.totalEntradas }}</h5>
								</v-flex>
								<!-- <v-flex d-flex align-center justify-center class="text-xs-center" xs12 md2>
									<h5 class="subheading">4322</h5>	
								</v-flex>
								<v-flex d-flex align-center justify-center class="text-xs-center" xs12 md2>
									<h5 class="subheading">Last Post</h5>		
								</v-flex> -->
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
		<!-- *************** CATEGORIES Header *************** -->

	</v-layout>
</v-container>
</template>
<script>
	import Settings from "@/data/Settings.js";
	import axios from "axios";
	export default {
		name: 'forumCategories',
		data(){
			return {
		  	url: `${Settings.serverDomain}/cCategoryForo.php`,
				english: sessionStorage.english === 'true',
				forumCategories: [],
				headers: [
				{ text: "Categoría", align: "center", sortable: true, value: "categoria" },
				{ text: "Topics", align: "center", sortable: true, value: "topics" },
				{ text: "Respuestas", align: "center", sortable: true, value: "replies" },
				{ text: "Otra Cosa", align: "center"},
				],
				maxItemPerPage: 6,
				numberOfPages: 1,
				currentPage: 1,
			}
		},
		created(){
			this.getForumCategories();
		},
		methods: {
			getForumCategories(){
				let data = new FormData();
				data.append('type', '5');
				axios({ method: 'post', url: this.url, data })
				.then( res => {
					this.forumCategories = res.data;
				} )
				.catch( err => console.log(err) )
			},
		},
	}
</script>
<style>

</style>