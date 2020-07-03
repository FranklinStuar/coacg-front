<template>
	<div>
		<v-container class="pb-0">
<!-- SNACKBAR -->
    <v-snackbar v-model="snackbar.show" :bottom="true" :multi-line="true" :right="true" :timeout="snackbar.timeout" :vertical="false" color='secondary'>
      {{ snackbar.text }}
      <v-btn color="black" flat @click="snackbar.show = false">
      	Cerrar
      </v-btn>
    </v-snackbar>
<!-- SNACKBAR -->
			<v-dialog v-model="passwordRecoveryModal" max-width="390">
				<v-card>
					<v-card-title class="headline">Cambio de Contraseña</v-card-title>

					<v-card-text>
						<v-form ref="passRecoveryForm">
						  <v-text-field
						    name="email"
						    label="Email"
						    v-model="passRecoveryEmail"
                :rules="passRecoveryEmailRules"
						  ></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="red darken-1" flat="flat" @click="passwordRecoveryModal = false">
							Cancelar
						</v-btn>
						<v-btn :loading="loading" :disabled="loading" color="green darken-1" flat="flat" @click="passRecovery">
							Aceptar
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<v-layout row wrap>
				<!-- *************** LOGIN TOOLBAR *************** -->
				<v-flex v-if="!isUserLogged" xs12>
					<v-toolbar height="90px" class="" color="white">
						<v-toolbar-items>
							<v-icon>fa fa-user</v-icon>
						</v-toolbar-items>
						<v-toolbar-title> {{ english ? 'Guess' : 'Invitado'}} </v-toolbar-title>
						<v-divider class="mx-4" inset vertical></v-divider>
						<v-form ref="loginForm">
							<v-layout row wrap>
								<v-flex xs12 md6>
									<v-text-field
									@keypress.enter="login"
									v-if="isLoginFieldsVisible"
									v-model="formInputs.username"  
									:rules="formRules.username"
									flat 
									:label=" english ? 'Username' : 'Usuario'"
									class="px-2 mt-4 font-weight-bold"
									></v-text-field>
								</v-flex>
								<v-flex xs12 md6>
									<v-text-field
									@keypress.enter="login"
									v-if="isLoginFieldsVisible"
									v-model="formInputs.password"  
									:rules="formRules.password"
									flat
									type="password"
									:label=" english ? 'Password' : 'Contraseña'"
									class="px-2 mt-4 font-weight-bold"
									></v-text-field>
								</v-flex>
							</v-layout>
						</v-form>
							<v-btn
							  v-if="isLoginFieldsVisible"
							  flat
							  small
							  @click="openPasswordRecoveryModal()"
							>
								{{ english ? 'Have you forgotten your password?' : '¿Ha olvidado su contraseña?'}}
							</v-btn>
							<p v-if="!isLoginFieldsVisible" >{{english ? 'To be able to participate in the discussions of this forum you must enter your username first.' : 'Para poder participar en las discusiones de este foro debes ingresar tu usuario primero.'}}</p>
							<v-spacer v-if="!isLoginFieldsVisible"></v-spacer>
						<v-btn flat v-if="isLoginFieldsVisible" color="secondary" @click="login" dark>
							<v-icon size="20px">fa fa-check</v-icon>&nbsp; {{ english ? 'Accept' : 'Aceptar'}}
						</v-btn>
						<v-btn flat v-if="!isLoginFieldsVisible" color="secondary" @click="isLoginFieldsVisible = !isLoginFieldsVisible" dark>
							<v-icon size="20px">fa fa-sign-in-alt</v-icon>&nbsp; {{ english ? 'Sign In' : 'Ingresar'}}
						</v-btn>
						<v-btn flat v-if="isLoginFieldsVisible" color="red darken-2" @click="isLoginFieldsVisible = !isLoginFieldsVisible" dark>
							<v-icon size="20px">fa fa-times</v-icon>&nbsp; {{ english ? 'Cancel' : 'Cancelar'}}
						</v-btn>
						<v-btn flat v-if="!isLoginFieldsVisible" to="/forumregister" color="primary" @click="" dark>
							<v-icon size="20px">fa fa-user-plus</v-icon>&nbsp; {{ english ? 'Sign Up' : 'Registrate'}}
						</v-btn>
					</v-toolbar>
				</v-flex>
				<v-flex class="mt-2" xs12 v-else>
				  <v-toolbar height="140px" class="" color="white">
							<v-layout row wrap fill-height>
								<v-flex d-flex justify-center align-center xs12 md1 >
									<img class="forum-user-avatar" :src="avatars[loginInfo.userAvatar - 1].imagen" :alt="avatars[loginInfo.userAvatar - 1].titulo">
								</v-flex>
								<v-flex d-flex justify-center align-center xs12 md9 class="pl-4">
									<h1 class="display-2">{{ loginInfo.user }}</h1>
								</v-flex>
								<v-flex xs12 md1 d-flex justify-center align-center>
									<v-btn @click="logout" color="red darken-2" dark><v-icon size="20px">fa fa-sign-out-alt</v-icon></v-btn>
								</v-flex>
								<v-flex xs12 md1 d-flex justify-center align-center>
									<v-btn :to="`/forum/user/${loginInfo.user}`" color="primary"><v-icon size="20px">fa fa-cog</v-icon></v-btn>
								</v-flex>
							</v-layout>
						</v-toolbar>
				</v-flex>
				<!-- *************** LOGIN TOOLBAR *************** -->
			</v-layout>
		</v-container>
		<v-container fluid>
			<router-view></router-view>
		</v-container>
	</div>
