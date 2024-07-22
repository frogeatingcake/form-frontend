<template>
  <Select
    v-model="selectedCountry"
    :options="countries"
    optionLabel="name"
    class=".custom-select"
    @change="onCountryChange"
  >
    <template #option="{ option }">
      <div class="flex items-center">
        <img :src="option.flag" alt="" style="width: 20px; margin-right: 8px" />
        <span>{{ option.name }}</span>
      </div>
    </template>

    <template #value="{ value }">
      <div v-if="value" class="flex items-center justify-start">
        <img :src="value.flag" alt="" style="width: 20px; margin-right: 8px" />
        <span>{{ value.name }}</span>
      </div>
    </template>
  </Select>
</template>

<script>
import Select from "primevue/select";

export default {
  components: {
    Select,
  },
  
  data() {
  return {
  selectedCountry:"",      
  countries: [
        { name: "United States", flag: "https://flagcdn.com/us.svg" },
        { name: "Canada", flag: "https://flagcdn.com/ca.svg" },
        { name: "United Kingdom", flag: "https://flagcdn.com/gb.svg" },
        { name: "Germany", flag: "https://flagcdn.com/de.svg" },
        { name: "France", flag: "https://flagcdn.com/fr.svg" },
        { name: "Spain", flag: "https://flagcdn.com/es.svg" },
        { name: "Italy", flag: "https://flagcdn.com/it.svg" },
        { name: "Netherlands", flag: "https://flagcdn.com/nl.svg" },
        { name: "Belgium", flag: "https://flagcdn.com/be.svg" },
        { name: "Sweden", flag: "https://flagcdn.com/se.svg" },
        { name: "Norway", flag: "https://flagcdn.com/no.svg" },
        { name: "Denmark", flag: "https://flagcdn.com/dk.svg" },
        { name: "Finland", flag: "https://flagcdn.com/fi.svg" },
        { name: "Switzerland", flag: "https://flagcdn.com/ch.svg" },
        { name: "Austria", flag: "https://flagcdn.com/at.svg" },
        { name: "Ireland", flag: "https://flagcdn.com/ie.svg" },
        { name: "Portugal", flag: "https://flagcdn.com/pt.svg" },
        { name: "Greece", flag: "https://flagcdn.com/gr.svg" },
      ],
    };
  },
  methods: {
    onCountryChange() {
      this.$emit("country-changed", this.selectedCountry.name);
    },
  },
};
</script>

<style scoped>
</style>
