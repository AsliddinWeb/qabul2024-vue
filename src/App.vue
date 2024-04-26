<script>
import axios from 'axios'
import Toast from '@/components/Toast.vue'
import { useUserStore } from '@/stores/user'
import Navbar from "@/components/Navbar.vue";

export default {
  setup() {
    const userStore = useUserStore()

    return {
      userStore,
      errors: []
    }
  },

  components: {
    Navbar,
    Toast
  },

  beforeCreate() {
    this.userStore.initStore()
    this.errors = []

    // const token = this.userStore.user.access

    // if (token) {
    //   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    //
    //   axios
    //       .get('/auth/getMe/')
    //       .then(response => {
    //         this.userStore.setGetMe(response.data);
    //         axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
    //       })
    //       .catch(error => {
    //         console.log('error', error);
    //         this.$router.push('/login');
    //         this.errors.push('Tizimga qayta kiring!');
    //         this.toastStore.showToast(3000, 'Tizimga qayta kiring!', 'bg-red-500 text-white')
    //       })
    //
    //
    // } else {
    //   axios.defaults.headers.common["Authorization"] = "";
    // }
  }
}
</script>

<template>
  <Navbar />
  <RouterView />

  <Toast />
</template>

<style scoped>

</style>
