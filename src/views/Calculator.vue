<template>
	<div>

<!-- SNACKBAR -->
    <v-snackbar v-model="snackbar.show" :bottom="true" :multi-line="true" :left="true" :timeout="snackbar.timeout" :vertical="false" color='secondary'>
      {{ snackbar.text }}
      <v-btn color="black" flat @click="snackbar.show = false">
        {{ english ? 'Close' : 'Cerrar'}}
      </v-btn>
    </v-snackbar>
<!-- SNACKBAR -->

<!-- HEADAER -->
    <PageHeader :title="english ? 'Savings and Credit Calculator' : 'Calculadora de Crédito y Ahorro'">
    </PageHeader>
<!-- HEADAER -->


    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md6 offset-md3 v-show="toggleForm">
          <v-tabs centered grow color="primary" dark icons-and-text>
            <v-tabs-slider color="secondary"></v-tabs-slider>
            <v-tab class='font-weight-bold subheading' href="#tab-1">
              {{ english ? 'Savings' : 'Ahorro'}}
              <v-icon>fa fa-hand-holding-usd</v-icon>
            </v-tab>
            <v-tab class='font-weight-bold subheading' href="#tab-2">
              {{ english ? 'Credit' : 'Crédito'}}
              <v-icon>fa fa-calculator</v-icon>
            </v-tab>

<!-- SAVINGS FORM -->
            <v-tab-item :id="'tab-1'">
              <v-card flat>
                <v-card-title primary-title class="px-5">
                    <v-flex xs12>
                      <v-select
                      @change="resetFields"
                      :rules='english ? formSavingsRulesEn.savingType : formSavingsRules.savingType' 
                      v-model="formSavings.type" 
                      :items="formSavings.savingType" 
                      :label="english ? 'Saving Type' : 'Tipo de Ahorro'"></v-select>
                    </v-flex>
                  <v-form ref="savingsForm" style="width: 100%">
                    <v-flex xs12>
                      <v-text-field 
                      v-if="formSavings.type === 3"
                      :rules='english ? formSavingsRulesEn.amountSavingInSight : formSavingsRules.amountSavingInSight' 
                      v-model="formSavings.amount" 
                      :label=" english ? 'Amount' : 'Capital'" required></v-text-field>
                      <v-text-field 
                      v-if="formSavings.type === 2"
                      :rules='english ? formSavingsRulesEn.amount : formSavingsRules.amount' 
                      v-model="formSavings.amount" 
                      :label=" english ? 'Amount' : 'Capital'" required></v-text-field>
                      <v-text-field 
                      v-if="formSavings.type === 1"
                      :rules='english ? formSavingsRulesEn.amountFixedTerm : formSavingsRules.amountFixedTerm' 
                      v-model="formSavings.amount" 
                      :label=" english ? 'Amount' : 'Capital'" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field 
                      v-if="formSavings.type === 2"
                      :rules='english ? formSavingsRulesEn.monthlyValue : formSavingsRules.monthlyValue' 
                      v-model="formSavings.monthlyValue" 
                      :label=" english ? 'Monthly Value' : 'Valor Mensual'" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-dialog
                        v-if="formSavings.type === 2"
                        ref="datepickerDialog"
                        :return-value.sync="date"
                        lazy
                        full-width
                        width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="date"
                          label="Fecha Inicial"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="datepickerModal = false">Cancelar</v-btn>
                          <v-btn flat color="primary" @click="$refs.datepickerDialog.save(date)">Aceptar</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-flex>
                    <v-flex xs12>
                      <v-select 
                      v-if="formSavings.type === 2"
                      :rules='english ? formSavingsRulesEn.debitDay : formSavingsRules.debitDay' 
                      v-model="formSavings.debitDay" 
                      :items="debitDays" 
                      :label=" english ? 'Debit Day' : 'Día de débito'" required></v-select>
                    </v-flex>
                    <v-flex xs12>
                      <v-select 
                        v-if="formSavings.type === 3"
                        :rules='english 
                        ? formSavingsRulesEn.periodType 
                        : formSavingsRules.periodType' 
                        v-model="formSavings.typePeriod" 
                        :items="formSavings.periodType" 
                        :label=" english ? 'Frecuency' : 'Frecuencia'" 
                        required
                      >
                      </v-select>
                    </v-flex>
                    <v-flex xs12>
                    <v-text-field 
                      v-if="formSavings.type === 3"
                      :rules='english ? formSavingsRulesEn.term : formSavingsRules.term' 
                      v-model="formSavings.term" 
                      :label=" english ? 'Time' : 'Plazo'" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                    <v-text-field 
                      v-if="formSavings.type === 2"
                      :rules='english ? formSavingsRulesEn.monthsPeriod : formSavingsRules.monthsPeriod' 
                      v-model="formSavings.monthsPeriod" 
                      :label=" english ? 'Months' : 'Perido en Meses'" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field 
                        v-if="formSavings.type === 1 "
                        :rules='english ? formSavingsRulesEn.months : formSavingsRules.months' 
                        v-model="formSavings.months" 
                        :label="english ? 'Period in days  ' : 'Periodo en Dias'" required>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn class='font-weight-bold' 
                      @click="calculateSavings" 
                      color="secondary" 
                      right
                      >{{ english ? 'Calculate' : 'Calcular'}}</v-btn>
                    </v-flex>
                  </v-form>
                </v-card-title>
              </v-card>
            </v-tab-item>
