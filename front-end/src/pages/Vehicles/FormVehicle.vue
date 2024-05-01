<template>
  <form @submit="computedSubmit">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">{{ textForm }}</h4>
      </md-card-header>
      <md-card-content>
        <div v-if="loading" class="md-layout md-gutter md-alignment-top-center">
          <progress-spinner class="md-alignment-top-center"></progress-spinner>
        </div>
        <!-- <div
          v-else-if="clientsError"
          class="md-layout md-gutter md-alignment-center"
        >
          <div class="flex-column">
            <span class="md-display-1"
              >Não há proprietários de veículos cadastrados</span
            >
            <span class="md-subheading"
              >Cadastre um proprietário clicando no botão abaixo</span
            >
            <md-button
              class="md-raised md-success"
              type="submit"
              :to="{ name: 'Adicionar clientes' }"
              >Cadastrar cliente</md-button
            >
          </div>
        </div> -->
        <template v-else>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Emplacamento</label>
                <md-input
                  v-model="form.licensePlate"
                  type="text"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <!-- Setar esse funcionamento para pegar o id -->
              <md-field :class="{ 'md-invalid': cpfError }">
                <label>CPF/CNPJ do cliente vinculado</label>
                <md-input
                  v-model="form.client.documentNumber"
                  v-mask="documentNumberMask"
                  required
                ></md-input>
                <span class="md-error">Valor inválido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Nome do cliente vinculado</label>
                <md-input
                  v-if="clients"
                  v-model="form.client.fullname"
                  type="text"
                  required
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="type">Tipo de veículo</label>
                <md-select if="type" v-model="form.type" name="type" required>
                  <md-option
                    v-for="(type, index) in vehicleType"
                    :key="index"
                    :value="type.value"
                    >{{ type.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-autocomplete
                :class="{ 'md-invalid': brandError }"
                v-model="form.brand"
                :md-options="toSetCleanList(brandList)"
                required
                :disabled="brandList.length === 0"
              >
                <label>Marca</label>
                <span class="md-error">Erro ao encontrar marca</span>
              </md-autocomplete>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-autocomplete
                :class="{ 'md-invalid': modelError }"
                v-model="form.model"
                :md-options="toSetCleanList(modelsList)"
                :disabled="!form.brand"
                required
              >
                <label>Modelo</label>
                <span class="md-error">Erro ao encontrar modelo</span>
              </md-autocomplete>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-autocomplete
                :class="{ 'md-invalid': yearError }"
                v-model="form.yearModel"
                :md-options="toSetCleanList(yearsList)"
                :disabled="!form.model"
                required
              >
                <label>Ano do modelo</label>
                <span class="md-error">Erro ao encontrar ano do modelo</span>
              </md-autocomplete>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Ano de Fabricação</label>
                <md-input
                  v-model="form.yearManufacture"
                  type="number"
                  min="1900"
                  max="2030"
                  v-mask="'####'"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Cor do veículo</label>
                <md-input v-model="form.color" type="text" required></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field :class="{ 'md-invalid': valueError }">
                <label>Valor do veículo</label>
                <md-input v-model="form.value" required></md-input>
                <span class="md-error">Erro ao encontrar valor do veículo</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="fuel">Tipo de combustível</label>
                <md-select id="fuel" v-model="form.fuel" required>
                  <md-option
                    v-for="(fuel, index) in fuelType"
                    :key="index"
                    :value="fuel.value"
                    >{{ fuel.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Quilometragem</label>
                <md-input v-model="form.odometer" type="number"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Renavam</label>
                <md-input
                  v-model="form.renavam"
                  type="number"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Chassi</label>
                <md-input v-model="form.chassi" type="text" required></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Cilindradas</label>
                <md-input
                  v-model="form.engineCapacity"
                  type="number"
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="tracker">Rastreador</label>
                <md-select v-model="form.tracker" name="tracker" required>
                  <md-option
                    v-for="(type, index) in selectOptionsComputed"
                    :key="index"
                    :value="type.value"
                    >{{ type.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="trailer">Reboque</label>
                <md-select v-model="form.trailer" name="trailer" required>
                  <md-option
                    v-for="(type, index) in selectOptionsComputed"
                    :key="index"
                    :value="type.value"
                    >{{ type.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="type">Alienação</label>
                <md-select
                  if="type"
                  v-model="form.alieneted"
                  name="type"
                  required
                >
                  <md-option
                    v-for="(type, index) in selectOptionsComputed"
                    :key="index"
                    :value="type.value"
                    >{{ type.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100">
              <md-autocomplete
                v-model="form.bank"
                :md-options="bankList"
                :required="form.alieneted"
                :disabled="!form.alieneted"
              >
                <label>Banco</label>
              </md-autocomplete>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Valor financiado</label>
                <md-input
                  v-money="money"
                  v-model="form.financedAmount"
                  :required="form.alieneted"
                  :disabled="!form.alieneted"
                ></md-input>
              </md-field>
            </div>
          </div>
          <!-- <div class="md-layout md-gutter md-alignment-center px-2">
            <md-field>
              <label>Condições do veículo</label>
            </md-field>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="detend-tank">Tanque amassado</label>
                <md-select
                  v-model="form.vehicleConditions.dentedTank"
                  name="detend-tank"
                  required
                >
                  <md-option
                    v-for="(type, index) in selectOptionsComputed"
                    :key="index"
                    :value="type.value"
                    >{{ type.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="broken-escape">Escape avariado</label>
                <md-select
                  v-model="form.vehicleConditions.brokenExhaust"
                  name="broken-escape"
                  required
                >
                  <md-option
                    v-for="(type, index) in selectOptionsComputed"
                    :key="index"
                    :value="type.value"
                    >{{ type.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="good-state">Bom estado</label>
                <md-select
                  v-model="form.vehicleConditions.goodCondition"
                  name="good-state"
                  required
                >
                  <md-option
                    v-for="(type, index) in selectOptionsComputed"
                    :key="index"
                    :value="type.value"
                    >{{ type.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="damaged-headlights"
                  >Faróis queimados ou quebrados</label
                >
                <md-select
                  v-model="form.vehicleConditions.damagedHeadlights"
                  name="damaged-headlights"
                  required
                >
                  <md-option
                    v-for="(type, index) in selectOptionsComputed"
                    :key="index"
                    :value="type.value"
                    >{{ type.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="damaged-taillights"
                  >Lanternas queimados ou quebrados</label
                >
                <md-select
                  v-model="form.vehicleConditions.damagedTaillights"
                  name="damaged-taillights"
                  required
                >
                  <md-option
                    v-for="(type, index) in selectOptionsComputed"
                    :key="index"
                    :value="type.value"
                    >{{ type.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </div> -->
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <!-- Setar esse funcionamento para pegar o id -->
              <md-field :class="{ 'md-invalid': ownerDocumentError }">
                <label>Documento do proprietário (opcional)</label>
                <md-input
                  v-model="form.documentNumberOwner"
                  v-mask="documentNumberMask"
                ></md-input>
                <span class="md-error">Valor inválido</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Nome do proprietário (opcional)</label>
                <md-input v-model="form.vehicleOwner" type="text"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label
                  ><strong
                    >Dados Gerais (Campo livre para incluir informações
                    genéricas sobre o veículo)</strong
                  ></label
                >
                <md-textarea v-model="form.observations"></md-textarea>
                <span class="md-helper-text"
                  >Digite no campo algumas observações relacionadas ao
                  veículo!</span
                >
              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <div>
              <md-switch v-model="form.isSecondDriver"
                >Segundo condutor?</md-switch
              >
            </div>
          </div>
          <template v-if="form.isSecondDriver">
            <div class="md-layout md-gutter md-alignment-center">
              <div class="md-layout-item md-size-33 md-small-size-100">
                <md-field :class="{ 'md-invalid': secondDriverCpfError }">
                  <label>CPF/CNPJ do segundo condutor</label>
                  <md-input
                    v-mask="'###.###.###-##'"
                    v-model="form.secondDriver.documentNumber"
                    type="text"
                    required
                  ></md-input>
                  <span class="md-error">Valor inválido</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33 md-small-size-100">
                <md-field>
                  <label>Nome completo do segundo condutor</label>
                  <md-input
                    v-model="form.secondDriver.fullname"
                    type="text"
                    required
                  ></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33 md-small-size-100">
                <md-field>
                  <label>Código CNH</label>
                  <md-input
                    v-mask="'###########'"
                    v-model="form.secondDriver.licenseDocument.licenseNumber"
                    type="number"
                    required
                  ></md-input>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter md-alignment-center">
              <div
                class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100"
              >
                <md-field>
                  <label for="license-category">Categoria CNH</label>
                  <md-select
                    id="license-category"
                    v-model="form.secondDriver.licenseDocument.licenseCategory"
                    required
                  >
                    <md-option
                      v-for="(category, index) in cnhCategory.CNH"
                      :key="index"
                      :value="category.category"
                      >{{ category.category }}</md-option
                    >
                  </md-select>
                </md-field>
              </div>
              <div
                class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100"
              >
                <md-field>
                  <label>Data de Nascimento</label>
                  <md-input
                    v-mask="'##/##/####'"
                    v-model="form.secondDriver.birthDate"
                    required
                  ></md-input>
                </md-field>
              </div>
              <div
                class="md-layout-item md-medium-size-33 md-small-size-100 md-xsmall-size-100"
              >
                <md-field>
                  <label>Observações</label>
                  <md-textarea
                    v-model="form.secondDriver.observations"
                  ></md-textarea>
                  <span class="md-helper-text"
                    >Digite no campo algumas observações relacionadas ao segundo
                    condutor!</span
                  >
                </md-field>
              </div>
            </div>
          </template>
          <div class="md-layout-item md-size-100 text-right flex-between">
            <md-button
              v-if="isEdit"
              v-low-user="loggedUser"
              class="md-raised md-warning"
              @click="deleteVehicle"
              >Deletar veículo <md-icon>delete</md-icon></md-button
            >
            <md-button
              class="md-raised md-success"
              type="submit"
              :disabled="dontSubmit"
              >{{ textForm }}</md-button
            >
          </div>
        </template>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import validations from "@/helpers/validations.js";
import { mapActions, mapGetters } from "vuex";
import { ProgressSpinner } from "@/components";

export default {
  components: {
    ProgressSpinner,
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: "blue",
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    vehicleId: null,
  },
  data() {
    return {
      form: {
        // vehicleConditions: {},
        secondDriver: {
          documentNumber: null,
          fullname: null,
          kinship: null,
          licenseDocument: {
            licenseNumber: null,
            licenseCategory: null,
          },
          birthDate: null,
          observations: null,
        },
        client: {
          documentNumber: null,
          fullname: null,
        },
        isSecondDriver: false,
      },
      clientName: null,
      hasError: {
        origin: null,
        error: false,
      },
      loading: false,
      brandList: [],
      modelsList: [],
      yearsList: [],
      yearListWithCode: [],
      clientList: [],
      bankList: [],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false /* doesn't work with directive */,
      },
    };
  },
  computed: {
    ...mapGetters("clients", ["clients"]),
    ...mapGetters("banks", ["banks"]),
    ...mapGetters("vehicles", {
      vehicle: "vehicleById",
      genericError: "error",
    }),
    textForm() {
      if (this.isEdit) {
        return "Editar veículo";
      }
      return "Cadastrar veículo";
    },
    computedSubmit() {
      if (this.isEdit) {
        return this.submitEdit;
      }
      return this.submitCreate;
    },
    clientsError() {
      return this.hasError.origin === "clients" && this.hasError.error;
    },
    vehicleType() {
      return [
        { name: "Carro", value: "cars" },
        { name: "Moto", value: "motorcycles" },
        { name: "Caminhão", value: "trucks" },
        { name: "Outros", value: "OTHERS" },
      ];
    },
    selectOptionsComputed() {
      return [
        { name: "Sim", value: true },
        { name: "Não", value: false },
      ];
    },
    fuelType() {
      return [
        { name: "Gasolina", value: "GASOLINE" },
        { name: "Diesel", value: "DIESEL" },
        { name: "Etanol", value: "ETANOL" },
        { name: "Elétrico", value: "ELETRIC" },
        { name: "Flex", value: "FLEX" },
        { name: "Híbrido, elétrico e gasolina", value: "HYBRID" },
        { name: "GNV", value: "GNV" },
        { name: "Misto, gasolina e GNV", value: "HYBRID_GNV" },
        { name: "Outros", value: "OTHER" },
      ];
    },
    cnhCategory() {
      return {
        CNH: [
          { category: "A" },
          { category: "B" },
          { category: "C" },
          { category: "D" },
          { category: "E" },
          { category: "AB" },
          { category: "AC" },
          { category: "AD" },
          { category: "AE" },
          { category: "ACC" },
        ],
      };
    },

    brandError() {
      return this.hasError.origin === "brands" && this.hasError.error;
    },
    modelError() {
      return this.hasError.origin === "models" && this.hasError.error;
    },
    yearError() {
      return this.hasError.origin === "years" && this.hasError.error;
    },
    valueError() {
      return this.hasError.origin === "value" && this.hasError.error;
    },
    cpfError() {
      return (
        (this.hasError.origin === "cpf" || this.hasError.origin === "cnpj") &&
        this.hasError.error
      );
    },
    secondDriverCpfError() {
      return (
        (this.hasError.origin === "secondDriverCpf" ||
          this.hasError.origin === "secondDriverCnpj") &&
        this.hasError.error
      );
    },
    ownerDocumentError() {
      return (
        (this.hasError.origin === "ownerCpf" ||
          this.hasError.origin === "ownerCnpj") &&
        this.hasError.error
      );
    },
    documentNumberMask() {
      if (this.form.documentNumber && this.form.documentNumber.length > 14) {
        return "##.###.###/####-##";
      }
      return "###.###.###-##";
    },
    dontSubmit() {
      return this.hasError.error;
    },
  },
  async created() {
    if (this.isEdit) {
      this.loading = true;
      return await Promise.all([
        this.getClients(),
        this.getBanks(),
        this.getVehicleById(this.vehicleId),
      ]).then(() => (this.loading = false));
    }
    return await Promise.all([this.getClients(), this.getBanks()]).then(
      () => (this.loading = false)
    );
  },
  watch: {
    vehicle(value) {
      if (value && this.clients) {
        this.setClientList(this.clients);
        this.form = { ...value };
      }
    },
    "vehicle.secondDriver"(value) {
      if (value.length) {
        this.form.isSecondDriver = true;
      }
    },
    isEdit(value) {
      if (value) {
        this.$emit("editDialog", true);
      }
    },
    async "form.type"(value) {
      if (value && this.isEdit)
        return setTimeout(await this.getVehiclesBrand(value), 1000);
      if (value) this.getVehiclesBrand(value);
      else {
        this.clearFipeService();
      }
    },
    async "form.brand"(value) {
      if (value && this.isEdit)
        return setTimeout(await this.getVehiclesModels(value), 2000);
      if (value) this.getVehiclesModels(value);
      else {
        this.clearFipeService();
      }
    },
    async "form.model"(value) {
      if (value && this.isEdit)
        return setTimeout(await this.getYearsModel(), 3000);
      if (value) this.getYearsModel();
      else {
        this.clearFipeService();
      }
    },
    async "form.yearModel"(value) {
      if (value && this.isEdit)
        return setTimeout(await this.getFipeValue(value), 3000);
      if (value) this.getFipeValue(value);
      else {
        this.clearFipeService();
      }
    },
    "form.client.documentNumber"(value) {
      if (value && value.length === 14) {
        this.getClientIdAndName(value, this.clients);
        return this.validateCpf(value, "cpf");
      } else if (value && value.length === 18) {
        this.getClientIdAndName(value, this.clients);
        return this.validateCnpj(value, "cpf");
      }
    },
    "form.documentNumberOwner"(value) {
      if (value && value.length === 14) {
        return this.validateCpf(value, "ownerCpf");
      } else if (value && value.length === 18) {
        return this.validateCnpj(value, "ownerCnpj");
      }
    },
    "form.secondDriver.documentNumber"(value) {
      if (value && value.length === 14) {
        return this.validateCpf(value, "secondDriverCpf");
      } else if (value && value.length === 18) {
        return this.validateCnpj(value, "secondDriverCnpj");
      }
    },
    "form.alieneted"(value) {
      if (!value) {
        this.form.bank = null;
        this.form.financedAmount = null;
      }
    },
    banks: {
      immediate: true,
      handler(value) {
        if (value) {
          this.setBankList(this.banks);
        }
      },
    },
    genericError(error) {
      if (error) {
        this.hasError = { origin: "generic_error", error: error };
        this.loading = false;
      } else {
        this.hasError = { origin: "", error: error };
      }
    },
  },
  methods: {
    ...mapActions("clients", ["getClients"]),
    ...mapActions("banks", ["getBanks"]),
    ...mapActions("vehicles", [
      "setVehicle",
      "editVehicle",
      "getVehicleById",
      "getBrandsByType",
      "getModelsByBrand",
      "getYearsByModelAndBrand",
      "getValueVehicleFipe",
    ]),
    async submitCreate(event) {
      event.preventDefault();
      this.loading = true;
      const result = await this.setVehicle(this.form);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    async submitEdit(event) {
      event.preventDefault();
      this.loading = true;
      const data = {
        id: this.vehicleId,
        body: this.form,
      };
      const result = await this.editVehicle(data);
      if (result === "success") {
        return this.afterSubmit();
      }
    },
    afterSubmit() {
      let message = "Veículo cadastrado com sucesso.";
      if (this.isEdit) {
        message = "Veículo editado com sucesso.";
      }
      this.hasError = false;
      this.loading = false;
      this.$router.push({
        name: "Veículos",
        query: { success: true, message },
      });
    },
    deleteVehicle() {
      const values = {
        id: this.vehicle.id,
        model: this.vehicle.model,
      };
      this.$emit("deleteVehicle", values);
    },
    // validações específicas
    validateCpf(value, setError) {
      const res = validations.cpf(value);
      return this.setError(setError, !res);
    },
    validateCnpj(value, setError) {
      const res = validations.cnpj(value);
      return this.setError(setError, !res);
    },
    async getVehiclesBrand(value) {
      await this.getBrandsByType(value)
        .then((result) => {
          this.brandList = result;
        })
        .catch(() => {
          return this.setError("brands", true);
        });
    },
    async getVehiclesModels(value) {
      let brand;
      if (value && this.brandList.length > 0)
        brand = this.filterList(value, this.brandList);
      const params = {
        type: this.form.type,
        brand: brand[0].code,
      };
      await this.getModelsByBrand(params)
        .then((result) => {
          this.modelsList = result;
        })
        .catch(() => {
          return this.setError("models", true);
        });
    },
    async getYearsModel() {
      let brandFiltered;
      let modelFiltered;
      if (this.form.brand && this.brandList.length > 0)
        brandFiltered = this.filterList(this.form.brand, this.brandList);
      if (this.form.model && this.modelsList.length > 0)
        modelFiltered = this.filterList(this.form.model, this.modelsList);
      const params = {
        type: this.form.type,
        brand: brandFiltered[0].code,
        model: modelFiltered[0].code,
      };
      await this.getYearsByModelAndBrand(params)
        .then((result) => {
          this.yearsList = result;
        })
        .catch(() => {
          return this.setError("years", true);
        });
    },
    async getFipeValue(value) {
      let brandFiltered;
      let modelFiltered;
      let yearFiltered;
      if (this.form.brand && this.brandList.length > 0)
        brandFiltered = this.filterList(this.form.brand, this.brandList);
      if (this.form.model && this.modelsList.length > 0)
        modelFiltered = this.filterList(this.form.model, this.modelsList);
      if (this.form.yearModel && this.yearsList.length > 0)
        yearFiltered = this.filterList(value, this.yearsList);
      const params = {
        type: this.form.type,
        brand: brandFiltered[0].code,
        model: modelFiltered[0].code,
        year: yearFiltered[0].code,
      };
      await this.getValueVehicleFipe(params)
        .then((result) => {
          this.form.value = result.price;
        })
        .catch(() => {
          return this.setError("value", true);
        });
    },
    setClientList(value) {
      if (value) {
        return value.forEach((el) => {
          this.clientList.push(el.fullname);
        });
      }
      return this.setError("clients", true);
    },
    setBankList(value) {
      if (value) {
        return value.forEach((el) => {
          this.bankList.push(el.label);
        });
      }
      return this.setError("banks", true);
    },
    getClientIdAndName(value, list) {
      if (value != null) {
        const sanitizedCPF = value.replace(/[^0-9]/g, "");
        const mapedList = list.filter((e) => e.documentNumber === sanitizedCPF);
        if (mapedList.length) {
          this.form.client.fullname = mapedList[0].fullname;
          this.form.clientId = mapedList[0].id;
        }
      }
    },
    setError(origin, error) {
      this.hasError = { origin: origin, error: error };
    },
    clearError() {
      this.hasError = { origin: null, error: false };
    },
    filterList(value, list) {
      if (list.length) {
        return list.filter((e) => e.name === value);
      }
    },
    toSetCleanList(value) {
      return value.map((el) => el.name);
    },
    clearFipeService() {
      this.form.brand = null;
      this.form.model = null;
      this.form.value = null;
      this.form.yearModel = null;
    },
  },
};
</script>
<style>
input[type="number"],
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -moz-appearance: textfield;
  -webkit-appearance: none;
}
.conditions-area {
  display: flex;
  flex-direction: column;
  justify-content: start;
}
</style>
