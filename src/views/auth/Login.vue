<script>
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

import { mask } from "vue-the-mask";

export default {
  directives: {
    mask,
  },

  setup() {
    const toastStore = useToastStore();
    const userStore = useUserStore();

    return {
      toastStore,
      userStore
    }
  },

  data() {
    return {
      form: {
        phone_number: '',
        password: '',
      },
      errors: []
    }
  },

  methods: {
    async submitForm() {
      this.errors = []

      const cleanNumber = this.form.phone_number.replace(/\D+/g, "");

      if (cleanNumber.length !== 9) {
        this.errors.push("Telefon raqam 9ta belgidan iborat bo'lishi kerak.")
        this.toastStore.showToast(3000, "Telefon raqam bo'sh bo'lmasligi kerak.", 'bg-red-500 text-white')
      }


        if (this.form.phone_number === '') {
        this.errors.push("Telefon raqam bo'sh bo'lmasligi kerak.")
        this.toastStore.showToast(3000, "Telefon raqam bo'sh bo'lmasligi kerak.", 'bg-red-500 text-white')
      }

      if (this.form.password === '') {
        this.errors.push('Parol bo\'sh bo\'lmasligi kerak.')
        this.toastStore.showToast(3000, 'Parol bo\'sh bo\'lmasligi kerak.', 'bg-red-500 text-white')
      }

      if (this.errors.length === 0) {
        const fullPhoneNumber = "+998" + cleanNumber;
        this.form.phone_number = fullPhoneNumber;
        await axios
            .post('/auth/login/', this.form)
            .then(response => {
              this.userStore.setToken(response.data);
              axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
              this.toastStore.showToast(3000, 'Tizimga muvaffaqqiyatli kirdingiz!', 'bg-green-500 text-white');
              this.$router.push('/profile');
            })
            .catch(error => {
              console.log('error', error);
              this.errors.push('Telefon raqam yoki parolingizda xatolik!');
              this.toastStore.showToast(3000, 'Telefon raqam yoki parolingizda xatolik!', 'bg-red-500 text-white')
            })
      }
    }
  }
}
</script>



<template>

  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div class="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 class="title-font font-medium text-3xl text-gray-900">Xalqaro Innovatsion Universitet!</h1>
        <p class="leading-relaxed mt-4">Qabul tizimiga xush kelibsiz. . .</p>
      </div>
      <div class="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Kirish</h2>
        <div class="relative mb-4">
          <label for="phone-number" class="leading-7 text-sm text-gray-600">Telefon raqam</label>
          <input
              v-mask="'##-###-##-##'"
              v-model="form.phone_number" type="tel" id="phone-number" name="phone-number" placeholder="(99) 123-45-67"
                 class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div class="relative mb-4">
          <label for="password" class="leading-7 text-sm text-gray-600">Parol</label>
          <input v-model="form.password" type="password" id="password" name="password" placeholder="Parolingizni kiriting. . ."
                 class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <button
            @click.prevent="submitForm"
            class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Kirish
        </button>
        <p class="text-xs text-gray-500 mt-3">Ro'yhatdan o'tmoqchimisiz?
          <RouterLink class="text-blue-500 font-bold" to="/register">Ro'yhatdan o'tish</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>