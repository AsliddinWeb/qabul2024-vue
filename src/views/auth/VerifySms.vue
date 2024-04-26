<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useToastStore } from '@/stores/toast';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { mask } from "vue-the-mask";

export default {
  directives: {
    mask,
  },

  setup() {
    const toastStore = useToastStore();
    const userStore = useUserStore();
    const totalTime = 300; // 5 daqiqa soniyalarda
    const timeLeft = ref(totalTime);

    function updateTime() {
      if (timeLeft.value > 0) {
        setTimeout(() => {
          timeLeft.value--;
          updateTime();
        }, 1000);
      } else {
        toastStore.showToast(3000, 'Tasdiqlash kodi muddati o\'tdi.', 'bg-red-500 text-white');
      }
    }

    const minutes = ref(Math.floor(timeLeft.value / 60));
    const seconds = ref(timeLeft.value % 60);

    onMounted(() => {
      updateTime();
    });

    onUnmounted(() => {
      clearTimeout(updateTime);
    });

    return {
      toastStore,
      userStore,
      timeLeft,
      minutes,
      seconds
    }
  },

  data() {
    return {
      form: {
        sms_code: '',
      },
      errors: []
    }
  },

  methods: {
    async submitForm() {
      this.errors = []

      if (this.form.sms_code === '') {
        this.errors.push("Sms kod 4ta belgidan iborat bo'lishi kerak.")
        this.toastStore.showToast(3000, "Sms kod 4ta belgidan iborat bo'lishi kerak.", 'bg-red-500 text-white')
      }

      if (this.errors.length === 0) {
        await axios
            .post('/auth/verify-phone/', {
              "phone_number": localStorage.getItem('register_number'),
              "verify_code": this.form.sms_code,
            })
            .then(response => {
              this.toastStore.showToast(3000, 'Telefon raqam muvaffaqqiyatli tasdiqlandi!', 'bg-green-500 text-white');
              this.$router.push('/login');
            })
            .catch(error => {
              console.log('error', error);
              this.errors.push('Kod xato yoki muddati o\'tgan!');
              this.toastStore.showToast(3000, 'Kod xato yoki muddati o\'tgan!', 'bg-red-500 text-white')
            })
      }
    },
    async resendSms() {
      await axios
          .post('/auth/resend-sms/', {
            "phone_number": localStorage.getItem('register_number'),
          })
          .then(response => {
            this.toastStore.showToast(3000, 'Tasdiqlash kodi qayta yuborildi!', 'bg-green-500 text-white');
            // this.$router.push('/login');
          })
          .catch(error => {
            console.log('error', error);
            this.errors.push("Kod yuborilgan!");
            this.toastStore.showToast(3000, "Kod yuborilgan!", 'bg-red-500 text-white')
          })
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
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sms kodni tasdiqlash</h2>

        <div class="relative mb-4">
          <label for="sms-code" class="leading-7 text-sm text-gray-600">Tasdiqlash kodi</label>
          <input v-model="form.sms_code" type="number" id="sms-code" name="sms-code"
                 placeholder="Tasdiqlash kodi. . ."
                 v-mask="'####'"
                 class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <button
            @click.prevent="submitForm"
            class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Kodni tasdiqlash
        </button>
        <div class="flex flex-wrap items-center justify-between">
          <p class="text-xs text-gray-500 mt-3">Kodni olishda muammo bormi?
            <button @click.prevent="resendSms" class="text-blue-500 font-bold">Qayta yuborish</button>
          </p>
          <p>{{ timeLeft }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>