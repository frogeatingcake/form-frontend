<template>
  <div>
    <div class="row row-space">
      <div class="col-2">
        <div class="input-group">
          <label class="label">Branch</label>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-map-marker"></i>
            </InputGroupAddon>
            <Select
              v-model="selectedBranch"
              :options="branches"
              optionLabel="name"
              checkmark
              :highlightOnSelect="false"
              class="w-full md:w-56"
              @change="emitUserData"
            />
          </InputGroup>
          <span v-if="!isBranchValid && selectedBranch" class="error-message">
            Please select a branch.
          </span>
        </div>
      </div>
      <!-- Reason Selection -->
      <div class="col-2">
        <div class="input-group">
          <label class="label">Appointment Reason</label>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-question-circle"></i>
            </InputGroupAddon>
            <Select
              v-model="selectedReasons"
              :options="reasons"
              optionLabel="name"
              checkmark
              :highlightOnSelect="false"
              class="w-full md:w-56"
              @change="emitUserData"
            />
          </InputGroup>
          <span v-if="!isReasonValid && selectedReasons" class="error-message">
            Please select a reason.
          </span>
        </div>
      </div>
    </div>

    <div class="row row-space">
      <!-- Date Picker -->
      <div class="col-2">
        <div class="input-group">
          <label class="label">Date</label>
          <div class="input-group-icon">
            <DatePicker
              v-model="dateOfAppointment"
              showIcon
              fluid
              iconDisplay="input"
              :class="{ 'is-invalid': !isDateValid && dateOfAppointment }"
              @change="emitUserData"
            />
            <span
              v-if="!isDateValid && dateOfAppointment"
              class="error-message"
            >
              Please enter a valid date.
            </span>
          </div>
        </div>
      </div>
      <div class="col-2">
        <div class="input-group">
          <label class="label">Time</label>
          <DatePicker
            v-model="timeofAppointment"
            showIcon
            fluid
            iconDisplay="input"
            timeOnly
            :class="{ 'is-invalid': !isTimeValid && timeofAppointment }"
            @change="emitUserData"
          >
            <template #inputicon="slotProps">
              <i class="pi pi-clock" @click="slotProps.clickCallback" />
            </template>
          </DatePicker>
          <span v-if="!isTimeValid && timeofAppointment" class="error-message">
            Please enter a time.
          </span>
        </div>
      </div>
    </div>

    <div class="input-group col-12">
      <label class="label">Write For Us</label>
      <Textarea
        v-model="comment"
        autoResize
        rows="5"
        cols="47"
        :class="{ 'is-invalid': !isCommentValid && comment }"
        @input="emitUserData"
      />
    </div>
  </div>
</template>

<script>
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";

export default {
  components: {
    DatePicker,
    Select,
    Textarea,
    InputGroup,
    InputGroupAddon,
  },
  props: {
    parentUserAppointment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedBranch: { name: this.parentUserAppointment.branch },
      selectedReasons: { name: this.parentUserAppointment.appointmentReason },
      dateOfAppointment: this.parentUserAppointment.date,
      timeofAppointment: this.parentUserAppointment.time,
      comment: this.parentUserAppointment.comments,

      branches: [
        { name: "Drenthe" },
        { name: "Flevoland" },
        { name: "Friesland" },
        { name: "Groningen" },
        { name: "Limburg" },
        { name: "Gelderland" },
        { name: "Noord-Holland" },
        { name: "Noord-Brabant" },
        { name: "Overijssel" },
        { name: "Utrecht" },
        { name: "Zeeland" },
        { name: "Zuid-Holland" },
      ],
      reasons: [
        { name: "Buying a House" },
        { name: "House improvement" },
        { name: "Mortage adjustment" },
        { name: "Another Reason" },
      ],
    };
  },
  computed: {
    isBranchValid() {
      return this.selectedBranch !== null;
    },
    isReasonValid() {
      return this.selectedReasons !== null;
    },
    isDateValid() {
      return this.dateOfAppointment !== null;
    },
    isTimeValid() {
      return this.timeofAppointment !== null;
    },
    isCommentValid() {
      return this.comment !== null;
    },
  },
  methods: {
    validateForm() {
      return (
        this.isBranchValid &&
        this.isReasonValid &&
        this.isDateValid &&
        this.isTimeValid &&
        this.isCommentValid
      );
    },
    emitUserData() {
      this.$emit("validation-change", {
        isValid: this.validateForm(),
        branch: this.selectedBranch ? this.selectedBranch.name : null,
        appointmentReason: this.selectedReasons ? this.selectedReasons.name : null,
        date: this.dateOfAppointment,
        time: this.timeofAppointment,
        comments: this.comment,
      });
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
