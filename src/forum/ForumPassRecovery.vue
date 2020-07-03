<template>
	<v-container fluid 	grid-list-xl class="pt-0">
		<v-layout row wrap class="py-5">
<!-- SNACKBAR -->
		    <v-snackbar v-model="snackbar.show" :bottom="true" :multi-line="true" :right="true" :timeout="snackbar.timeout" :vertical="false" color='secondary'>
		      {{ snackbar.text }}
		      <v-btn color="black" flat @click="snackbar.show = false">
		        {{ english ? 'Close' : 'Cerrar'}}
		      </v-btn>
		    </v-snackbar>
<!-- SNACKBAR -->
<!-- *************** TOPICS HEADER *************** -->
			<v-flex xs12 md6 offset-md3>
				<v-card>
					<v-toolbar flat color="primary" dark>
	  					<v-toolbar-title class="font-weight-bold">{{ english ? 'Change Password' : 'Cambio de Contraseña'}}</v-toolbar-title>
	  					<v-spacer></v-spacer>
	  					<v-toolbar-items>
	  						<v-btn dark block flat color="white" to="/"><v-icon>fa fa-times</v-icon></v-btn>
				      		<v-btn dark block flat color="white" @click="postPassRecovery"><v-icon>fa fa-check</v-icon></v-btn>
	  					</v-toolbar-items>
					</v-toolbar>
					<v-form ref="passRecoveryForm">
						<v-layout row wrap class="py-4 px-5">
						  <v-flex xs12>
						    <v-text-field
						      type="password"
						      name="password"
						      v-model="formInputs.password"
						      :rules="formRules.password"
						      :label="english ? 'Password' : 'Contraseña'"
						    ></v-text-field>
						  </v-flex>
						  <v-flex xs12>
						    <v-text-field
						      type="password"
						      name="confirmPassword"
						      v-model="formInputs.confirmPassword"
						      :rules="formRules.confirmPassword"
						      :label="english ? 'Confirm Password' : 'Confirmar Contraseña'"
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
		  	url: `${Settings.serverDomain}/cUsersForo.php`,
				english: sessionStorage.english === 'true',
				currentAvatarID: '',
				formInputs: {
					password: '', 
					confirmPassword: '', 
				},
				formRules: {
					password: [
						v => !!v || "El campo es requerido",
          	v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/.test(v) || "La constraseña debe poseer al menos una letra mayuscula, un número y un caracter especial"
					],
					confirmPassword: [
						v => !!v || "El campo es requerido",
						v => v === this.formInputs.password || 'Las contraseñas no coinciden'
					],
				},
				snackbar: {
		      show: false,
		      timeout: 6000,
		      text: "Por defecto",
		      y: "bottom",
		      x: "left"
				},
			}
		},
		methods: {
			postPassRecovery(){
				if (this.$refs.passRecoveryForm.validate()) {
					let data = new FormData();
					data.append('type', '9');
					data.append('password', this.formInputs.password);
					data.append('token', this.$route.params.token);
					axios({
						method: 'post',
						url: this.url,
						data
					})
					.then( res => {
						if (res.data.a === '1') {
							this.$refs.confirmUserForm.reset();
							this.snackbar.text = "Su contraseña ha sido modificada con exito.";
							this.snackbar.show = true;
						} else {
							this.snackbar.text = "Ha habido un problema y no se pudo modificar su contraseña.";
							this.snackbar.show = true;
						}
					})
					.catch( err => console.log(err) )
				} else{
					this.snackbar.text = "Revise la información ingresada";
					this.snackbar.show = true;
				}
			},
		},
	}
</script>
<style>
</style>