<script>
import Sidebar from "@/components/Sidebar.vue";
import {useUserStore} from "@/stores/user.js";

export default {
  name: "LogoutView",
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    }
  },
  components: {
    Sidebar
  },
  methods: {
    logoutHandler() {
      this.userStore.removeToken();
      this.$router.push("/login");

    }
  }
}
</script>

<template>
  <main>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto flex flex-wrap">

        <div class="flex flex-wrap w-full">
          <Sidebar/>

          <div class="lg:w-3/4 mx-auto">
            <section class="text-gray-600 body-font">
              <div class="mx-auto flex px-5 items-center justify-center flex-col">
                <svg class="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/>
                  <path d="M7 12h14l-3 -3m0 6l3 -3"/>
                </svg>
                <div class="text-center lg:w-2/3 w-full">
                  <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Rostdan ham tizimni tark etmoqchimisiz?</h1>
                  <p class="mb-8 leading-relaxed">Tizimdan chiqib ketgan taqdiringizda barcha ma'lumotlar saqlanib qoladi. Shaxsiy parolingizni yodingizda saqlang!</p>
                  <div class="flex justify-center">

                    <button @click="logoutHandler" class="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">Ha</button>
                    <RouterLink to="/profile" class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Tizimga qaytish</RouterLink>

<!--                    <RouterLink to="/profile"-->
<!--                        class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">-->
<!--                      Tizimga qaytish-->
<!--                    </RouterLink>-->
<!--                    <button @click="logoutHandler"-->
<!--                        class="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">-->
<!--                      Ha-->
<!--                    </button>-->
                  </div>
                </div>
              </div>
            </section>
          </div>
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