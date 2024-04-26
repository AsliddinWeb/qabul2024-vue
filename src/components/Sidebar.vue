<script>
import axios from "axios";

export default {
  name: 'Sidebar',

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

  <div class="lg:w-1/4 md:w-1/2 md:pr-10 md:pb-6 mb-10">
    <div class="flex relative pb-12">
      <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div
          class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <div class="flex-grow pl-4 flex items-center">
        <h2 class="font-medium title-font text-sm text-gray-900  tracking-wider uppercase">Kabinet</h2>
      </div>
    </div>

    <template v-if="userData.passport">
      <div class="flex relative pb-12">
        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div
            class="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>

        </div>
        <div class="flex-grow pl-4 flex items-center">
          <h2 class="font-medium title-font text-sm text-green-500  tracking-wider uppercase">PASSPORT MA'LUMOTLARI</h2>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex relative pb-12">
        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div
            class="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 inline-flex items-center justify-center text-white relative z-10">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>

        </div>
        <div class="flex-grow pl-4 flex items-center">
          <h2 class="font-medium title-font text-sm text-orange-500 tracking-wider uppercase">PASSPORT MA'LUMOTLARI</h2>
        </div>
      </div>
    </template>

    <template v-if="userData.diplom">
      <div class="flex relative pb-12">
        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div
            class="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               class="w-5 h-5" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="3"></circle>
            <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
          </svg>
        </div>
        <div class="flex-grow pl-4 flex items-center">
          <h2 class="font-medium title-font text-sm text-green-900 mb-1 tracking-wider uppercase">Diplom
            ma'lumotlari</h2>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex relative pb-12">
        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div
            class="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 inline-flex items-center justify-center text-white relative z-10">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               class="w-5 h-5" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="3"></circle>
            <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
          </svg>
        </div>
        <div class="flex-grow pl-4 flex items-center">
          <h2 class="font-medium title-font text-sm text-orange-500 mb-1 tracking-wider uppercase">Diplom
            ma'lumotlari</h2>
        </div>
      </div>
    </template>

    <template v-if="userData.application">
      <div class="flex relative">
        <div
            class="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
        </div>
        <div class="flex-grow pl-4">
          <h2 class="font-medium title-font text-sm text-green-500 mb-1 tracking-wider uppercase">Ariza
            topshirish</h2>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex relative">
        <div
            class="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 inline-flex items-center justify-center text-white relative z-10">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
        </div>
        <div class="flex-grow pl-4">
          <h2 class="font-medium title-font text-sm text-orange-500 mb-1 tracking-wider uppercase">Ariza
            topshirish</h2>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>