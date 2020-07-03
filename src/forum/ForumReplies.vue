<template>
	<v-container>
<!-- SNACKBAR -->
    <v-snackbar v-model="snackbar.show" :bottom="true" :multi-line="true" :right="true" :timeout="snackbar.timeout" :vertical="false" color='secondary'>
      {{ snackbar.text }}
      <v-btn color="black" flat @click="snackbar.show = false">
      	Cerrar
      </v-btn>
    </v-snackbar>
<!-- SNACKBAR -->
		<v-dialog v-model="replyModal" max-width="50%">
			<v-card>
				<v-card-title class="title">Respuesta</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout row wrap>
							<v-flex xs12>
								<v-textarea counter="250" :rules="replyRules" name="reply" label="Escribe tu respuesta aquí" v-model="reply"></v-textarea>
							</v-flex>
							<v-flex xs12>
								<v-btn color="success" flat @click="postTopicReplies">Aceptar</v-btn>
								<v-btn flat dark @click="closeTopicModal" color="red darken-4">Cancelar</v-btn>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-text>
			</v-card>
		</v-dialog>
		<v-layout row wrap fill-height>
			<!-- TOPIC DESCRIPTION  -->
			<v-flex class="mb-4" xs12>
				<quill-editor ref="myQuillEditor" v-show="false"></quill-editor>
				<v-card class="pa-4">
					<v-layout row wrap justify-center>
						<v-flex xs12 class="text-xs-center" id="contentRenderer">
						</v-flex>
					</v-layout>
				</v-card>
			</v-flex>
			<!-- TOPIC DESCRIPTION  -->
			<v-flex v-if="isUserLogged" class="mb-4" xs12 md2 offset-md10>
				<v-spacer></v-spacer>
				<v-btn @click="openTopicModal" color="secondary">
					<v-icon>fa fa-reply</v-icon> &nbsp; Responder
				</v-btn>
			</v-flex>
			<!-- TOPIC REPLIES -->
			<v-flex xs12>
				<v-card class="topic-reply mb-4" v-for="(reply,index) in topicReplies" :key="index"
					v-show="(currentPage - 1) * maxItemPerPage <= index  && currentPage * maxItemPerPage > index"
				>
					<v-layout row wrap fill-height>
						<v-flex xs12>
						</v-flex>
						<v-flex xs12 md2 class="px-4 py-2 text-xs-center" style="background-color: var(--color-primary)">
							<!-- AVATAR -->
							<img class="topic-replay-img" :src="avatars[reply.avatar - 1].imagen" :alt="avatars[reply.avatar - 1].titulo">
							<h3 class="white--text subheading font-weight-bold">{{ reply.nickName }}</h3>
							<!-- NAME -->
						</v-flex>
						<!-- DIVIDER -->
						<v-flex xs12 md10>
							<!-- <v-divider class="" inset vertical></v-divider> -->
							<!-- DATE -->
							<v-toolbar dark flat height="30px" color="secondary">
								<v-toolbar-items>
									<v-icon size="16px">fa fa-clock</v-icon>
								</v-toolbar-items>
								<v-toolbar-title class="subheading font-weight-bold">{{ reply.fecha }}</v-toolbar-title>
								<v-spacer></v-spacer>
								<v-toolbar-title class="subheading font-weight-bold text-uppercase">#{{ reply.id }}</v-toolbar-title>
							</v-toolbar>
							<!-- DESCRIPTION -->
							<p class="text-xs-justify pa-3">{{ reply.descripcion }}</p>
						</v-flex>
						<!-- ANYTHING ELSE -->
					</v-layout>
				</v-card>
			</v-flex>
			<!-- TOPIC REPLIES -->

		</v-layout>
		<v-layout row wrap align-center>
			<v-flex xs12 class="text-xs-center py-2" style="background-color: var(--color-secondary)" v-show="numberOfPages > 0"> 
					<v-pagination v-model="currentPage" :length="numberOfPages" ></v-pagination>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