<!-- SAVINGS FORM -->

<!-- CREDIT FORM -->
            <v-tab-item :id="'tab-2'">
              <v-card flat>
                <v-card-title primary-title class="px-5">
                  <v-form ref="creditForm" style="width: 100%">
                    <v-flex xs12>
                      <v-text-field :rules="english ? formCreditRulesEn.amount : formCreditRules.amount" v-model='formCredit.amount' :label=" english ? 'Amount' : 'Monto a solicitar'" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field :rules="english ? formCreditRulesEn.months : formCreditRules.months" v-model='formCredit.months' :label="english ? 'Term in months' : 'Plazo en meses'" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-select :rules="english ? formCreditRulesEn.payment : formCreditRules.payment" v-model='formCredit.payment' :items="formCredit.frecuenciaPago" :label=" english ? 'Frecuency of payment' : 'Frecuencia de Pago'"></v-select>
                    </v-flex>
                    <v-flex xs12>
                      <v-select :rules="english ? formCreditRulesEn.credit : formCreditRules.credit" v-model='formCredit.credit' :items="formCredit.tipo" item-text="descripcion" item-value="id" :label=" english ? 'Type of credit' : 'Tipo de Crédito' "></v-select>
                    </v-flex>
                    <v-flex xs12>
                      <v-radio-group v-model="radios" row>
                        <v-radio :label="english ? 'Fixed quota (French)' : 'Cuota Fija (Francés)'" value="0"></v-radio>
                        <v-radio :label="english ? 'Decreasing Fee (German)' : 'Cuota Decreciente (Alemán)'" value="1"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn class='font-weight-bold' @click="calculateCredit" color="secondary" right>{{ english ? 'Calculate' : 'Calcular'}}</v-btn>
                    </v-flex>
                  </v-form>
                </v-card-title>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
<!-- CREDIT FORM -->

<!-- Credit Results -->
        <v-flex xs12 md8 offset-md2 v-show="toggleCreditTable">
          <v-tabs color="primary" dark grow>
            <v-tabs-slider color="secondary"></v-tabs-slider>
            <v-btn @click="closeResults" flat icon>
              <v-icon>fa fa-arrow-left</v-icon>
						</v-btn>
            <h4 class="title white--text py-3 px-4"> {{english ? 'Credit Results' : 'Resultado Crédito'}} </h4>
						<v-tab href="#tab-1">
							<v-icon>fa fa-file-invoice-dollar</v-icon> &nbsp;
							{{ english ? 'Query' : 'Consulta'}}
						</v-tab>
						<v-tab href="#tab-2">
							<v-icon>fa fa-file-alt</v-icon> &nbsp;
							{{ english ? 'Fee' : 'Coutas'}}
						</v-tab>
						<v-tab-item :id="'tab-1'">
							<v-data-table :headers=" english ? headersConsultEn : headersConsult" :items="consultFieldsCredit[0]" hide-actions class="elevation-1">
								<template slot="items" slot-scope="props">
									<td class="text-xs-center">{{ english ? props.item.conceptoEn : props.item.concepto }}</td>
									<td class="text-xs-center">{{ props.item.valor }}</td>
									<td class="text-xs-center">{{ english ? props.item.definicionEn : props.item.definicion }}</td>
								</template>
							</v-data-table>
						</v-tab-item>
						<v-tab-item :id="'tab-2'">
							<v-data-table v-if='results.length > 0' :headers="english ? headersFeeEn : headersFee" :items="results" hide-actions class="elevation-1">
								<template slot="items" slot-scope="props">
									<tr>
										<td class="text-xs-center">{{ props.item.numero }}</td>
										<td class="text-xs-center">{{ props.item.capital }}</td>
										<td class="text-xs-center">{{ props.item.interes }}</td>
										<td class="text-xs-center">{{ props.item.seguro }}</td>
										<td class="text-xs-center">{{ props.item.cuota }}</td>
										<td class="text-xs-center">{{ props.item.saldo }}</td>
									</tr>
								</template>
							</v-data-table>
						</v-tab-item>
					</v-tabs>
				</v-flex>
