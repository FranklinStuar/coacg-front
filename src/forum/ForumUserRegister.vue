<template>
	<v-container fluid grid-list-xl class="pt-0">
		<v-layout row wrap>
<!-- SNACKBAR -->
		    <v-snackbar v-model="snackbar.show" :bottom="true" :multi-line="true" :right="true" :timeout="snackbar.timeout" :vertical="false" color='secondary'>
		      {{ snackbar.text }}
		      <v-btn color="black" flat @click="snackbar.show = false">
		        {{ english ? 'Close' : 'Cerrar'}}
		      </v-btn>
		    </v-snackbar>
<!-- SNACKBAR -->
<!-- *************** TOPICS HEADER *************** -->
			<v-flex xs12 md6 offset-md3 class="py-5">
				<v-card>
					<v-toolbar flat color="primary" dark>
  					<v-toolbar-title class="font-weight-bold">{{ english ? 'User Sign Up' : 'Registro de Usuario'}}</v-toolbar-title>
  					<v-spacer></v-spacer>
  					<v-toolbar-items>
  						<v-btn dark block flat color="white" to="/forum"><v-icon>fa fa-times</v-icon></v-btn>
			      	<v-btn  :loading="loading" :disabled="loading" dark block flat color="white" @click="postUserRegister"><v-icon>fa fa-check</v-icon></v-btn>
  					</v-toolbar-items>
					</v-toolbar>
					<v-form ref="registerUserForm">
						<v-layout row wrap class="py-4 px-5">
						  <v-flex xs12>
						    <v-text-field
									@keypress.enter="postUserRegister"
						      name="name"
						      v-model="formInputs.name"
						      :rules="formRules.name"
						      :label="english ? 'Full Name' : 'Nombre Completo'"
						    ></v-text-field>
						  </v-flex>
						  <v-flex xs12>
						    <v-text-field
									@keypress.enter="postUserRegister"
						      name="username"
						      v-model="formInputs.username"
						      :rules="formRules.username"
						      :label="english ? 'Username' : 'Usuario'"
						    ></v-text-field>
						  </v-flex>
						  <v-flex xs12>
						    <v-text-field
									@keypress.enter="postUserRegister"
						      name="email"
						      v-model="formInputs.email"
						      :rules="formRules.email"
						      :label="english ? 'Email Address' : 'Correo Electrónico'"
						    ></v-text-field>
						  </v-flex>
						</v-layout>
					</v-form>
				</v-card>
			</v-flex>
<!-- *************** TOPICS HEADER *************** -->
	</v-layout>
</v-container>
</template>
<script>
	import axios from 'axios';
	import Settings from "@/data/Settings.js";
	export default {
		name: 'forumCategories',
		data(){
			return {
				english: sessionStorage.english === 'true',
				url: `${Settings.serverDomain}/cUsersForo.php`,
				loading: false,
				formInputs: {
					name: '',
					email: '',
					username: '',
				},
				formRules: {
					name: [
						v => !!v || "El campo es requerido",
          	v => /^[a-zA-Z-À-ÿñÑ\s]+$/.test(v) || "El nombre solo puedo contener texto sin caracteres especiales ni números"
					],
					email: [
						v => !!v || "El campo es requerido",
						v => /^[a-z0-9\_]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(v) || "Dirección de correo invalido"
					],
					username: [
						v => !!v || "El campo es requerido",
          	v => /^[a-zA-Z0-9À-ÿñÑ\s\_\.\@]+$/.test(v) || 'El usuario solo puede contener letras, número y estos caracteres especiales: "@ _ ."'
					],
				},
			snackbar: {
		        show: false,
		        timeout: 3000,
		        text: "Por defecto",
		        y: "bottom",
		        x: "left"
					},
			}
		},
		methods: {
			postUserRegister(){
				if (this.$refs.registerUserForm.validate()) {
				this.loading = true;
				let data = new FormData();
				data.append( 'type' , '2' );
				data.append( 'nombre' , this.formInputs.name );
				data.append( 'user' , this.formInputs.username );
				data.append( 'correo' , this.formInputs.email );
				axios({
					method: 'post',
					url: this.url,
					data
				})
				.then( res => {
							this.loading = false;
							if (res.data.a === '1') {
								this.$refs.registerUserForm.reset();
								this.snackbar.text = "Se ha enviado un link de confirmación a su dirección de correo, por favor confirme su registro de usuario.";
								this.snackbar.show = true;
								setTimeout(() => {
									this.$router.push({ path: '/forum'});
								}, 3000);
							} else {
								this.snackbar.text = "Ha habido un problema y no se pudo registar su usuario.";
								this.snackbar.show = true;
							}	
				} )
				.catch( err => console.log(err) )
				} else {
							this.snackbar.text = "Revise la información ingresada";
							this.snackbar.show = true;
				}
			},
		},
	}
</script>
<style>
</style>