</template>
<script>
	import axios from 'axios';
	import Settings from "@/data/Settings.js";
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
		name: 'forum',
		data(){
			return {
				english: sessionStorage.english === 'true',
				isUserLogged: sessionStorage.logged === 'true',
        loading: false,
        url: `${Settings.serverDomain}/cLoginForo.php`,
				isLoginFieldsVisible: false,
				passwordRecoveryModal: false,
				passRecoveryEmail: '',
				passRecoveryEmailRules: [
          v => !!v || "El campo es requerido",
          v => /^[a-z0-9\_]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(v) || "Dirección de correo invalida"
        ],
				idToUpdate: '',
				formInputs: {
					username: '',
					password: '',
				},
				snackbar: {
          show: false,
          timeout: 6000,
          text: "Por defecto",
          y: "bottom",
          x: "left"
        },
				formRules: {
					username: [
						v => !!v || "El Usuario es requerido",
					],
					password: [
						v => !!v || "La contraseña es requerida",
					],
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
		        loginInfo: {
		        	user: sessionStorage.user,
					userID: sessionStorage.userID,
					userAvatar: sessionStorage.userAvatar,
		        },
			}
		},
		methods: {
			login(){
				if (this.$refs.loginForm.validate()) {
					let data = new FormData();
					data.append('type', '1');
					data.append('usuario', this.formInputs.username);
					data.append('password', this.formInputs.password);
					axios({ method: 'post', url: this.url, data })
					.then( res => {
						switch (res.data.a) {
							case '1':
								sessionStorage.setItem('logged', 'true');
								sessionStorage.setItem('user', res.data.b.usuario);
								sessionStorage.setItem('userID', res.data.b.id);
								sessionStorage.setItem('userAvatar', res.data.b.avatar);
								this.snackbar.text = "Ingreso completado satisfactoriamente";
								this.snackbar.show = true;
								location.reload();
								break;
							case '2':
								this.snackbar.text = "Usuario o Contraseña Incorrecta";
								this.snackbar.show = true;
								break;
							case '3':
								this.snackbar.text = "Hubo un problema al intentar ingresar el usuario, por favor intente de nuevo más tarde";
								this.snackbar.show = true;
								break;
						}
					})
					.catch( err => console.log(err))
				}
			},
			logout(){
				let data = new FormData();
				data.append('type', '2');
				axios({ method: 'post', url: this.url, data })
				.then( res => {
					if (res.data.a === '1') {
						sessionStorage.clear();
						location.reload();
					} else {
						
					}
				})
				.catch( err => console.log(err))
			},
		    openPasswordRecoveryModal() {
							this.passwordRecoveryModal = true;
		    },
		    passRecovery(){
		    	if (this.$refs.passRecoveryForm.validate()) {
            this.loading = true;
			    	let data = new FormData();
			    	data.append('type', '4');
			    	data.append('correo', this.passRecoveryEmail);
			    	axios({ method: 'post', url: this.url, data })
			    	.then( res => {
                  this.loading = false;
									if (res.data.a === '1') {
										this.passwordRecoveryModal = false;
										this.snackbar.text = "Se ha enviado un correo para proseguir con el cambio de contraseña de su usuario";
										this.snackbar.show = true;
									} else {
										this.snackbar.text = "No se pudo proseguir con el cambio de su contraseña";
										this.snackbar.show = true;
									}
			    	})
			    	.catch( err => console.log(err) )
		    	} else {
		    		this.snackbar.text = "Revise la información ingresada";
				  	this.snackbar.show = true;
		    	}
		    },
		}
	}
</script>
<style>
.forum-user-avatar{
	height: 100px;
	width: 100px;
	object-fit: contain;
}
</style>