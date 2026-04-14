<script setup lang="ts">
import { useUserStore } from '../store/user'

const userStore = useUserStore()
</script>

<template>
    <div class="p-2 my-5 border-2 border-surface-400 rounded-lg">
        <h3 class="">User Profile</h3>

        <p v-if="userStore.isLoggedIn">
            {{ userStore.userInfo }}
        </p>

        <p v-else>
            Not logged in
        </p>
    </div>
</template>