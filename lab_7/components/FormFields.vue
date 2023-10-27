<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="email">Введіть електронну пошту:</label>
      <input type="email" class="form-control" v-model="email" @input="validateEmail" required>
      <p class="mt-1 error-message" id="email-error">{{ emailError }}</p>
    </div>

    <div class="form-group">
      <label for="password">Введіть пароль:</label>
      <input type="password" class="form-control" v-model="password" @input="validatePassword" required>
      <p class="mt-1 error-message" id="password-error">{{ passwordError }}</p>
    </div>

    <div class="form-row d-flex flex-wrap">
      <div class="form-group col-md-3 mx-1">
        <label for="surname">Введіть прізвище:</label>
        <input type="text" class="form-control" v-model="surname" @input="validateSurname" required>
        <p class="mt-1 error-message" id="surname-error">{{ surnameError }}</p>
      </div>
      <div class="form-group col-md-4 mx-2">
        <label for="name">Введіть ім'я:</label>
        <input type="text" class="form-control" v-model="name" @input="validateName" required>
        <p class="mt-1 error-message" id="name-error">{{ nameError }}</p>
      </div>
      <div class="form-group col-md-4 mx-2">
        <label for="middle-name">Введіть по батькові:</label>
        <input type="text" class="form-control" v-model="middleName" @input="validateMiddleName" required>
        <p class="mt-1 error-message" id="middle-name-error">{{ middleNameError }}</p>
      </div>
    </div>


    <div class="form-group">
      <label>Стать:</label>
      <input type="radio" id="female" name="gender" value="Жінка" v-model="gender" required>
      <label for="female">Жінка</label>
      <input type="radio" id="male" name="gender" value="Чоловік" v-model="gender" required>
      <label for="male">Чоловік</label>
    </div>

    <div class="form-group">
      <label for="phone">Номер телефону</label>
      <input class="form-control item" type="tel" id="phone" v-model="phone" v-mask="'+38(0##)-###-##-##'"
             placeholder="+38(0__)-___-__-__" @input="validatePhone" required>
      <p class="mt-1 error-message" id="phone-error">{{ phoneError }}</p>
    </div>

    <div class="form-group">
      <label for="date">Введіть дату народження:</label>
      <input type="date" class="form-control" id="date" v-model="date" @input="validateDate" required max="2023-10-20">
      <p class="mt-1 error-message" id="date-error">{{ dateError }}</p>
    </div>

    <div class="form-group">
      <label for="group">Оберіть групу:</label>
      <select class="form-control" id="group" v-model="group" required>
        <option value="IA-21">IA-21</option>
        <option value="IA-22">IA-22</option>
        <option value="IA-23">IA-23</option>
        <option value="IA-24">IA-24</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary mt-4 mb-4">Відправити</button>
  </form>
</template>

<script>
import {mask} from 'vue-the-mask';

export default {
  directives: {
    mask,
  },
  data() {
    return {
      email: '',
      password: '',
      surname: '',
      name: '',
      middleName: '',
      gender: 'Жінка',
      phone: '',
      date: '',
      group: 'IA-23',
      emailError: '',
      passwordError: '',
      surnameError: '',
      nameError: '',
      middleNameError: '',
      genderError: '',
      phoneError: '',
      dateError: '',
      groupError: '',
    };
  },
  methods: {
    submitForm() {
      if (this.validateForm()) {
        const data = {
          email: this.email,
          password: this.password,
          surname: this.surname,
          name: this.name,
          middleName: this.middleName,
          gender: this.gender,
          phone: this.phone,
          date: this.date,
          group: this.group,
        };
        this.$emit('addData', data);
        this.clearForm();
      }
    },
    validateForm() {
      this.clearErrorMessages();

      let isValid = true;

      if (!this.validateEmail()) {
        isValid = false;
      }

      if (!this.validatePassword()) {
        isValid = false;
      }

      if (!this.validateSurname()) {
        isValid = false;
      }

      if (!this.validateName()) {
        isValid = false;
      }

      if (!this.validateMiddleName()) {
        isValid = false;
      }

      if (!this.validatePhone()) {
        isValid = false;
      }

      if (!this.validateDate()) {
        isValid = false;
      }

      return isValid;
    },
    validateEmail() {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      this.emailError = emailRegex.test(this.email) ? '' : 'Некоректна електронна пошта';
      return emailRegex.test(this.email);
    },
    validatePassword() {
      this.passwordError = this.password.length >= 6 ? '' : 'Пароль повинен бути не менше 6 символів';
      return this.password.length >= 6;
    },
    validateSurname() {
      const surnameRegex = /^[a-zA-Zа-яА-ЯіїІЇ '-]/
      this.surnameError = surnameRegex.test(this.surname) ? '' : 'Введіть коректне прізвище';
      return surnameRegex.test(this.surname);
    },
    validateName() {
      const nameRegex = /^[a-zA-Zа-яА-ЯіїІЇ '-]/
      this.nameError = nameRegex.test(this.name) ? '' : "Введіть коректне ім'я";
      return nameRegex.test(this.name);
    },
    validateMiddleName() {
      const middleNameRegex = /^[a-zA-Zа-яА-ЯіїІЇ '-]/
      this.middleNameError = middleNameRegex.test(this.middleName) ? '' : 'Введіть коректне по батькові';
      return middleNameRegex.test(this.middleName);
    },
    validatePhone() {
      const phoneDigits = this.phone.replace(/\D/g, '')
      this.phoneError = phoneDigits.length === 12 ? '' : 'Введіть коректний номер телефону'
      return phoneDigits.length === 12;
    },
    validateDate() {
      if (this.date === '') {
        return true;
      }
      const selectedDate = new Date(this.date);
      const currentDate = new Date();
      this.dateError = selectedDate <= currentDate ? '' : 'Ви ще не народилися :('
      return selectedDate <= currentDate;
    },
    clearErrorMessages() {
      this.emailError = '';
      this.passwordError = '';
      this.surnameError = '';
      this.nameError = '';
      this.middleNameError = '';
      this.genderError = '';
      this.phoneError = '';
      this.dateError = '';
      this.groupError = '';
    },
    clearForm() {
      this.email = '';
      this.password = '';
      this.surname = '';
      this.name = '';
      this.middleName = '';
      this.gender = 'Жінка';
      this.phone = '';
      this.date = '';
      this.group = 'IA-23';
      this.clearErrorMessages();
    },
  },

};
</script>

<style scoped>

</style>