<!-- Credit Results -->

<!-- Savings Results -->
				<v-flex xs12 md8 offset-md2 v-show="toggleSavingsTable">
					<v-tabs color="primary" dark grow>
						<v-tabs-slider color="secondary"></v-tabs-slider>
						<v-btn @click="closeResults" flat icon>
							<v-icon>fa fa-arrow-left</v-icon>
						</v-btn>
            <h4 class="title white--text py-3 px-4"> {{english ? 'Fixed Term Results' : 'Resultado Plazo Fijo'}} </h4>
						<v-tab href="#tab-1">
							<v-icon>fa fa-file-invoice-dollar</v-icon> &nbsp;
							{{ english ? 'Query' : 'Consulta'}}
						</v-tab>
						<v-tab-item :id="'tab-1'">
							<v-data-table v-if='savingsResults.length > 0' :headers=" english ? savingsHeaderEn : savingsHeader" :items="savingsResults" hide-actions class="elevation-1">
								<template slot="items" slot-scope="props">
									<tr>
										<td class="text-xs-center">$ {{ props.item.valorInvertir }}</td>
										<td class="text-xs-center">{{ props.item.tiempo }}</td>
										<td class="text-xs-center">{{ props.item.tasa }}</td>
										<td class="text-xs-center">$ {{ props.item.valor }}</td>
									</tr>
								</template>
							</v-data-table>
						</v-tab-item>
					</v-tabs>
				</v-flex>
<!-- Savings Results -->

<!-- Programmed Savings Results -->
				<v-flex xs12 md8 offset-md2 v-show="toggleProgrammedSavingsTable">
					<v-tabs color="primary" dark grow>
						<v-tabs-slider color="secondary"></v-tabs-slider>
						<v-btn @click="closeResults" flat icon>
							<v-icon>fa fa-arrow-left</v-icon>
						</v-btn>
            <h4 class="title white--text py-3 px-4"> {{ english ? 'Programmed Saving Results' : 'Resultado Ahorro Programado'}} </h4>
						<v-tab href="#tab-1">
							<v-icon>fa fa-file-invoice-dollar</v-icon> &nbsp;
							Consulta
						</v-tab>
						<v-tab-item :id="'tab-1'">
							<v-data-table v-if='programmedSavingsResults.length > 0' :headers="english ? programmedSavingsHeaderEn : programmedSavingsHeader" :items="programmedSavingsResults" hide-actions class="elevation-1">
								<template slot="items" slot-scope="props">
									<tr>
										<td class="text-xs-center">N° {{ props.item.nCuota }}</td>
										<td class="text-xs-center">{{ props.item.fDebito }}</td>
										<td class="text-xs-center">{{ props.item.fAcreditacion }}</td>
										<td class="text-xs-center">$ {{ props.item.capital }}</td>
										<td class="text-xs-center">$ {{ props.item.intGanado }}</td>
										<td class="text-xs-center">$ {{ props.item.capMasInt }}</td>
									</tr>
								</template>
							</v-data-table>
						</v-tab-item>
					</v-tabs>
				</v-flex>
<!-- Programmed Savings Results -->

