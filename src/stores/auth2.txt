import { defineStore } from 'pinia'
import axiosClient from "@/api/api.js";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: localStorage.getItem('access') || null,
        refreshToken: localStorage.getItem('refresh') || null,
    }),
    getters: {
        isLoggedIn: (state) => !!state.accessToken,
    },
    actions: {
        async login(credentials) {
            try {
                const response = await axiosClient.post('auth/login/', credentials);
                this.accessToken = response.data.access;
                this.refreshToken = response.data.refresh;
                // const expiresIn = Date.now() + (response.data.expires_in * 1000);
                localStorage.setItem('access', this.accessToken);
                localStorage.setItem('refresh', this.refreshToken);
                return response;
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },
        async register(formData) {
            try {
                const response = await axiosClient.post('auth/register/', formData)

                // localStorage.setItem('user', response.data)
                console.log(response.data)
                return response
            } catch (error) {
                console.error('Register error:', error)
            }
        },
        async getMe() {
            const token = localStorage.getItem('access');
            try {
                const response = await axiosClient.get(`auth/getMe/`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Bearer token bilan so'rov yuborish
                    }
                });
                return response
                // if (response.status === 200) {
                //   return response.data
                // } else {
                //   // this.logout()
                //   return false
                // }
                // Serverdan kelgan javobni qaytarish
            } catch (error) {
                return false
            }
        },
        async verifyPhone(data) {
            try {
                const response = await axiosClient.post('auth/verify-phone/', data);
                // Assuming the verification might affect token or user status
                return response.data;
            } catch (error) {
                console.error('Verification error:', error);
                throw error;
            }
        },
        async resetPassword(data) {
            try {
                const response = await axiosClient.post('auth/reset-password/', data);
                // Assuming the verification might affect token or user status
                return response.data;
            } catch (error) {
                console.error('Reset Password error:', error);
                throw error;
            }
        },
        async resetPasswordVerify(data) {
            try {
                const response = await axiosClient.post('auth/reset-password-verify/', data);
                // Assuming the verification might affect token or user status
                return response.data;
            } catch (error) {
                console.error('Reset Password error:', error);
                throw error;
            }
        },
        async resendSMS(phoneNumber) {
            try {
                const response = await axiosClient.post('auth/resend-sms/', { phone_number: phoneNumber });
                return response.data;
            } catch (error) {
                console.error('Resend SMS error:', error);
                throw error;
            }
        },
        async refreshAuthToken() {
            try {
                const response = await axiosClient.post('auth/token/refresh/', {
                    refresh: this.refreshToken
                });
                this.accessToken = response.data.access;
                localStorage.setItem('access_token', this.accessToken);
                return response;
            } catch (error) {
                console.error('Token refresh error:', error);
                logout(); // If refresh fails, force logout
            }
        },

        checkTokenValidity() {
            if (this.isTokenExpired) {
                this.refreshAuthToken(); // Automatically attempt to refresh token if it's expired
            }
        },
        async logout() {
            this.accessToken = null;
            this.refreshToken = null;
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        },
    }
})