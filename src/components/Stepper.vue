
<template>
  <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
    <div class="wrapper wrapper--w680">
      <div class="card card-4">
        <div class="card-body">
          <Stepper value="1" linear class="basis-[50rem]">
            <StepList>
              <Step value="1">Personal </Step>
              <Step value="2">Location</Step>
              <Step value="3">Appointment </Step>
            </StepList>
            <StepPanels>
              <StepPanel v-slot="{ activateCallback }" value="1">
                <div class="flex flex-col h-48">
                  <div
                    class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                  >
                    <UserInfo
                      @validation-change="handleValidationChange"
                      :parentUserData="userData"
                    />
                  </div>
                </div>

                <div class="flex pt-6 justify-end">
                  <Button
                    class="m-b-0"
                    label="Next"
                    icon="pi pi-arrow-right"
                    :disabled="!isFormValid"
                    @click="activateCallback('2')"
                  />
                </div>
              </StepPanel>
              <StepPanel v-slot="{ activateCallback }" value="2">
                <div class="flex flex-col h-48">
                  <div
                    class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                  >
                    <UserLocation
                      @validation-change="handleLocationChange"
                      :parentUserLocation="userDataLocation"
                    />
                  </div>
                </div>

                <div class="flex pt-6 justify-between">
                  <Button
                    class="m-b-0"
                    label="Back"
                    severity="secondary"
                    icon="pi pi-arrow-left"
                    @click="activateCallback('1')"
                  />
                  <Button
                    class="m-b-0"
                    label="Next"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    :disabled="!isFormLocationValid"
                    @click="activateCallback('3')"
                  />
                </div>
              </StepPanel>
              <StepPanel v-slot="{ activateCallback }" value="3">
                <div class="flex flex-col h-48">
                  <div
                    class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                  >
                    <UserAppointment
                      @validation-change="handleAppointmentChange"
                      :parentUserAppointment="userDataAppointment"
                    />
                  </div>
                </div>

                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group m-b-0">
                      <Button
                        label="Back"
                        severity="secondary"
                        icon="pi pi-arrow-left"
                        @click="activateCallback('2')"
                      />
                    </div>
                  </div>

                  <div class="row row-space">
                    <div class="col-2">
                      <div class="input-group m-b-0">
                        <Button
                          type="button"
                          label="Submit"
                          :icon="showIcon ? 'pi pi-check' : ''"
                          :loading="loading"
                          :disabled="!isFormAppointmentValid"
                          @click="sendData"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </StepPanel>
            </StepPanels>
          </Stepper>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import axios from "axios";
import UserInfo from "./UserInfo.vue";
import ToggleButton from "primevue/togglebutton";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Stepper from "primevue/stepper";
import StepList from "primevue/steplist";
import StepPanels from "primevue/steppanels";
import StepItem from "primevue/stepitem";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";
import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";

export default {
  components: {
    ToggleButton,
    Button,
    Divider,
    Stepper,
    StepList,
    StepPanels,
    StepItem,
    Step,
    StepPanel,
    DatePicker,
    InputText,
    RadioButton,
    InputNumber,
    UserInfo,
  },
  data() {
    return {
      isFormValid: false,
      isFormLocationValid: false,
      isFormAppointmentValid: false,
      loading: false,
      showIcon: false,

      userData: {
        firstname: "",
        lastname: "",
        gender: "",
        email: "",
        phone: "",
        birthdate: "",
      },

      userDataLocation: {
        homeaddress: "",
        city: "",
        postalcode: "",
        country: "",
      },

      userDataAppointment: {
        branch: "",
        appointmentReason: "",
        date: null,
        time: null,
        comments: "",
      },
    };
  },
  methods: {
    handleValidationChange({
      isValid,
      firstname,
      lastname,
      gender,
      email,
      phone,
      birthday,
    }) {
      this.isFormValid = isValid;
      this.userData = { firstname, lastname, gender, email, phone, birthday };
      console.log(this.isFormValid);
    },
    handleLocationChange({ isValid, homeaddress, city, postalcode, country }) {
      this.isFormLocationValid = isValid;
      this.userDataLocation = { homeaddress, city, postalcode, country };
    },
    handleAppointmentChange({
      isValid,
      branch,
      appointmentReason,
      date,
      time,
      comments,
    }) {
      this.isFormAppointmentValid = isValid;
      this.userDataAppointment = {
        branch,
        appointmentReason,
        date,
        time,
        comments,
      };
      console.log(this.isFormAppointmentValid);
    },

    async sendData() {
      // Start the loading animation
      this.startAction();

      let userFullData = {
        ...this.userData,
        ...this.userDataLocation,
        ...this.userDataAppointment,
      };

      try {
        const response = await axios.post(
          "https://integrationdevintern10.azurewebsites.net/api/SubmitData",
          userFullData
        );
        console.log("Data sent successfully:", response.data);
        console.log(userFullData);

        // Show alert
        alert("Your appointment has been created!");

        // Refresh the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Adjust the delay as needed
      } catch (error) {
        console.error("Error sending data:", error);
      } finally {
        // Stop the loading animation
        this.loading = false;
        this.showIcon = true;
      }
    },
    startAction() {
      // Start the loading animation
      this.loading = true;
      this.showIcon = true;
    },
  },
};
</script>

<style>
</style>