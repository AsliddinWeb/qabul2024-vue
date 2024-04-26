<script>
import axios from "axios";
import Sidebar from "@/components/Sidebar.vue";

import {mask} from "vue-the-mask";

export default {
  name: 'PassportView',
  components: {
    Sidebar
  },
  directives: {
    mask
  },

  data() {
    return {
      userData: {},
      countries: [],
      regions: [],
      districts: [],
      selectedCountryId: '',
      selectedRegionId: '',
      selectedDistrictId: ''
    }
  },
  methods: {
    getUser() {
      axios.get('/auth/getMe/')
          .then((response) => {
            this.userData = response.data;
            this.selectedCountryId = this.userData.passport.country.id;
            this.selectedRegionId = this.userData.passport.region.id;
            this.selectedDistrictId = this.userData.passport.district.id;
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
    },
    getCountry() {
      axios.get('/auth/get/mamlakatlar/')
          .then((response) => {
            this.countries = response.data;
            console.log(this.countries)
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
    },
    getAllRegions() {
      axios.get('/auth/get/all-viloyatlar/')
          .then((response) => {
            this.regions = response.data;
            console.log(this.countries)
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
    },
    getAllDistricts() {
      axios.get('/auth/get/all-tumanlar/')
          .then((response) => {
            this.districts = response.data;
            console.log(this.countries)
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
    },
    getRegion() {
      const countryId = this.selectedCountryId;
      axios.get(`/auth/get/${countryId}/viloyatlar/`)
          .then((response) => {
            this.regions = response.data;

            console.log(this.regions)
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
    },
    getDistrict() {
      const regionId = this.selectedRegionId;
      axios.get(`/auth/get/${regionId}/tumanlar/`)
          .then((response) => {
            this.districts = response.data;
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
    }
  },
  created() {
    this.getUser();

    this.getCountry();
    this.getAllRegions();
    this.getAllDistricts();
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
                    ma'lumotlarini yangilash</h1>
                </div>
              </div>
              <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 ">Ism</label>
                    <input type="text" v-model="userData.passport.first_name" id="first_name"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="Ism" required/>
                  </div>
                  <div>
                    <label for="third_name" class="block mb-2 text-sm font-medium text-gray-900 ">Familiya</label>
                    <input type="text" v-model="userData.passport.third_name" id="third_name"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="Familiya" required/>
                  </div>
                  <div>
                    <label for="second_name" class="block mb-2 text-sm font-medium text-gray-900 ">Otasining
                      ismi</label>
                    <input type="text" v-model="userData.passport.second_name" id="second_name"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="Otasining ismi" required/>
                  </div>
                  <div>
                    <label for="birth_date" class="block mb-2 text-sm font-medium text-gray-900 ">Tug'ilgan sana</label>
                    <input type="date" v-model="userData.passport.birth_date" id="birth_date"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="Tug'ilgan sana" required/>
                  </div>
                  <div>
                    <label for="passport_number" class="block mb-2 text-sm font-medium text-gray-900 ">Pasport seriya va
                      raqami {{selectedRegionId}}</label>
                    <input type="text" v-mask="'AA #######'" v-model="userData.passport.passport_number"
                           id="passport_number"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="AA 1234567" required/>
                  </div>
                  <div>
                    <label for="jshshir" class="block mb-2 text-sm font-medium text-gray-900 ">JSHSHIR</label>
                    <input type="number" v-mask="'##############'" v-model="userData.passport.jshshir" id="jshshir"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="14 ta raqamdan iborat" required/>
                  </div>

                  <div>
                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 ">Mamlakat</label>
                    <select @change="getRegion()" v-model="selectedCountryId" id="countries"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      <option value="" selected disabled hidden>-------------</option>
                      <option v-for="con in countries" :key="con.id" :value="con.id">{{ con.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label for="regions" class="block mb-2 text-sm font-medium text-gray-900 ">Viloyatni tanlang</label>
                    <select @change="getDistrict()" v-model="selectedRegionId" id="regions"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      <option value="" selected disabled hidden>-------------</option>
                      <option v-for="reg in regions" :key="reg.id" :value="reg.id">{{ reg.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="mb-6">
                  <label for="districts" class="block mb-2 text-sm font-medium text-gray-900 ">Tumanni tanlang</label>
                  <select v-model="selectedDistrictId" id="districts"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="" selected disabled hidden>-------------</option>
                    <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{ dis.name }}</option>
                  </select>
                </div>
                <div class="mb-6">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                  <input type="password" id="password"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                         placeholder="•••••••••" required/>
                </div>
                <div class="mb-6">
                  <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 ">Confirm
                    password</label>
                  <input type="password" id="confirm_password"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                         placeholder="•••••••••" required/>
                </div>
                <div class="flex items-start mb-6">
                  <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" value=""
                           class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                           required/>
                  </div>
                  <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with
                    the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and
                      conditions</a>.</label>
                </div>
                <button type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Submit
                </button>
              </form>

            </div>
          </template>

          <template v-else>
            <div class="lg:w-3/4 mx-auto">
              <div class="flex flex-col">
                <div class="h-1 bg-gray-200 rounded overflow-hidden">
                  <div class="w-24 h-full bg-indigo-500"></div>
                </div>
                <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-2">
                  <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">Passport
                    ma'lumotlarini to'ldiring</h1>
                </div>
              </div>
              <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 ">First name</label>
                    <input type="text" id="first_name"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="John" required/>
                  </div>
                  <div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
                    <input type="text" id="last_name"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="Doe" required/>
                  </div>
                  <div>
                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 ">Company</label>
                    <input type="text" id="company"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="Flowbite" required/>
                  </div>
                  <div>
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 ">Phone number</label>
                    <input type="tel" id="phone"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
                  </div>
                  <div>
                    <label for="website" class="block mb-2 text-sm font-medium text-gray-900 ">Website URL</label>
                    <input type="url" id="website"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="flowbite.com" required/>
                  </div>
                  <div>
                    <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 ">Unique visitors (per
                      month)</label>
                    <input type="number" id="visitors"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                           placeholder="" required/>
                  </div>
                </div>
                <div class="mb-6">
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
                  <input type="email" id="email"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                         placeholder="john.doe@company.com" required/>
                </div>
                <div class="mb-6">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                  <input type="password" id="password"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                         placeholder="•••••••••" required/>
                </div>
                <div class="mb-6">
                  <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 ">Confirm
                    password</label>
                  <input type="password" id="confirm_password"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                         placeholder="•••••••••" required/>
                </div>
                <div class="flex items-start mb-6">
                  <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" value=""
                           class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                           required/>
                  </div>
                  <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with
                    the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and
                      conditions</a>.</label>
                </div>
                <button type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Submit
                </button>
              </form>

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