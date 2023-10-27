<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container header-container">
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item"><a class="nav-link" href="">Головна</a></li>
              <li class="nav-item"><a class="nav-link" href="">Контакти</a></li>
              <li class="nav-item"><a class="nav-link" href="">Q&A</a></li>
              <li class="nav-item"><a class="nav-link" href="">Роботи</a></li>
              <li class="nav-item"><a class="nav-link btn login-button" href="">Увійти</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div class="container mt-4">
      <FormFields @addData="addData"></FormFields>
      <UserTable :userData="userData"></UserTable>
      <button type="button" id="delete-selected" class="ml-2 btn btn-danger " @click="deleteSelectedRows">Видалити</button>
      <button type="button" id="duplicate-selected" class="btn btn-warning " @click="duplicateSelectedRows">Дублювати</button>

    </div>
    <footer>
      <a href="tel:+380123456789"><i class="fa fa-phone"></i></a>
      <a href="mailto:gallerymails@email.com"><i class="fa fa-envelope"></i></a>
      <a href="https://t.me/gallerytg"><i class="fa fa-telegram"></i></a>

    </footer>
  </div>
</template>

<script>
import FormFields from './components/FormFields.vue';
import UserTable from './components/UserTable.vue';

export default {
  data() {
    return {
      userData: [],
    };
  },
  methods: {
    addData(data) {
      this.userData.push(data);
    },
    deleteSelectedRows() {
      const table = document.getElementById("user-table")
      const checkboxes = document.querySelectorAll("input[type='checkbox']")

      for (let i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
          table.deleteRow(i + 1)
        }
      }
    },

    duplicateSelectedRows() {
      const table = document.getElementById("user-table")
      const checkboxes = document.querySelectorAll("input[type='checkbox']")

      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          const rowToDuplicate = table.rows[index + 1]
          const newRow = table.insertRow(index + 2)
          for (let i = 0; i < rowToDuplicate.cells.length; i++) {
            const cell = newRow.insertCell(i)
            cell.innerHTML = rowToDuplicate.cells[i].innerHTML
          }
        }
      })
    }
  },
  components: {
    FormFields,
    UserTable,
  },
};
</script>

<style>
body {
  background-color: #f8f8f8;
}

@media screen and (max-width: 768px) {
  .navbar-expand-lg .navbar-nav {
    flex-direction: column;
  }

  .navbar-collapse.show {
    display: block;
  }

  .navbar-nav .nav-link {
    padding: 10px 0;
    text-align: center;
  }
  .header-container {
    background-color: #9a9697 !important;
    box-shadow: 0 0 0 !important;
  }
}

header {
  background-color: #9b9797;
}

.container {
  background-color: #ffffff;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex: 1;
}
.header-container {
  background-color: #817779;
}

.nav-item a.nav-link {
  font-size: 18px;
}

.nav-item {
  margin-left: 20px;
}

div.active p {
  display: block;
}
body{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}
main {
  flex: 1;
}

p {
  word-wrap: break-word;
  max-width: 600px;
}

.error-message {
  color: red;
}

footer {
  background-color: #9a9697;
  color: #fff;
  text-align: center;
  padding: 20px 0;
}

footer a {
  color: #fff;
  margin: 0 10px;
  font-size: 24px;
}

footer i {
  font-size: 30px;
}
</style>