<!-- In Sight Savings Results -->
				<v-flex xs12 md8 offset-md2 v-show="toggleSavingsInSightTable">
					<v-tabs color="primary" dark grow>
						<v-tabs-slider color="secondary"></v-tabs-slider>
						<v-btn @click="closeResults" flat icon>
							<v-icon>fa fa-arrow-left</v-icon>
						</v-btn>
            <h4 class="title white--text py-3 px-4"> {{ english ? 'Savings in Sight Results' : 'Resultado Ahorro a la Vista'}} </h4>
						<v-tab href="#tab-1">
							<v-icon>fa fa-file-invoice-dollar</v-icon> &nbsp;
							Consulta
						</v-tab>
						<v-tab-item :id="'tab-1'">
							<v-data-table v-if='savingsInSightResults.length > 0' :headers="english ? savingInSightHeaderEn : savingInSightHeader" :items="savingsInSightResults" hide-actions class="elevation-1">
								<template slot="items" slot-scope="props">
									<tr>
										<td class="text-xs-center">{{ '$ ' + props.item.interes }}</td>
										<td class="text-xs-center">{{ '$ ' + (parseInt(props.item.interes) + parseInt(props.item.monto)).toFixed(2) }}</td>
									</tr>
								</template>
							</v-data-table>
						</v-tab-item>
					</v-tabs>
				</v-flex>
<!-- In Sight Savings Results -->

			</v-layout>
		</v-container>
	</div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import Calculator from "@/data/Calculator.js";
import Settings from "@/data/Settings.js";
import axios from "axios";

