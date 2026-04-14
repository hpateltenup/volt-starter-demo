<script setup lang="ts">
import GeneralLayout from '@/layouts/GeneralLayout.vue';
</script>

<template>
  <GeneralLayout>
    <template #nav>
      <RouterLink to="/" class="text-sm font-medium text-slate-600 hover:text-slate-500 transition-colors">
        Home
      </RouterLink>
      <RouterLink to="/style-guide" class="text-sm font-medium text-slate-600 hover:text-slate-500 transition-colors">
        Style guide
      </RouterLink>
      <RouterLink to="/storepage" class="text-sm font-medium text-slate-600 hover:text-slate-500 transition-colors">
        Store page
      </RouterLink>
    </template>

    <RouterView />
  </GeneralLayout>
</template>

<style scoped></style>
