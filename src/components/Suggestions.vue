<template>
  <v-container>
    <v-snackbar v-model="snackbar.show" :top='true' :center='true' color='secondary' :timeout='6000' :vertical="false">
      {{ snackbar.text }}
      <v-btn flat color="primary" @click.native="snackbar.show = false">Cerrar</v-btn>
    </v-snackbar>
    <v-layout row wrap class="py-4">
      <v-flex xs12>
        <h1 class="services-header mb-4 display-2 font-weight-light">{{ english ? 'Suggestions' : 'Sugerencias' }}</h1>
      </v-flex>
      <v-flex xs6 offset-xs3>
        <v-form ref="suggestionsForm">
          <v-text-field v-model="formInputs.name" :rules='english ? formRulesEn.name : formRules.name' name="name" :label=" english ? 'Full Name' : 'Nombre Completo' "></v-text-field>
          <v-text-field v-model="formInputs.email" :rules='english ? formRulesEn.email : formRules.email' name="email" :label="english ? 'Email Address' : 'Correo Electrónico'"></v-text-field>
          <v-text-field v-model="formInputs.phone" :rules='english ? formRulesEn.phone : formRules.phone' name="phone" :label=" english ? 'Phone Number' :  'Teléfono' "></v-text-field>
          <v-textarea v-model="formInputs.suggestion" :rules='english ? formRulesEn.suggestion : formRules.suggestion' name="suggestion" :label=" english ? 'Suggestion' : 'Sugerencia' "></v-textarea>
          <v-btn :loading="loading" @click="sendSuggestion" color="secondary" dark>{{ english ? 'Send Suggestion' : 'Enviar Sugerencia' }}</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import Settings from "@/data/Settings.js";
export default {
  data() {
    return {
      loading: false,
      english: sessionStorage.english === "true",
      formInputs: {
        name: "",
        email: "",
        phone: "",
        suggestion: ""
      },
      formRules: {
        name: [
          v => !!v || "El nombre es requerido",
          v =>
            /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) ||
            "Texto del nombre posee caracteres invalidos"
        ],
        email: [
          v => !!v || "Un email valido es requerido",
          v =>
            /^[a-z0-9\_]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(
              v
            ) || "Email invalido"
        ],
        phone: [
          v => !!v || "El número telefónico es requerido",
          v => /^0[2-9]\d{7,8}$/.test(v) || "Número telefónico invalido"
        ],
        suggestion: [
          v => !!v || "La sugerencia es requerida",
          v =>
            /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,\:]+$/.test(v) ||
            "Información posee caracteres no permitidos (<>,'',)"
        ]
      },
      formRulesEn: {
        name: [
          v => !!v || "This field is required",
          v =>
            /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) ||
            "Name text has invalid characters"
        ],
        email: [
          v => !!v || "This field is required",
          v =>
            /^[a-z0-9\_]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(
              v
            ) || "Invalid Email"
        ],
        phone: [
          v => !!v || "This field is required",
          v => /^0[2-9]\d{7,8}$/.test(v) || "Invalid phone number"
        ],
        suggestion: [
          v => !!v || "This field is required",
          v =>
            /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,\:]+$/.test(v) ||
            "Information has not allowed characters (<>,'',)"
        ]
      },
      url: `${Settings.serverDomain}/cSendMail.php`,
      snackbar: {
        show: false,
        text: "Por defecto"
      }
    };
  },
  methods: {
    sendSuggestion() {
      if (this.$refs.suggestionsForm.validate()) {
        this.loading = true;
        let data = new FormData();
        data.append("type", "1");
        data.append("name", this.formInputs.name);
        data.append("email", this.formInputs.email);
        data.append("phone", this.formInputs.phone);
        data.append("message", this.formInputs.suggestion);
        axios({
          method: "post",
          url: this.url,
          data
        })
          .then(res => {
            if (res.data.a === "1") {
              this.snackbar.text = "Se ha enviado la sugerencia correctamente";
              this.snackbar.show = true;
              this.loading = false;
							this.$refs.suggestionsForm.reset();
            } else {
              this.snackbar.text =
                "Ha ocurrido un error y no se ha podido enviar la sugerencia";
              this.snackbar.show = true;
              this.loading = false;
            }
          })
          .catch(err => console.log(err));
      } else {
        this.snackbar.text =
          "La información suministrada no es correcta, revise e intente nuevamente";
        this.snackbar.show = true;
        this.loading = false;
      }
    }
  }
};
</script>

<style>
</style>
