<template>
  <div>
    <div class="row row-space">
      <div class="col-2">
        <div class="input-group">
          <label class="label">First Name</label>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              required
              v-model="name"
              type="text"
              class="input--style-4"
              @input="emitUserData"
              :class="{ 'is-invalid': !isNameValid && name }"
            />
          </InputGroup>
          <span v-if="!isNameValid && name" class="error-message">
              Please enter a valid name.
          </span>
        </div>
      </div>
      <div class="col-2">
        <div class="input-group">
          <label class="label">Last Name</label>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-users"></i>
            </InputGroupAddon>
            <InputText
              v-model="lastname"
              type="text"
              class="input--style-4"
              @input="emitUserData"
              :class="{ 'is-invalid': !isLastNameValid && lastname }"
            />
          </InputGroup>
          <span v-if="!isLastNameValid && lastname" class="error-message">
              Please enter a valid lastname.
          </span>
        </div>
      </div>
    </div>

    <div class="row row-space">
      <div class="col-2">
        <div class="input-group">
          <label class="label">Birthday</label>
          <div class="input-group-icon">
            <DatePicker
              v-model="birthdate"
              showIcon
              fluid
              iconDisplay="button"
              inputId="icondisplay"
              @change="emitUserData"
              :class="{ 'is-invalid': !isBirthdayValid && birthdate }"
            />
            <span v-if="!isBirthdayValid && birthdate" class="error-message">
              Please enter a valid birthday (age must be 18 or older).
            </span>
          </div>
        </div>
      </div>
      <div class="col-2">
        <div class="input-group">
          <label class="label">Gender</label>
          <div class="p-t-10">
            <RadioButton
              class="m-l-10"
              v-model="gender"
              inputId="Male"
              name="gender"
              value="Male"
              @change="emitUserData"
            />
            <label class="radio-container m-r-45" for="Male">Male</label>
            <RadioButton
              class="m-l-20"
              v-model="gender"
              inputId="Female"
              name="gender"
              value="Female"
              @change="emitUserData"
            />
            <label class="radio-container" for="Female">Female</label>
          </div>
          <span
            v-if="!isGenderSelected && gender !== null"
            class="error-message"
          >
            Please select a gender.
          </span>
        </div>
      </div>
    </div>

    <div class="row row-space">
      <div class="col-2">
        <div class="input-group">
          <label class="label">Email</label>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-envelope"></i>
            </InputGroupAddon>
            <InputText
              @input="emitUserData"
              v-model="email"
              :class="{ 'is-invalid': !isEmailValid && email }"
            />
          </InputGroup>
          <span v-if="!isEmailValid && email" class="error-message">
            Please enter a valid email.
          </span>
        </div>
      </div>

      <div class="col-2">
        <div class="input-group">
          <label class="label">Phone Number</label>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-phone"></i>
            </InputGroupAddon>
            <InputText
              @input="emitUserData"
              v-model="phonenumber"
              :class="{ 'is-invalid': !isPhoneNumberValid && phonenumber }"
            />
          </InputGroup>
          <span v-if="!isPhoneNumberValid && phonenumber" class="error-message">
            Please enter a valid phone number with exactly 8 digits.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";
import DatePicker from "primevue/datepicker";

export default {
  components: {
    InputText,
    RadioButton,
    DatePicker,
  },
  props: ['parentUserData'],
  data() {
    return {
      name: this.parentUserData.firstname,
      lastname: this.parentUserData.lastname,
      gender: this.parentUserData.gender,
      birthdate: this.parentUserData.birthday,
      email: this.parentUserData.email,
      phonenumber: this.parentUserData.phone,
    };
  },
  computed: {
    isNameValid() {
      const namePattern = /^[A-Za-z]+$/;
      return namePattern.test(this.name.trim()) && this.name.trim().length >= 3;
    },
    isLastNameValid() {
      const namePattern = /^[A-Za-z]+$/;
      return (
        namePattern.test(this.lastname.trim()) &&
        this.lastname.trim().length >= 3
      );
    },
    isEmailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    },
    isPhoneNumberValid() {
      return /^\d{8}$/.test(this.phonenumber);
    },
    isBirthdayValid() {
      if (!this.birthdate) return false;

      const today = new Date();
      const birthdate = new Date(this.birthdate);

      // Calculate age
      let age = today.getFullYear() - birthdate.getFullYear();
      const monthDiff = today.getMonth() - birthdate.getMonth();

      // Adjust age if the birthday has not occurred yet this year
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthdate.getDate())
      ) {
        age--;
      }

      // Check if the person is 18 years or older
      return age >= 18;
    },

    isGenderSelected() {
      return this.gender !== null;
    },
  },
  methods: {
    validateForm() {
      return (
        this.isNameValid &&
        this.isLastNameValid &&
        this.isEmailValid &&
        this.isPhoneNumberValid &&
        this.isBirthdayValid &&
        this.isGenderSelected
      );
    },
    emitUserData() {
      this.$emit("validation-change", {
        isValid: this.validateForm(),
        firstname: this.name,
        lastname: this.lastname,
        gender: this.gender,
        email: this.email,
        phone: this.phonenumber,
        birthday: this.birthdate,
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