import Settings from "@/data/Settings.js";
import axios from "axios";
import avatar1 from '../assets/avatars/avatar1.png';
import avatar2 from '../assets/avatars/avatar2.png';
import avatar3 from '../assets/avatars/avatar3.png';
import avatar4 from '../assets/avatars/avatar4.png';
import avatar5 from '../assets/avatars/avatar5.png';
import avatar6 from '../assets/avatars/avatar6.png';
import avatar7 from '../assets/avatars/avatar7.png';
import avatar8 from '../assets/avatars/avatar8.png';
import avatar9 from '../assets/avatars/avatar9.png';
import avatar10 from '../assets/avatars/avatar10.png';
import avatar11 from '../assets/avatars/avatar11.png';
import avatar12 from '../assets/avatars/avatar12.png';
export default {
  name: "forumReplies",
  data() {
    return {
		isUserLogged: sessionStorage.logged === 'true',
      	userIdToReply: sessionStorage.userID,
      	topicReplies: [],
      	topic: [],
      	reply: "",
      	replyRules: [
					v => !!v || "El campo es requerido",
          v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "El texto contiene un caracter invalido"
				],
      	replyModal: false,
		url: {
			topicReplies: `${Settings.serverDomain}/cAnswers.php`,
			topic: `${Settings.serverDomain}/cPost.php`,
		},
		snackbar: {
        	show: false,
        	timeout: 6000,
        	text: "Por defecto",
        	y: "bottom",
        	x: "left"
		},
		avatars: [
          	{ titulo: 'Avatar 1', id: '1', imagen: avatar1 },
          	{ titulo: 'Avatar 2', id: '2', imagen: avatar2 },
          	{ titulo: 'Avatar 3', id: '3', imagen: avatar3 },
          	{ titulo: 'Avatar 4', id: '4', imagen: avatar4 },
          	{ titulo: 'Avatar 5', id: '5', imagen: avatar5 },
          	{ titulo: 'Avatar 6', id: '6', imagen: avatar6 },
          	{ titulo: 'Avatar 7', id: '7', imagen: avatar7 },
          	{ titulo: 'Avatar 8', id: '8', imagen: avatar8 },
          	{ titulo: 'Avatar 9', id: '9', imagen: avatar9 },
          	{ titulo: 'Avatar 10', id: '10', imagen: avatar10 },
          	{ titulo: 'Avatar 11', id: '11', imagen: avatar11 },
          	{ titulo: 'Avatar 12', id: '12', imagen: avatar12 },
		],
		maxItemPerPage: 6,
		numberOfPages: 1,
		currentPage: 1,
    };
  },
  created() {
    this.getTopicReplies();
    this.getTopic();
  },
  methods: {
    getTopic() {
      	let data = new FormData();
		data.append("type", "8");
		data.append("id", this.$route.params.id);
      	axios({ method: "post", url: this.url.topic, data })
        .then(res => {
			this.topic = res.data;
			this.$refs.myQuillEditor.quill.setContents(JSON.parse(this.topic.descripcion));
            document.getElementById("contentRenderer").innerHTML = this.$refs.myQuillEditor.quill.container.firstElementChild.innerHTML;
        })
        .catch(err => console.log(err));
    },
    getTopicReplies() {
      let data = new FormData();
	  data.append("type", "6");
      data.append("postId", this.$route.params.id);
      axios({ method: "post", url: this.url.topicReplies, data })
      .then(res => {
				this.topicReplies = res.data;
				this.numberOfPages = Math.round(this.topicReplies.length / this.maxItemPerPage);
        })
        .catch(err => console.log(err));
    },
    postTopicReplies() {
      let data = new FormData();
      data.append("type", "2");
      data.append("postId", this.$route.params.id);
      data.append("usuarioId", this.userIdToReply);
      data.append("descripcion", this.reply);
      axios({ method: "post", url: this.url.topicReplies, data })
        .then(res => {
			if (res.data.a === '1') {
				this.snackbar.text = "Se ha enviado su respuesta satisfactoriamente para su aprobación";
				this.snackbar.show = true;
				this.closeTopicModal();
				this.getTopicReplies();
			}
        })
        .catch(err => console.log(err));
    },
    openTopicModal() {
      this.replyModal = !this.replyModal;
    },
    closeTopicModal() {
      this.replyModal = !this.replyModal;
      this.reply = "";
    }
  }
};
</script>
<style>
.topic-reply {
  min-height: 150px;
}
.topic-replay-img {
  height: 110px;
  width: 110px;
}
</style>