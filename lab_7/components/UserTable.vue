<template>
  <div>
    <table class="table" id="user-table">
      <thead>
      <tr>
        <th></th>
        <th>Email</th>
        <th>ПІБ</th>
        <th>Стать</th>
        <th>Номер</th>
        <th>Дата народження</th>
        <th>Група</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in userData" :key="index">
        <td><input type="checkbox"></td>
        <td>{{ user.email }}</td>
        <td>{{ user.surname + ' ' + user.name + ' ' + user.middleName }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.date }}</td>
        <td>{{ user.group }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['userData'],
};
</script>

<style scoped>

</style>
