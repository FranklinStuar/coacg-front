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
     <v-snackbar v-model="snackbar.show" :bottom="true" :multi-line="true" :right="true" :timeout="snackbar.timeout" :vertical="false" color='secondary'>
      {{ snackbar.text }}
      <v-btn color="black" flat @click="snackbar.show = false">
        Cerrar
      </v-btn>
    </v-snackbar>
    <PageHeader :title="english ? 'Formalities' : 'Tramites'">
    </PageHeader>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md8 offset-md2 class='mt-2'>
          <v-tabs 
            centered 
            grow 
            color="primary" 
            dark 
            icons-and-text
          >
            <v-tabs-slider color="secondary"></v-tabs-slider>
            <v-tab class='font-weight-bold subheading' href="#tab-1">
              {{english ? 'Credit Request' : 'Solicitud de Crédito'}}
            </v-tab>
            <v-tab class='font-weight-bold subheading' href="#tab-2">
              {{english ? 'Account Openning' : 'Apertura de Cuenta'}}
            </v-tab>
            <v-tab-item :id="'tab-1'">
              <v-card >
                <v-card-title primary-title class="px-5">
                  <v-form 
                    style="width: 100%" 
                    ref="creditRequestForm" 
                    lazy-validation 
                    class="py-4"
                  >
                    <v-container fluid>
                      
                      <v-layout row wrap>
                        <v-flex xs12 md4 class="px-2">
                          <v-text-field 
                          v-model="creditFormInputs.name" 
                          :rules="english ? creditFormRulesEn.name : creditFormRules.name"  
                          :label="english ? 'Both Name' : 'Nombres'"  required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 class="px-2">
                          <v-text-field 
                          v-model="creditFormInputs.lastname" 
                          :rules="english ? creditFormRulesEn.lastname : creditFormRules.lastname"  
                          :label="english ? 'Last Name' : 'Apellidos'"  required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 class="px-2">
                          <v-text-field 
                          v-model="creditFormInputs.id" 
                          :rules="english ? creditFormRulesEn.id : creditFormRules.id" 
                          :label="english ? 'ID' :  'Cédula'" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 class="px-2">
                          <v-text-field 
                          v-model="creditFormInputs.amount" 
                          :rules="english ? creditFormRulesEn.amount : creditFormRules.amount" 
                          :label="english ? 'Amount' :  'Monto a Solicitar'" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 class="px-2">
                          <v-text-field 
                          v-model="creditFormInputs.fee" 
                          :rules="english ? creditFormRulesEn.fee : creditFormRules.fee" 
                          :label="english ? 'Quota (Quantity that you can pay)' : 'Cuota (Cantidad que puede pagar)'" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 class="px-2">
                          <v-text-field 
                          v-model="creditFormInputs.phone" 
                          :rules="english ? creditFormRulesEn.phone : creditFormRules.phone" 
                          :label="english ? 'Phone Number' : 'Teléfono'" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 class="px-2">
                          <v-text-field 
                          v-model="creditFormInputs.mobile" 
                          :rules="english ? creditFormRulesEn.mobile : creditFormRules.mobile" 
                          :label="english ? 'Mobile Phone Number' : 'Celular'" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 class="px-2">
                          <v-textarea 
                          v-model="creditFormInputs.reason" 
                          :rules="english ? creditFormRulesEn.reason : creditFormRules.reason" 
                          :label="english ? 'Destiny for credit' : 'Destino del Crédito'" required></v-textarea>
                        </v-flex>
                        <v-flex xs12 class="px-2">
                          <v-text-field 
                          v-model="creditFormInputs.occupation" 
                          :rules="english ? creditFormRulesEn.occupation : creditFormRules.occupation" 
                          :label="english ? 'Occupation' : 'Ocupacion del Solicitante'" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 class="px-2">
                          <v-text-field 
                          v-model="creditFormInputs.salary" 
                          :rules="english ? creditFormRulesEn.salary : creditFormRules.salary" 
                          :label="english ? 'Salary' : 'Sueldo'" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 class="px-2">
                          <v-text-field 
                          v-model="creditFormInputs.debts" 
                          :rules="english ? creditFormRulesEn.debts : creditFormRules.debts" 
                          :label="english ? 'Total Expeses' : 'Gastos totales'" required></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap class="pa-0 ma-0 py-2">
                        <v-btn @click="sendCreditRequest" class='font-weight-bold ml-0' color="secondary" >
                          {{english ? 'Send' : 'Enviar'}}
                        </v-btn>
                        <v-btn class='font-weight-bold' color="secondary" @click="cleanForm">{{ english ? 'Clean' : 'Limpiar'}}</v-btn>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-title>
              </v-card>
            </v-tab-item>
            <v-tab-item :id="'tab-2'">
              <v-card >
                <v-card-title primary-title class="px-5">
                  <v-form 
                  style="width: 100%" 
                  ref="accountOpenForm"  
                  lazy-validation 
                  class="py-4"
                  >
                  <v-container fluid>
                    <v-layout row wrap>
                      <v-flex xs12 md4>
                        <v-text-field 
                        v-model="accountsFormInputs.name" 
                        :rules="english ? accountsFormRulesEn.name : accountsFormRules.name"  
                        :label="english ? 'Both Name' : 'Nombres'"  required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field v-model="accountsFormInputs.lastname" :rules="english ? accountsFormRulesEn.lastname : accountsFormRules.lastname"  
                        :label="english ? 'Last Name' :  'Apellidos'"  required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field v-model="accountsFormInputs.id" :rules="english ? accountsFormRulesEn.id : accountsFormRules.id" 
                        :label="english ? 'ID' :  'Cédula'" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field v-model="accountsFormInputs.birthPlace" :rules="english ? accountsFormRulesEn.birthPlace : accountsFormRules.birthPlace" 
                        :label="english ? 'Birthplace' :  'Lugar de nacimiento'" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-dialog
                        ref="datepickerDialog"
                        v-model="datepickerModal"
                        :return-value.sync="accountsFormInputs.birthday"
                        lazy
                        full-width
                        width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="accountsFormInputs.birthday"
                          :rules="english ? accountsFormRulesEn.birthday : accountsFormRules.birthday"
                          :label="english ? 'Birthday' : 'Fecha de nacimiento'"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="accountsFormInputs.birthday" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="datepickerModal = false">{{english ? 'Cancel' : 'Cancelar'}}</v-btn>
                          <v-btn flat color="primary" @click="$refs.datepickerDialog.save(accountsFormInputs.birthday)">{{ english ? 'Accept' : 'Aceptar' }}</v-btn>
                        </v-date-picker>
                      </v-dialog>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field 
                        v-model="accountsFormInputs.civilStatus" 
                        :rules="english ? accountsFormRulesEn.civilStatus : accountsFormRules.civilStatus" 
                        :label="english ? 'Civil Status' : 'Estado civil'" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field 
                        v-model="accountsFormInputs.homePhone" 
                        :rules="english ? accountsFormRulesEn.homePhone : accountsFormRules.homePhone" 
                        :label="english ? 'Phone Number' : 'Teléfono convencional'" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field 
                        v-model="accountsFormInputs.mobile" 
                        :rules="english ? accountsFormRulesEn.mobile : accountsFormRules.mobile" 
                        :label="english ? 'Mobile Phone Number' : 'Celular'" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field 
                        v-model="accountsFormInputs.email" 
                        :rules="english ? accountsFormRulesEn.email : accountsFormRules.email" 
                        :label="english ? 'Email' : 'Correo electrónico'" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea 
                        v-model="accountsFormInputs.address" 
                        :rules="english ? accountsFormRulesEn.address : accountsFormRules.address" 
                        :label="english ? 'Home Address' : 'Dirección de domicilio'" required></v-textarea>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea 
                        v-model="accountsFormInputs.referenceAddress" 
                        :rules="english ? accountsFormRulesEn.referenceAddress : accountsFormRules.referenceAddress" 
                        :label="english ? 'Place of Reference' : 'Lugar de referencia'" required></v-textarea>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field 
                        v-model="accountsFormInputs.dwelingType" 
                        :rules="english ? accountsFormRulesEn.dwelingType : accountsFormRules.dwelingType" 
                        :label="english ? 'Type of housing' : 'Tipo de vivienda'" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field 
                        v-model="accountsFormInputs.workPhone" 
                        :rules="english ? accountsFormRulesEn.workPhone : accountsFormRules.workPhone" 
                        :label="english ? 'Work Phone' : 'Número de trabajo'" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field 
                        v-model="accountsFormInputs.job" 
                        :rules="english ? accountsFormRulesEn.job : accountsFormRules.job" 
                        :label="english ? 'Economic Activity' : 'Actividad económica (En que trabaja)'" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field 
                        v-model="accountsFormInputs.parnetName" 
                        :rules="english ? accountsFormRulesEn.parnetName : accountsFormRules.parnetName" 
                        :label="english ? 'Parnet Both Name' : 'Nombres conyuge'" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field 
                        v-model="accountsFormInputs.parnetLastname" 
                        :rules="english ? accountsFormRulesEn.parnetLastname : accountsFormRules.parnetLastname" 
                        :label="english ? 'Parnet Last Name' : 'Apellidos conyuge'" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field 
                        v-model="accountsFormInputs.parnetID" 
                        :rules="english ? accountsFormRulesEn.parnetID : accountsFormRules.parnetID" 
                        :label="english ? 'Parnet ID' :'Cédula conyuge'" required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap class="pa-0 ma-0 py-2">
                      <v-btn @click="sendAccountOpenRequest" color="secondary"  class="ml-0">
                        {{english ? 'Send' :'Enviar'}}
                      </v-btn>
                      <v-btn color="secondary" @click="cleanForm">{{english ? 'Clean' : 'Limpiar'}}</v-btn>
                    </v-layout>
                  </v-container>
                  </v-form>
                </v-card-title>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import PageHeader from "@/components/PageHeader.vue";
  import Settings from '@/data/Settings.js';
  import axios from 'axios';
  export default {
    name: "formalities",
    data() {
      return {
        english: sessionStorage.english === "true",
        datepickerModal: false,
        creditFormInputs: {
          name: "",
          lastname: "",
          id: "",
          amount: "",
          fee: "",
          phone: "",
          mobile: "",
          reason: "",
          occupation: "",
          salary: "",
          debts: ""
        },
        accountsFormInputs: {
          name: "",
          lastname: "",
          id: "",
          birthPlace: "",
          birthday: "",
          civilStatus: "",
          homePhone: "",
          mobile: "",
          email: "",
          address: "",
          referenceAddress: "",
          job: "",
          workPhone: "",
          dwelingType: "",
          parnetName: "",
          parnetLastname: "",
          parnetID: ""
        },
        creditFormRules: {
          name: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          lastname: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          id: [
            v => !!v || "Este campo es requerido",
            v => /^\d{10}$/.test(v) || "Número de Cédula Invalido"
          ],
          amount: [
            v => !!v || "Este campo es requerido",
            v => /[^a-zA-ZÀ-ÿñÑ\s\-\*\+\/\,]/.test(v) || "Solo se puede ingresar números"
          ],
          fee: [
            v => !!v || "Este campo es requerido",
            v => /[^a-zA-ZÀ-ÿñÑ\s\-\*\+\/\,]/.test(v) || "Solo se puede ingresar números"
          ],
          phone: [
            v => !!v || "Este campo es requerido",
            v => /^0[2-9]\d{7,8}$/.test(v) || "Texto invalido"
          ],
          mobile: [
            v => !!v || "Este campo es requerido",
            v => /^0[2-9]\d{7,8}$/.test(v) || "Texto invalido"
          ],
          reason: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          occupation: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          salary: [
            v => !!v || "Este campo es requerido",
            v => /[^a-zA-ZÀ-ÿñÑ\s\-\*\+\/\,]/.test(v) || "Solo se puede ingresar números"
          ],
          debts: [
            v => !!v || "Este campo es requerido",
            v => /[^a-zA-ZÀ-ÿñÑ\s\-\*\+\/\,]/.test(v) || "Solo se puede ingresar números"
          ]
        },
        creditFormRulesEn: {
          name: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          lastname: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          id: [
            v => !!v || "This field is required",
            v => /^\d{10}$/.test(v) || "Invalid ID"
          ],
          amount: [
            v => !!v || "This field is required",
            v => /[^a-zA-ZÀ-ÿñÑ\s\-\*\+\/\,]/.test(v) || "This field can only contain numbers"
          ],
          fee: [
            v => !!v || "This field is required",
            v => /[^a-zA-ZÀ-ÿñÑ\s\-\*\+\/\,]/.test(v) || "This field can only contain numbers"
          ],
          phone: [
            v => !!v || "This field is required",
            v => /^0[2-9]\d{7,8}$/.test(v) || "Invalid phone number"
          ],
          mobile: [
            v => !!v || "This field is required",
            v => /^0[2-9]\d{7,8}$/.test(v) || "Invalid phone number"
          ],
          reason: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          occupation: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          salary: [
            v => !!v || "This field is required",
            v => /[^a-zA-ZÀ-ÿñÑ\s\-\*\+\/\,]/.test(v) || "This field can only contain numbers"
          ],
          debts: [
            v => !!v || "This field is required",
            v => /[^a-zA-ZÀ-ÿñÑ\s\-\*\+\/\,]/.test(v) || "This field can only contain numbers"
          ]
        },
        accountsFormRules: {
          name: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          lastname: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          id: [
            v => !!v || "Este campo es requerido",
            v => /^\d{10}$/.test(v) || "El número de cedula es invalido"
          ],
          birthPlace: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          birthday: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          civilStatus: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          homePhone: [
            v => !!v || "Este campo es requerido",
            v => /^0[2-9]\d{7,8}$/.test(v) || "Número telefonico invalido"
          ],
          mobile: [
            v => !!v || "Este campo es requerido",
            v => /^0[2-9]\d{7,8}$/.test(v) || "Número telefonico invalido"
          ],
          email: [
            v => !!v || "Este campo es requerido",
            v => /^[a-z0-9\_]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(v) || "Email invalido"
          ],
          address: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          referenceAddress: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          job: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          dwelingType: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          workPhone: [
            v => !!v || "Este campo es requerido",
            v => /^0[2-9]\d{7,8}$/.test(v) || "Número telefonico invalido"
          ],
          parnetName: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          parnetLastname: [
            v => !!v || "Este campo es requerido",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Texto invalido"
          ],
          parnetID: [
            v => !!v || "Este campo es requerido",
            v => /^\d{10}$/.test(v) || "Número de cédula invalido"
          ]
        },
        accountsFormRulesEn: {
          name: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          lastname: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          id: [
            v => !!v || "This field is required",
            v => /^\d{10}$/.test(v) || "Invalid ID"
          ],
          birthPlace: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          birthday: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          civilStatus: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          homePhone: [
            v => !!v || "This field is required",
            v => /^0[2-9]\d{7,8}$/.test(v) || "Invalid phone number"
          ],
          mobile: [
            v => !!v || "This field is required",
            v => /^0[2-9]\d{7,8}$/.test(v) || "Invalid phone number"
          ],
          email: [
            v => !!v || "This field is required",
            v => /^[a-z0-9\_]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(v) || "Invalid ID"
          ],
          address: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          referenceAddress: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          job: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          dwelingType: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          workPhone: [
            v => !!v || "This field is required",
            v => /^0[2-9]\d{7,8}$/.test(v) || "Invalid phone number"
          ],
          parnetName: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          parnetLastname: [
            v => !!v || "This field is required",
            v => /^[a-zA-Z0-9À-ÿñÑ\s\/\-\.\,]+$/.test(v) || "Invalid Text"
          ],
          parnetID: [
            v => !!v || "This field is required",
            v => /^\d{10}$/.test(v) || "Invalid ID"
          ]
        },
        url: `${Settings.serverDomain}/cFormalities.php`,
        snackbar: {
          show: false,
          timeout: 6000,
          text: "Por defecto",
          y: "bottom",
          x: "left"
        },
      };
    },
    components: {
      PageHeader
    },
    methods: {
      sendCreditRequest(){
        if (this.$refs.creditRequestForm.validate()) {
          let data = new FormData();
          data.append('type', '2');
          data.append('nombre', this.creditFormInputs.name);
          data.append('apellido', this.creditFormInputs.lastname);
          data.append('cedula', this.creditFormInputs.id);
          data.append('monto', this.creditFormInputs.amount);
          data.append('cuotas', this.creditFormInputs.fee);
          data.append('fijo', this.creditFormInputs.phone);
          data.append('celular', this.creditFormInputs.mobile);
          data.append('destino', this.creditFormInputs.reason);
          data.append('ocupacion', this.creditFormInputs.occupation);
          data.append('sueldo', this.creditFormInputs.salary);
          data.append('gastos', this.creditFormInputs.debts);
          axios({
            method:'post',
            url: this.url,
            data
          }).then( res => {
            if (res.data.a === '1') {
              let arrayData = [];
              arrayData.push({name: 'nombre', value: this.creditFormInputs.name});
              arrayData.push({name: 'apellido', value: this.creditFormInputs.lastname});
              arrayData.push({name: 'cedula', value: this.creditFormInputs.id});
              arrayData.push({name: 'monto', value: this.creditFormInputs.amount});
              arrayData.push({name: 'cuotas', value: this.creditFormInputs.fee});
              arrayData.push({name: 'fijo', value: this.creditFormInputs.phone});
              arrayData.push({name: 'celular', value: this.creditFormInputs.mobile});
              arrayData.push({name: 'destino', value: this.creditFormInputs.reason});
              arrayData.push({name: 'ocupacion', value: this.creditFormInputs.occupation});
              arrayData.push({name: 'sueldo', value: this.creditFormInputs.salary});
              arrayData.push({name: 'gastos', value: this.creditFormInputs.debts});
  
              let form = document.createElement("form");
              form.setAttribute('method',"post");
              form.setAttribute('action',`${Settings.serverDomain}/solicitudCredito.php`);
              form.setAttribute('target','_blank');
  
              arrayData.forEach( function(item, index) {
                let input = document.createElement("input"); 
                input.setAttribute('type',"text");
                input.setAttribute('name', item.name);
                input.setAttribute('value', item.value);
                form.appendChild(input);
              });
  
              let button = document.createElement("input"); //input element, Submit button
              button.setAttribute('type',"submit");
              button.setAttribute('id',"buttonSubmit");
              button.setAttribute('value',"Submit");
              form.appendChild(button);
              document.getElementsByTagName('body')[0].appendChild(form);
              form.submit();
              location.reload();
            } else {
              this.snackbar.text = this.english ? "An error has occurred and your request could not be sent" : 'Ha ocurrido un error y no se ha podido enviar su solicitud';
              this.snackbar.show = true;
            }
          } )
          .catch( err => console.log(err) )
        } else {
          this.snackbar.text = this.english ? "You have not finished completing the data or there are errors in the information provided" : 'La información suministrada no es la correcta, por favor verifique primero e intente de nuevo';
          this.snackbar.show = true;
        }
      },
      sendAccountOpenRequest(){
        if (this.$refs.accountOpenForm.validate()) {
          let data = new FormData();
          data.append('type', '1');
          data.append('nombre', this.accountsFormInputs.name);
          data.append('apellido', this.accountsFormInputs.lastname);
          data.append('cedula', this.accountsFormInputs.id);
          data.append('lugarNacimiento', this.accountsFormInputs.birthPlace);
          data.append('nacimiento', this.accountsFormInputs.birthday);
          data.append('estadoCivil', this.accountsFormInputs.civilStatus);
          data.append('fijo', this.accountsFormInputs.homePhone);
          data.append('celular', this.accountsFormInputs.mobile);
          data.append('email', this.accountsFormInputs.email);
          data.append('direccion', this.accountsFormInputs.address);
          data.append('referencia', this.accountsFormInputs.referenceAddress);
          data.append('actiEconomica', this.accountsFormInputs.job);
          data.append('numTrabajo', this.accountsFormInputs.workPhone);
          data.append('tipoVivienda', this.accountsFormInputs.dwelingType);
          data.append('nombreConyuge', this.accountsFormInputs.parnetName);
          data.append('apellidoConyuge', this.accountsFormInputs.parnetLastname);
          data.append('cedulaConyuge', this.accountsFormInputs.parnetID);
          axios({
            method:'post',
            url: this.url,
            data
          }).then( res => {
            if (res.data.a === '1') {
              let arrayData = [];
              arrayData.push({name: 'nombre', value: this.accountsFormInputs.name});
              arrayData.push({name: 'apellido', value: this.accountsFormInputs.lastname});
              arrayData.push({name: 'cedula', value: this.accountsFormInputs.id});
              arrayData.push({name: 'lugarNacimiento', value: this.accountsFormInputs.birthPlace});
              arrayData.push({name: 'nacimiento', value: this.accountsFormInputs.birthday});
              arrayData.push({name: 'estadoCivil', value: this.accountsFormInputs.civilStatus});
              arrayData.push({name: 'fijo', value: this.accountsFormInputs.homePhone});
              arrayData.push({name: 'celular', value: this.accountsFormInputs.mobile});
              arrayData.push({name: 'email', value: this.accountsFormInputs.email});
              arrayData.push({name: 'direccion', value: this.accountsFormInputs.address});
              arrayData.push({name: 'referencia', value: this.accountsFormInputs.referenceAddress});
              arrayData.push({name: 'actiEconomica', value: this.accountsFormInputs.job});
              arrayData.push({name: 'numTrabajo', value: this.accountsFormInputs.workPhone});
              arrayData.push({name: 'tipoVivienda', value: this.accountsFormInputs.dwelingType});
              arrayData.push({name: 'nombreConyuge', value: this.accountsFormInputs.parnetName});
              arrayData.push({name: 'apellidoConyuge', value: this.accountsFormInputs.parnetLastname});
              arrayData.push({name: 'cedulaConyuge', value: this.accountsFormInputs.parnetID});
  
              let form = document.createElement("form");
              form.setAttribute('method',"post");
              form.setAttribute('action',`${Settings.serverDomain}/aperturaCuenta.php`);
              form.setAttribute('target','_blank');
  
              arrayData.forEach( function(item, index) {
                let input = document.createElement("input"); 
                input.setAttribute('type',"text");
                input.setAttribute('name', item.name);
                input.setAttribute('value', item.value);
                form.appendChild(input);
              });
  
              let button = document.createElement("input"); 
              button.setAttribute('type',"submit");
              button.setAttribute('id',"buttonSubmit");
              button.setAttribute('value',"Submit");
  
              form.appendChild(button);
  
              document.getElementsByTagName('body')[0].appendChild(form);
  
              form.submit();
              location.reload();
              this.snackbar.text = this.english ? "Your request has been sent correctly" : 'Se ha enviado su solicitud correctamente';
              this.snackbar.show = true;
            } else {
              this.snackbar.text = this.english ? "An error has occurred and your request could not be sent" : 'Ha ocurrido un error y no se ha podido enviar su solicitud';
              this.snackbar.show = true;
            }
          } )
          .catch( err => console.log(err) )
        } else {
          this.snackbar.text = this.english ? "You have not finished completing the data or there are errors in the information provided" : 'La información suministrada no es la correcta, por favor verifique primero e intente de nuevo';
          this.snackbar.show = true;
        }
      },
      uploadFile() {
        var pdrs = document.getElementById("upload-input").files[0].name;
        document.getElementById("upload-info").value = pdrs;
      },
      cleanForm(){
        this.$refs.creditRequestForm.reset();
        this.$refs.accountOpenForm.reset();
      }
    }
  };
</script>