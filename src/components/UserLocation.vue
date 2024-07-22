<template>
  <div>
    <div class="row row-space">
      <div class="col-12">
        <div class="input-group">
          <label class="label">home address</label>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-home"></i>
            </InputGroupAddon>
            <InputText
              v-model="address"
              @input="emitUserData"
              :class="{ 'is-invalid': !isAddressValid && address }"
            />
          </InputGroup>
          <span v-if="!isAddressValid && address" class="error-message">
            Please enter a valid home address.
          </span>
        </div>
      </div>
    </div>

    <div class="row row-space">
      <div class="col-2">
        <div class="input-group">
          <label class="label">City</label>
          <div class="input-group-icon">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-map"></i>
              </InputGroupAddon>
              <InputText
                v-model="city"
                @input="emitUserData"
                :class="{ 'is-invalid': !isCityValid && city }"
              />
            </InputGroup>
            <span v-if="!isCityValid && city" class="error-message">
              Please enter a valid city name.
            </span>
          </div>
        </div>
      </div>

      <div class="col-2">
        <div class="input-group">
          <label class="label">Postal Code</label>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-map-marker"></i>
            </InputGroupAddon>
            <InputText
              v-model="postalcode"
              type="text"
              class="form-input"
              @input="emitUserData"
              :class="{ 'is-invalid': !isPostalCodeValid && postalcode }"
            />
          </InputGroup>
          <span v-if="!isPostalCodeValid && postalcode" class="error-message">
            Please enter a valid postalcode.
          </span>
        </div>
      </div>
    </div>
    <div class="row row-space">
      <div class="col-12">
        <div class="input-group">
          <label class="label"> Country</label>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-globe"></i>
            </InputGroupAddon>
            <CountrySelector @country-changed="handleCountryChange" :parentCountry="country" />
          </InputGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountrySelector from "./CountrySelector.vue";
import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
import InputText from "primevue/inputtext";

export default {
  components: {
    InputText,
    RadioButton,
    InputNumber,
    CountrySelector,
  },
  props: {
    parentUserLocation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      address: this.parentUserLocation.homeaddress,
      city: this.parentUserLocation.city,
      postalcode: this.parentUserLocation.postalcode,
      country: "",
    };
  },
  computed: {
    isAddressValid() {
      // Address must not contain special characters
      return /^[a-zA-Z0-9\s]{6,}$/.test(this.address.trim());
    },
    isCityValid() {
      // City must not contain numbers or special characters
      return /^[a-zA-Z\s]+$/.test(this.city.trim());
    },
    isPostalCodeValid() {
      // Postal code must be exactly 4 numbers
      return /^\d{4}$/.test(this.postalcode.trim());
    },
  },
  methods: {
    handleCountryChange(selectedCountry) {
      this.country = selectedCountry;
      this.emitUserData();
    },
    emitUserData() {
      this.$emit("validation-change", {
        isValid: this.validateForm(),
        homeaddress: this.address,
        city: this.city,
        postalcode: this.postalcode,
        country: this.country,
      });
    },
    validateForm() {
      return this.isAddressValid && this.isCityValid && this.isPostalCodeValid;
    },
  },
};
</script>

<style scoped>
.is-invalid {
  border-color: red;
}
.error-message {
  color: red;
  font-size: 0.875em;
}
</style>
