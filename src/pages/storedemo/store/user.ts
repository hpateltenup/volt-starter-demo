import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi } from '../services/auth.service'

export const useUserStore = defineStore('userStoreId', () => {

  const name = ref('')
  const email = ref('')
  const isLoggedIn = ref(false)
  const loading = ref(false)

  const userInfo = computed(() => {
    return `${name.value} (${email.value})`
  })

  async function login() {
    loading.value = true

    try {
      const res = await loginApi()

      name.value = res.name
      email.value = res.email
      isLoggedIn.value = true

    } finally {
      loading.value = false
    }
  }

  function logout() {
    name.value = ''
    email.value = ''
    isLoggedIn.value = false
  }

  return {
    name,
    email,
    isLoggedIn,
    loading,
    userInfo,
    login,
    logout
  }
})