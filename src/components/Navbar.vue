<script>
import axios from 'axios'
import {useUserStore} from '@/stores/user'

export default {
  setup() {
    const userStore = useUserStore()

    return {
      userStore
    }
  },

  beforeCreate() {
    this.userStore.initStore()

    const token = this.userStore.user.access

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  }
}
</script>

<template>
  <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round"
             stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
             viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">XIU</span>
      </a>

      <template v-if="userStore.user.isAuthenticated">
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <RouterLink to="/logout" class="mr-5 hover:text-gray-900">Chiqish</RouterLink>
        </nav>

        <RouterLink to="/profile"
                    class="inline-flex items-center text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded mt-4 md:mt-0">
          Profil
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               class="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </RouterLink>
      </template>

      <template v-else>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <RouterLink to="/register" class="mr-5 hover:text-gray-900">Ro'yhatdan o'tish</RouterLink>
        </nav>

        <RouterLink to="/login"
                    class="inline-flex items-center text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded mt-4 md:mt-0">
          Kirish
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
               class="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </RouterLink>
      </template>



    </div>
  </header>
</template>

<style scoped>

</style>