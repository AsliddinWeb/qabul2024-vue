<script>
import axios from "axios";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: 'ProfileView',
  components: {
    Sidebar
  },

  data() {
    return {
      userData: {},
    }
  },
  methods: {
    getUser() {
      axios.get('/auth/getMe/')
          .then((response) => {
            this.userData = response.data;
            console.log(this.userData);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
    }
  },
  created() {
    this.getUser();
  }
}
</script>

<template>
  <main>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto flex flex-wrap">

        <div class="flex flex-wrap w-full">
          <Sidebar/>

          <template v-if="userData.passport">
            <div class="lg:w-3/4 mx-auto">
              <div class="flex flex-col">
                <div class="h-1 bg-gray-200 rounded overflow-hidden">
                  <div class="w-24 h-full bg-indigo-500"></div>
                </div>
                <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-2">
                  <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">Passport
                    ma'lumotlari</h1>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row mt-10">
                <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div class="w-48 h-48 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <img class="rounded-full" :src="`http://127.0.0.1:8000${userData.passport.image}`"
                         alt="Foydalanuvchi rasmi">

                  </div>
                  <div class="flex flex-col items-center text-center justify-center">
                    <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">{{ userData.passport.first_name }}
                      {{ userData.passport.third_name }} {{ userData.passport.second_name }}</h2>
                    <div class="w-12 h-1 bg-green-500 rounded mt-2 mb-4"></div>
                    <p class="text-base">{{ userData.phone_number }}</p>
                  </div>
                </div>
                <div
                    class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <div class="text-gray-700 text-left">
                    <div class="grid md:grid-cols-2 text-sm">
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Ism</div>
                        <div class="px-4 py-2">{{ userData.passport.first_name }}</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Familiya</div>
                        <div class="px-4 py-2">{{ userData.passport.third_name }}</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Otasining ismi</div>
                        <div class="px-4 py-2">{{ userData.passport.second_name }}</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Tug'ilgan sanasi</div>
                        <div class="px-4 py-2">{{ userData.passport.birth_date }}</div>
                      </div>

                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Passport seriya</div>
                        <div class="pr-4 py-2">
                          <div class="px-4 py-2">{{ userData.passport.passport_number }}</div>
                        </div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">JSHSHIR</div>
                        <div class="px-4 py-2">{{ userData.passport.jshshir }}</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Manzil</div>
                        <div class="px-4 py-2">{{ userData.passport.country.name }}, {{
                            userData.passport.region.name
                          }}, {{ userData.passport.district.name }}, {{ userData.passport.home_address }}
                        </div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Jins</div>
                        <div class="px-4 py-2">{{ userData.passport.gender }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end mt-10">
                    <button
                        class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-md">
                      Ma'lumotlarni o'zgartirish
                      <svg class="h-6 w-6 text-white ml-2"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>


                    </button>
                  </div>
                </div>

              </div>

              <div class="my-4 py-4"></div>
            </div>
          </template>

          <template v-else>
            <div class="lg:w-3/4 mx-auto">
              <div class="flex flex-col">
                <div class="h-1 bg-gray-200 rounded overflow-hidden">
                  <div class="w-24 h-full bg-indigo-500"></div>
                </div>
                <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-2">
                  <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">Kabinet</h1>
                </div>
              </div>
              <div class="bg-white p-3 border shadow-xl rounded-sm">
                <div class="w-full block lg:flex items-center">
                  <img class="lg:w-2/6 md:w-3/6 w-6/6 mb-10 object-cover object-center rounded" alt="hero"
                       src="https://xiuedu.uz/media/images/ui/11111111.jpg">
                  <div class="text-center lg:w-2/3 w-full">
                    <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Xalqaro Innovatsion Universiteti</h1>
                    <p class="mb-8 leading-relaxed p-4 text-indigo-500"><b>Qabul tizimi</b>ga xush kelibsiz. Davom etish uchun passport ma'lumotlarinigizni kiriting!</p>
                    <div class="flex justify-center">
                      <button
                          class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-md">
                        Passport ma'lumotlarini to'ldirish
                        <svg class="h-6 w-6 text-white ml-2"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>


                      </button>
                    </div>
                  </div>
                </div>
<!--                <button-->
<!--                    class="block w-full   text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">-->
<!--                  <svg class="h-6 w-6 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>-->
<!--                  </svg>-->
<!--                  Passport ma'lumotlarini to'ldirish-->
<!--                </button>-->
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
:root {
  --main-color: #4a76a8;
}

.bg-main-color {
  background-color: var(--main-color);
}

.text-main-color {
  color: var(--main-color);
}

.border-main-color {
  border-color: var(--main-color);
}
</style>