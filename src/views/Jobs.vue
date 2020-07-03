<style>
.jobs-image {
  width: 100%;
}
.upload-button {
  cursor: pointer;
  background-color: var(--color-primary);
}
.upload-button:hover {
  background-color: var(--color-primary-hover);
}
</style>
<template>
	<div>
		<v-snackbar v-model="snackbar.show" :bottom="true" :multi-line="true" :left="true" :timeout="snackbar.timeout" :vertical="false" color='secondary'>
      {{ snackbar.text }}
      <v-btn color="black" flat @click="snackbar.show = false">
        {{ english ? 'Close' : 'Cerrar'}}
      </v-btn>
    </v-snackbar>
		<PageHeader :title="english ? 'Work with Us' : 'Trabaja con nosotros'">
		</PageHeader>
		<v-container>
			<v-layout row wrap>

				<v-flex xs12 md6 class="mb-4">
					<img :src="`${imgDomain}/Assets/trabaja.jpg`" alt="jobs" class="jobs-image pr-4">
				</v-flex>
				<v-flex xs12 md6 class="px-4">
					<h1 class="display-2 font-weight-light">{{ english ? 'Send us your CV' : 'Envíanos tu Hoja de Vida'}}</h1>
					<v-form ref="form" lazy-validation class="py-4">
						<v-layout row wrap>
							<v-flex xs12 md6 class="px-2 py-1">
								<v-text-field 
								v-model="formInputs.name" 
								:rules="english ? formRulesEn.name : formRules.name" 
								:label=" english ? 'Full Name' : 'Nombre Completo' " 
								required
								></v-text-field>
							</v-flex>
							<v-flex xs12 md6 class="px-2 py-1">
								<v-text-field 
								v-model="formInputs.email" 
								:rules="english ? formRulesEn.email : formRules.email" 
								:label=" english ? 'Email Address' : 'Correo Electrónico'" 
								required
								></v-text-field>
							</v-flex>
							<v-flex xs12 md6 class="px-2 py-1">
								<v-text-field 
								v-model="formInputs.phone" 
								:rules="english ? formRulesEn.phone : formRules.phone" 
								:label=" english ? 'Phone' : 'Teléfono'" 
								mask="##-########"
								required
								></v-text-field>
							</v-flex>
							<v-flex xs12 md6 class="px-2 py-1">
								<v-text-field 
								v-model="formInputs.address" 
								:rules="english ? formRulesEn.address : formRules.address" 
								:label=" english ? 'Address' : 'Dirección'" 
								required
								></v-text-field>
							</v-flex>
							<v-flex xs12 class="px-2 py-1">
								<v-select 
								v-model="formInputs.occupation" 
								:items="occupations" 
								:rules="english ? formRulesEn.occupation : formRules.occupation"
								:label=" english ? 'Ocuppation' : 'Ocupación' "
								required
								></v-select>
							</v-flex>
							<v-flex xs12 class="px-2 py-1">
								<v-textarea 
								v-model="formInputs.info" 
								:rules="english ? formRulesEn.info : formRules.info" 
								:label=" english ? 'More Information' : 'Información Adicional'" 
								required
								></v-textarea>
							</v-flex>
						</v-layout>
						<v-layout align-center>
							<label class="upload-button mr-4" for="upload-input">
								<v-icon color="white" class="pa-3">fas fa-upload</v-icon>
							</label>
							<input type="file" style="display:none" @change="uploadFile" id="upload-input">
							<v-text-field disabled id="upload-info" :placeholder=" english ? 'Upload File' : 'Subir Archivo'" style="margin-top:10px; width:100%"></v-text-field>
						</v-layout>
						<v-layout row wrap class="pa-0 ma-0 py-2">
							<v-btn color="secondary" @click="submitForm" class="ml-0 font-weight-bold">
								{{ english ? 'Send' : 'Enviar'}}
							</v-btn>
							<v-btn class='font-weight-bold' color="secondary" @click="clearForm">{{ english ? 'Clean' : 'Limpiar'}}</v-btn>
						</v-layout>
					</v-form>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
import Settings from "@/data/Settings.js";
import axios from 'axios';

export default {
  name: "jobs",
  data() {
    return {
      english: sessionStorage.english === 'true',
      url: `${Settings.serverDomain}/cWork.php`,
			formInputs:{
				name: "",
				email: "",
				phone: "",
				address: "",
				occupation: "",
				info: "",
				file: [],
			},
			snackbar: {
        show: false,
        timeout: 6000,
        text: "Por defecto",
        y: "bottom",
        x: "left"
      },
      formRules: {
				name: [ 
					v => !!v || "El nombre es requerido",
					v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto del titulo invalido"
					],
				email: [ 
					v => !!v || "Un email valido es requerido",
					v => /^[a-z0-9\_]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(v) || "Email invalido"
					],
				phone: [ 
					v => !!v || "El número telefónico es requerido",
					v => /^0[2-9]\d{7,8}$/.test(v) || "Número telefónico invalido"
					],
				address: [ 
					v => !!v || "La dirección es requerida",
					v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Dirección invalida"
					],
				occupation: [ 
					v => !!v || "La ocupación es requerida",
					],
				info: [ 
					v => !!v || "La información adicional es requerida",
					v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,\:]+$/.test(v) || "Información posee caracteres no permitidos (<>,'',)"
					],
						},
      formRulesEn: {
				name: [ 
					v => !!v || "This field is required",
					v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
					],
				email: [ 
					v => !!v || "This field is required",
					v => /^[a-z0-9\_]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(v) || "Invalid Email"
					],
				phone: [ 
					v => !!v || "This field is required",
					v => /^0[2-9]\d{7,8}$/.test(v) || "Invalid phone number"
					],
				address: [ 
					v => !!v || "This field is required",
					v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Address"
					],
				occupation: [ 
					v => !!v || "This field is required",
					],
				info: [ 
					v => !!v || "This field is required",
					v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,\:]+$/.test(v) || "Information has not allowed characters (<>,'',)"
					],
			},
			occupations: ["Ingeniero", "Maestro"],
      imgDomain: Settings.resourcesDomain,
    };
  },
  components: {
    PageHeader
  },
  methods: {
		submitForm(){
			if (this.$refs.form.validate()) {
			let data = new FormData();
			data.append('type', '2');
			data.append('nombre', this.formInputs.name);
			data.append('correo', this.formInputs.email);
			data.append('telefono', this.formInputs.phone);
			data.append('direccion', this.formInputs.address);
			data.append('cargo', '3');
			data.append('descripcion', this.formInputs.info);
			data.append('pdf',this.formInputs.file );
			axios({
				method: 'post',
				url: this.url,
				data
			})
			.then(res => {
				if (res.data.a === '1') {
					this.snackbar.text = "Su hoja de vida ha sido enviado correctamente";
					this.snackbar.show = true;
					this.clearForm()
				} else {
					this.snackbar.text = "Ha ocurrido un problema y su hoja de vida no pude ser enviada";
					this.snackbar.show = true;
				}
			})
			.catch( err => console.log(err) ) 
			} else {
				this.snackbar.text = "No ha terminado de completar los datos o hay errores en la informacion suministrada";
				this.snackbar.show = true;
			}
		},
    uploadFile() {
			var pdrs = document.getElementById("upload-input").files[0].name;
			document.getElementById("upload-info").value = pdrs;
			this.formInputs.file = document.getElementById("upload-input").files[0];
		},
		clearForm() {
      this.$refs.form.reset();
      document.getElementById("fileUploader").value = "";
    },
  }
};
</script>