export default {
  data() {
    return {
      english: sessionStorage.english === 'true',
      toggleCreditTable: false,
      toggleSavingsTable: false,
      toggleProgrammedSavingsTable: false,
      toggleSavingsInSightTable: false,
      toggleForm: true,
      radios: "0",
      date: new Date().toISOString().substr(0, 10),
      datepickerModal: false,
      headersConsultEn: [
        { text: "Concept", align: "center", sortable: false, value: "concepto" },
        { text: "Value", align: "center", sortable: false, value: "valor" },
        { text: "Definition", align: "center", sortable: false, value: "definicion" }
      ],
      headersConsult: [
        { text: "Concepto", align: "center", sortable: false, value: "concepto" },
        { text: "Valor", align: "center", sortable: false, value: "valor" },
        { text: "Definición del término", align: "center", sortable: false, value: "definicion" }
      ],
      headersFeeEn: [
        { text: "Number", align: "center", sortable: false, value: "periodo", width: "10%" },
        { text: "Amount", align: "center", sortable: false, value: "cuota", width: "30%" },
        { text: "Rate", align: "center", sortable: false, value: "interes", width: "30%" },
        { text: "Insurance Value", align: "center", sortable: false, value: "interes", width: "30%" },
        { text: "Fee",align: "center",sortable: false,value: "amortización" },
        { text: "Balance", align: "center", sortable: false, value: "saldo" }
      ],
      headersFee: [
        { text: "Número", align: "center", sortable: false, value: "periodo", width: "10%" },
        { text: "Capital", align: "center", sortable: false, value: "cuota", width: "30%" },
        { text: "Interes", align: "center", sortable: false, value: "interes", width: "30%" },
        { text: "Seguro", align: "center", sortable: false, value: "interes", width: "30%" },
        { text: "Cuota", align: "center", sortable: false, value: "amortización" },
        { text: "Saldo", align: "center", sortable: false, value: "saldo" }
      ],
      savingsHeaderConsult: [
        { text: "Concepto", align: "center", sortable: false, value: "concepto" },
        { text: "Valor", align: "center", sortable: false, value: "valor" },
        { text: "Definición del término", align: "center", sortable: false, value: "definicion" }
      ],
      savingsHeader: [
        { text: "Valor a Invertir", align: "center", sortable: false, value: "periodo", width: "10%" },
        { text: "Tiempo", align: "center", sortable: false, value: "cuota", width: "30%" },
        { text: "Tasa", align: "center", sortable: false, value: "interes", width: "30%" },
        { text: "Valor a recibir", align: "center", sortable: false, value: "interes", width: "30%" }
      ],
      savingsHeaderEn: [
        { text: "Amount", align: "center", sortable: false, value: "periodo", width: "10%" },
        { text: "Period", align: "center", sortable: false, value: "cuota", width: "30%" },
        { text: "Taxes", align: "center", sortable: false, value: "interes", width: "30%" },
        { text: "Amount to recieve", align: "center", sortable: false, value: "interes", width: "30%" }
      ],
      programmedSavingsHeaderConsult: [
        { text: "Concepto",align: "center",sortable: false,value: "concepto" },
        { text: "Valor", align: "center", sortable: false, value: "valor" },
        { text: "Definición del término", align: "center", sortable: false, value: "definicion" }
      ],
      programmedSavingsHeaderConsultEn: [
        { text: "Concept", align: "center", sortable: false, value: "concepto" },
        { text: "Value", align: "center", sortable: false, value: "valor" },
        { text: "Definition", align: "center", sortable: false, value: "definicion" }
      ],
      programmedSavingsHeaderEn: [
        { text: "Quota", align: "center", sortable: false, value: "nCuota", width: "10%" },
        { text: "Debit Day", align: "center", sortable: false, value: "fDebito", width: "30%" },
        { text: "Accreditation Day", align: "center", sortable: false, value: "fAcreditacion", width: "30%" },
        { text: "Capital", align: "center", sortable: false, value: "capital", width: "30%" },
        { text: "Earned Interest", align: "center", sortable: false, value: "intGanado", width: "30%" },
        { text: "Capital + Interest", align: "center", sortable: false, value: "capMasInt", width: "30%" }
      ],
      programmedSavingsHeader: [
        { text: "Cuota", align: "center", sortable: false, value: "nCuota", width: "10%"},
        { text: "Fecha Débito", align: "center", sortable: false, value: "fDebito", width: "30%"},
        { text: "Fecha Acreditación", align: "center", sortable: false, value: "fAcreditacion", width: "30%"},
        { text: "Capital", align: "center", sortable: false, value: "capital", width: "30%"},
        { text: "Interes Ganado", align: "center", sortable: false, value: "intGanado", width: "30%"},
        { text: "Capital + Interes", align: "center", sortable: false, value: "capMasInt", width: "30%" }
      ],
      savingInSightHeaderEn: [
        { text: "Interest", align: "center", value: "nCuota", width: "50%" },
        { text: "Total", align: "center", value: "fDebito", width: "50%" },
      ],
      savingInSightHeader: [
        { text: "Interes", align: "center", value: "nCuota", width: "50%"},
        { text: "Total", align: "center", value: "fDebito", width: "50%"},
      ],
      url: `${Settings.serverDomain}/cViews.php`,
      url2: `${Settings.serverDomain}/cTasas.php`,
      savingsResults: [],
      programmedSavingsResults: [],
      savingsInSightResults: [],
      results: [],
      consultFieldsCredit: [Calculator],
      formCredit: {
        amount: "",
        months: "",
        payment: "",
        credit: "",
        tipo: [],
        frecuenciaPago: ["Mensual"]
      },
      formCreditRules: {
        amount: [
					v => !!v || "El campo es requerido",
					v => /^[0-9\.]+$/.test(v) || "Solo puede contener números"
				],
        months: [
					v => !!v || "El campo es requerido",
					v => /^[0-9\.]+$/.test(v) || "Solo puede contener números"
				],
        payment: [
					v => !!v || "El campo es requerido",
				],
        credit: [
					v => !!v || "El campo es requerido",
				],
      },
      formCreditRulesEn: {
        amount: [
					v => !!v || "This field is required",
					v => /^[0-9\.]+$/.test(v) || "This field only can contain numbers"
				],
        months: [
					v => !!v || "This field is required",
					v => /^[0-9\.]+$/.test(v) || "This field only can contain numbers"
				],
        payment: [
					v => !!v || "This field is required",
				],
        credit: [
					v => !!v || "This field is required",
				],
      },
      formSavingsRules: {
        amount: [
					v => !!v || "El campo es requerido",
					v => /^[0-9\.]+$/.test(v) || "Solo puede contener números",
					v => parseInt(v) >= 20 || "El monto mínimo debe ser $20",
				],
        amountSavingInSight: [
					v => !!v || "El campo es requerido",
					v => /^[0-9\.]+$/.test(v) || "Solo puede contener números",
					v => parseInt(v) >= 20 || "El monto mínimo debe ser $20",
				],
        amountFixedTerm: [
          v => !!v || "El campo es requerido",
					v => /^[0-9\.]+$/.test(v) || "Solo puede contener números",
					v => parseInt(v) >= 200 || "El monto mínimo debe ser $200",
				],
        months: [
          v => !!v || "El campo es requerido",
					v => /^[0-9\.]+$/.test(v) || "Solo puede contener números",
					v => parseInt(v) >= 31 || "La cantidad mínima permitida de dias son 31",
				],
        term: [
          v => !!v || "El campo es requerido",
					v => /^[0-9\.]+$/.test(v) || "Solo puede contener números",
				],
        savingType: [
          v => !!v || "El campo es requerido",
        ],
        periodType: [
          v => !!v || "El campo es requerido",
        ],
        monthlyValue: [
          v => !!v || "El campo es requerido",
					v => /^[0-9\.]+$/.test(v) || "Solo puede contener números",
					v => parseInt(v) >= 10 || "El monto mínimo debe ser $10",
        ],
        initialDate: [
          v => !!v || "El campo es requerido",
        ],
        debitDay: [
          v => !!v || "El campo es requerido",
        ],
        monthsPeriod: [
          v => !!v || "El campo es requerido",
					v => /^[0-9\.]+$/.test(v) || "Solo puede contener números",
        ],
      },
      formSavingsRulesEn: {
        amount: [
          v => !!v || "This field is required",
					v => /^[0-9\.]+$/.test(v) || "This field only can contain numbers",
					v => parseInt(v) >= 20 || "Min amount allowed is $20",
				],
        amountFixedTerm: [
          v => !!v || "El campo es requerido",
					v => /^[0-9\.]+$/.test(v) || "Solo puede contener números",
					v => parseInt(v) >= 200 || "Min amount allowed is $200",
				],
        months: [
          v => !!v || "This field is required",
					v => /^[0-9\.]+$/.test(v) || "This field only can contain numbers",
					v => parseInt(v) >= 31 || "Min number of day allowed is 31 ",
				],
        term: [
          v => !!v || "This field is required",
					v => /^[0-9\.]+$/.test(v) || "This field only can contain numbers",
				],
        savingType: [
          v => !!v || "This field is required",
        ],
        periodType: [
          v => !!v || "This field is required",
        ],
        monthlyValue: [
          v => !!v || "This field is required",
					v => parseInt(v) >= 10 || "Min amount allowed is $20",
					v => /^[0-9\.]+$/.test(v) || "This field only can contain numbers",
        ],
        initialDate: [
          v => !!v || "This field is required",
        ],
        debitDay: [
          v => !!v || "This field is required",
        ],
        monthsPeriod: [
          v => !!v || "This field is required",
					v => /^[0-9\.]+$/.test(v) || "This field only can contain numbers",
        ],
      },
      formSavings: {
        amount: "",
        type: "",
        months: "",
        typePeriod: '',
        term: "",
        monthlyValue: '',
        initialDate: '',
        debitDay: '',
        monthsPeriod: '',
        periodType: [
          { text: "Días", value: 1 },
          { text: "Meses", value: 2 },
          { text: "Años", value: 3 },
        ],
        savingType: [
          { text: "Plazo Fijo", value: 1 },
          { text: "Ahorro a la Vista", value: 3 },
        ]
      },
      debitDays: [
        1, 2, 3, 4, 5, 6, 7, 8, 9 ,10,
        11, 12, 13, 14, 15, 16, 17, 18, 19 ,20,
        21, 22, 23, 24, 25, 26, 27
      ],
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
  created() {
    this.getRates();
  },
  methods: {
    getRates(){
      	let data = new FormData();
        data.append("type", "15");
        axios({
          method: "post",
          url: this.url,
          data: data
        })
        .then( res => {
          this.formCredit.tipo = res.data;
        })
        .catch( err => console.log(err) );
    },
    calculateCredit() {
			if (this.$refs.creditForm.validate()) {
				let data = new FormData();
				data.append("type", "11");
				data.append("monto", this.formCredit.amount);
				data.append("meses", this.formCredit.months);
				data.append("credito", this.formCredit.credit);
				data.append("tipo", this.radios);
				axios({
					method: "post",
					url: this.url,
					data: data
				}).then(res => {
          if (res.data.a) {
            const { montoInicial, montoFinal, tiempoFinal, tiempoInicial } = res.data.b;
            switch (res.data.a) {
              case '2':
                this.snackbar.text = this.english 
                ? "" 
                : `Para montos entre ${montoInicial} y ${montoFinal} el periodo de pago debe estar entre ${tiempoInicial} y ${tiempoFinal} meses.`;
                this.snackbar.show = true;
                break;
              case '3':
                this.snackbar.text = this.english 
                ? "" 
                : `El monto debe estar comprendido entre ${montoInicial} y ${montoFinal} y el periodo de pago debe estar entre ${tiempoInicial} y ${tiempoFinal} meses.`;
                this.snackbar.show = true;
                break;
              default:
                break;
            }
          } else {
            const { data, informacion } = res.data;
            this.results = data;
            Calculator[0].valor = informacion[0].montoFinanciado;
            Calculator[1].valor = informacion[0].montoLiquidado;
            Calculator[2].valor = informacion[0].interes;
            Calculator[3].valor = informacion[0].seguro;
            Calculator[4].valor = informacion[0].totalFinanciera;
            Calculator[5].valor = informacion[0].totalCuotas;
            Calculator[6].valor = informacion[0].tasaInteres;
            Calculator[7].valor = informacion[0].tasaEfectiva;
            this.toggleCreditTable = !this.toggleCreditTable;
            this.toggleForm = !this.toggleForm;
          }
				});
			} else {
				this.snackbar.text = this.english ? "You have not finished completing the data or there are errors in the information provided" : "No ha terminado de completar los datos o hay errores en la información suministrada";
				this.snackbar.show = true;
			}
    },
    calculateSavings() {
			if (this.$refs.savingsForm.validate()) {
        let data = new FormData();
        switch (this.formSavings.type) {
          case 1:
            data.append("type", "12");
            data.append("monto", this.formSavings.amount);
            data.append("interval", this.formSavings.months);
            break;
          case 2:
            data.append("type", "14");
            data.append("monto", this.formSavings.amount);
            data.append("meses", this.formSavings.monthsPeriod);
            data.append("valorMensual", this.formSavings.monthlyValue);
            data.append("fechaInicial", this.date);
            data.append("diaDebitar", this.formSavings.debitDay);
            break;
          case 3:
            data.append("type", "19");
            data.append("monto", this.formSavings.amount);
            data.append("tipoTiempo", this.formSavings.typePeriod);
            data.append("tiempo", this.formSavings.term);
            break;
          default:
            break;
        }
				axios({
					method: "post",
					url: this.url,
					data: data
				}).then(res => {
          console.log(res.data);
          
          switch (this.formSavings.type) {
            case 1:
              this.savingsResults = res.data;
              this.toggleSavingsTable = !this.toggleSavingsTable;
              this.toggleForm = !this.toggleForm;
              break;
            case 2:
              this.programmedSavingsResults = res.data;
              this.toggleProgrammedSavingsTable = !this.toggleProgrammedSavingsTable;
              this.toggleForm = !this.toggleForm;
              break;
            case 3:
              this.savingsInSightResults = [res.data];
              console.log(this.savingsInSightResults);
              this.toggleSavingsInSightTable = !this.toggleSavingsInSightTable;
              this.toggleForm = !this.toggleForm;
              break;
          
            default:
              break;
          }
				});
			} else {
				this.snackbar.text = this.english ? "You have not finished completing the data or there are errors in the information provided" : "No ha terminado de completar los datos o hay errores en la informacion suministrada";
				this.snackbar.show = true;
			}
    },
    closeResults() {
      this.toggleForm = !this.toggleForm;
      if ((this.toggleSavingsTable = true)) {
        this.toggleSavingsTable = false;
      }
      if ((this.toggleCreditTable = true)) {
        this.toggleCreditTable = false;
      }
      if ((this.toggleProgrammedSavingsTable = true)) {
        this.toggleProgrammedSavingsTable = false;
      }
      if ((this.toggleSavingsInSightTable = true)) {
        this.toggleSavingsInSightTable = false;
      }
    },
    resetFields(){
      this.$refs.savingsForm.reset();
      // this.formSavings.amount = '';
      // this.formSavings.monthlyValue = '';
      // this.date = '';
      // this.formSavings.debitDay = '';
      // this.formSavings.monthsPeriod = '';
      // this.formSavings.months = '';
    },
  }
};
</script>

<style>
.v-tabs__item{
  position: unset !important;
}
.v-tabs__slider {
    height: 5px !important;
    z-index: 399999;
}
.v-tabs__item--active{
  background-color: var(--color-primary-tab-active) !important;
}
</style>
