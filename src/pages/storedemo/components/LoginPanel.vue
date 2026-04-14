<script setup lang="ts">
import { useUserStore } from '../store/user'
import Button from '@/components/volt/Button.vue'
import SecondaryButton from '@/components/volt/SecondaryButton.vue'

const userStore = useUserStore()
</script>

<template>
    <div>
        <h3>Login Panel</h3>

        <div class="mt-6 flex gap-2">

            <!-- LOGIN BUTTON -->
            <Button v-if="!userStore.isLoggedIn" type="button" @click="userStore.login" :disabled="userStore.loading">
                {{ userStore.loading ? 'Logging in...' : 'Login' }}
            </Button>

            <!-- LOGOUT -->
            <SecondaryButton v-if="userStore.isLoggedIn" type="button" @click="userStore.logout">
                Logout
            </SecondaryButton>

        </div>
    </div>
</template>