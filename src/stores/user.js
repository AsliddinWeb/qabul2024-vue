import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
            isAuthenticated: false,
            id: null,
            phone_number: null,
            is_active: null,
            passport: null,
            diplom: null,
            application: null,
            perevod_diplom: null,
            access: null,
            refresh: null
        }
    }),

    actions: {
        initStore() {
            console.log('initStore', localStorage.getItem('user.access'))

            if (localStorage.getItem('user.access')) {
                console.log('User has access!')

                this.user.access = localStorage.getItem('user.access')
                this.user.refresh = localStorage.getItem('user.refresh')
                this.user.id = localStorage.getItem('user.id')
                this.user.phone_number = localStorage.getItem('user.phone_number')
                this.user.is_active = localStorage.getItem('user.is_active')
                this.user.application = localStorage.getItem('user.application')
                this.user.passport = localStorage.getItem('user.passport')
                this.user.diplom = localStorage.getItem('user.diplom')
                this.user.perevod_diplom = localStorage.getItem('user.perevod_diplom')
                this.user.isAuthenticated = true

                this.refreshToken()

                console.log('Initialized user:', this.user)
            }
        },

        setToken(data) {
            console.log('setToken', data)

            this.user.access = data.access
            this.user.refresh = data.refresh
            this.user.isAuthenticated = true

            localStorage.setItem('user.access', data.access)
            localStorage.setItem('user.refresh', data.refresh)

            console.log('user.access: ', localStorage.getItem('user.access'))
        },

        setGetMe(data) {
            console.log('setGetMe', data)

            this.user.access = data.access
            this.user.refresh = data.refresh
            this.user.isAuthenticated = true

            localStorage.setItem('user.id', data.id)
            localStorage.setItem('user.phone_number', data.phone_number)
            localStorage.setItem('user.is_active', data.is_active)
            localStorage.setItem('user.passport', JSON.stringify(data.passport))
            localStorage.setItem('user.perevod_diplom', JSON.stringify(data.perevod_diplom))
            localStorage.setItem('user.diplom', JSON.stringify(data.diplom))
            localStorage.setItem('user.application', JSON.stringify(data.application))
        },

        registerUser(phone_number) {
            console.log('number', phone_number)

            localStorage.setItem('register_number', phone_number)

        },

        removeToken() {
            console.log('removeToken')

            this.user.access = null
            this.user.refresh = null
            this.user.id = null
            this.user.phone_number = null
            this.user.is_active = null
            this.user.passport = null
            this.user.diplom = null
            this.user.perevod_diplom = null
            this.user.application = null
            this.user.isAuthenticated = false

            localStorage.setItem('user.access', '')
            localStorage.setItem('user.refresh', '')
            localStorage.setItem('user.id', '')
            localStorage.setItem('user.phone_number', '')
            localStorage.setItem('user.is_active', '')
            localStorage.setItem('user.passport', '')
            localStorage.setItem('user.diplom', '')
            localStorage.setItem('user.perevod_diplom', '')
            localStorage.setItem('user.isAuthenticated', '')
        },

        setUserInfo(user) {
            console.log('setUserInfo', user)

            this.user.id = user.id
            this.user.phone_number = user.phone_number
            this.user.is_active = user.is_active
            this.user.passport = user.passport
            this.user.diplom = user.diplom
            this.user.perevod_diplom = user.perevod_diplom

            localStorage.setItem('user.id', this.user.id)
            localStorage.setItem('user.phone_number', this.user.phone_number)
            localStorage.setItem('user.is_active', this.user.is_active)
            localStorage.setItem('user.passport', this.user.passport)
            localStorage.setItem('user.diplom', this.user.diplom)
            localStorage.setItem('user.perevod_diplom', this.user.perevod_diplom)

            console.log('User', this.user)
        },

        refreshToken() {
            axios.post('/auth/token-refresh/', {
                refresh: this.user.refresh
            })
                .then((response) => {
                    this.user.access = response.data.access

                    localStorage.setItem('user.access', response.data.access)

                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
                })
                .catch((error)=>{
                    console.log(error)

                    this.removeToken()
                })
        },
    }
})