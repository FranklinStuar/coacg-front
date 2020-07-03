<template>
	<v-container grid-list-xl class="pt-0">
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
			<v-flex xs12 md8 offset-md2>
          <v-card>
            <v-toolbar flat color="primary" dark>
  					<v-toolbar-title class="font-weight-bold">{{ english ? 'Update User Info' : 'Actualización de Usuario'}}</v-toolbar-title>
  					<v-spacer></v-spacer>
  					<v-toolbar-items>
  						<v-btn dark block flat color="white" to="/forum"><v-icon>fa fa-times</v-icon></v-btn>
			      	<v-btn  dark block flat color="white" @click="putUserInfo"><v-icon>fa fa-check</v-icon></v-btn>
  					</v-toolbar-items>
					</v-toolbar>
            <v-form ref="userForm">
            <v-layout row wrap class="py-4 px-5">
              <v-flex xs12 md6>
                <v-text-field
                  disabled
                  name="username"
                  v-model="formInputs.username"
                  :rules="formRules.username"
                  :label="english ? 'Username' : 'Usuario'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  disabled
                  name="email"
                  v-model="formInputs.email"
                  :rules="formRules.email"
                  :label="english ? 'Email Address' : 'Dirección de Correo'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="email"
                  v-model="formInputs.name"
                  :rules="formRules.name"
                  :label="english ? 'Full Name' : 'Nombre'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  name="email"
                  v-model="formInputs.address"
                  :rules="formRules.address"
                  :label="english ? 'Address' : 'Dirección'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  name="email"
                  v-model="formInputs.phone"
                  :rules="formRules.phone"
                  :label="english ? 'Phone Number' : 'Teléfono'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  name="email"
                  v-model="formInputs.iD"
                  :rules="formRules.iD"
                  :label="english ? 'ID' : 'Identificacion'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-autocomplete
                v-model="currentAvatarID"
                :items="avatars"
                label="Seleccione un Avatar"
                item-text="titulo"
                item-value="id"
              >
                <template
                  slot="item"
                  slot-scope="data"
                  style="height:80px"
                  
                >
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-avatar>
                      <img height="80px" :src="data.item.imagen" alt="">
                    </v-list-tile-avatar >
                    <v-list-tile-content style="height:80px">
                      <v-list-tile-title v-html="`${data.item.titulo}`"></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
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
		name: 'forumCategories',
		data(){
			return {
        url: `${Settings.serverDomain}/cUsersForo.php`,
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
        currentAvatarID: '',
        idToUpdate: '',
				english: sessionStorage.english === 'true',
				formInputs: {
					username: '',
          email: '',
          name: '',
          address: '',
          phone: '',
          iD: '',
				},
				formRules: {
					username: [
						v => !!v || "El campo es requerido",
					],
					email: [
						v => !!v || "El campo es requerido",
					],
					name: [
            v => !!v || "El campo es requerido",
            v => /^[a-zA-Z-À-ÿñÑ\s]+$/.test(v) || "El nombre solo puedo contener texto sin caracteres especiales ni números"
					],
					address: [
						v => !!v || "El campo es requerido",
          	v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "El texto contiene caracteres invalidos"
					],
					phone: [
						v => !!v || "El campo es requerido",
          	v => /^0[2-9]\d{7,8}$/.test(v) || "Número de teléfono invalido"
					],
					iD: [
						v => !!v || "El campo es requerido",
          	v => /^\d{10}$/.test(v) || "Cédula invalida"
					],
				},
			}
		},
    created(){
      if (sessionStorage.logged === 'true') {
        this.getUserInfo();
      } else {
        this.$router.push({ path: '/forum'});
      }
    },
		methods: {
      getUserInfo(){
        let data = new FormData();
        data.append("type", "8");
        data.append("usuario", this.$route.params.user);
        axios({ method: "post", url: this.url, data })
          .then( res => {
            this.formInputs.username = res.data.usuario 
            this.formInputs.email = res.data.correo 
            this.formInputs.name = res.data.nombre 
            this.formInputs.address = res.data.direccion
            this.formInputs.phone = res.data.telefono
            this.formInputs.iD = res.data.identificacion
            this.currentAvatarID = res.data.avatar
            this.idToUpdate = res.data.id
          } )
          .catch(err => console.log(err));
      },
      putUserInfo(){
        if (this.$refs.userForm.validate()) {
          let data = new FormData();
          data.append("type", "3");
          data.append("nombre", this.formInputs.name);
          data.append("direccion", this.formInputs.address);
          data.append("telefono", this.formInputs.phone);
          data.append("identificacion", this.formInputs.iD);
          data.append("avatar", this.currentAvatarID);
          data.append("id", this.idToUpdate);
          axios({ method: "post", url: this.url, data })
            .then( res => {
              if (res.data.a === '1') {
                this.getUserInfo();
                this.snackbar.text = "Se actualizado la información correctamente";
                this.snackbar.show = true;
              } else {
                this.snackbar.text = "No se ha podido actualizar la información correctamente";
                this.snackbar.show = true;
              }
            } )
            .catch(err => console.log(err));
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