<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Button from '@/components/volt/Button.vue';
import Select from '@/components/volt/Select.vue';

const isDark = ref(false);

const BRAND_STORAGE_KEY = 'theme-brand';
const THEME_CLASS_PREFIX = 'p-theme-';

const brandOptions = [
    { value: 'default', label: 'Default' },
    { value: 'jio', label: 'Jio' },
    { value: 'vodafone', label: 'Vodafone' }
];

type BrandValue = 'default' | 'jio' | 'vodafone';
const selectedBrand = ref<BrandValue>('default');

const applyTheme = () => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    if (isDark.value) {
        root.classList.add('p-dark');
    } else {
        root.classList.remove('p-dark');
    }
};

const applyBrandTheme = () => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    root.classList.remove(THEME_CLASS_PREFIX + 'jio', THEME_CLASS_PREFIX + 'vodafone');

    if (selectedBrand.value !== 'default') {
        root.classList.add(THEME_CLASS_PREFIX + selectedBrand.value);
    }
};

onMounted(() => {
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
        isDark.value = stored === 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDark.value = true;
    }

    const storedBrand = window.localStorage.getItem(BRAND_STORAGE_KEY);
    if (storedBrand === 'jio' || storedBrand === 'vodafone' || storedBrand === 'default') {
        selectedBrand.value = storedBrand;
    }

    applyTheme();
    applyBrandTheme();
});

watch(isDark, () => {
    if (typeof window !== 'undefined') {
        const theme = isDark.value ? 'dark' : 'light';
        window.localStorage.setItem('theme', theme);
    }

    applyTheme();
});

watch(selectedBrand, () => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(BRAND_STORAGE_KEY, selectedBrand.value);
    }

    applyBrandTheme();
});

const toggleTheme = () => {
    isDark.value = !isDark.value;
};
</script>


<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
    <header class="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-contrast text-sm font-semibold">
            V
          </span>
          <span class="text-sm font-medium tracking-tight text-slate-900">
            Volt Starter
          </span>
        </div>
        <nav class="hidden items-center gap-6 text-sm font-medium text-slate-500 sm:flex">
          <slot name="nav" />
        </nav>
        <div class="flex justify-end items-center gap-3 mb-6">
            <Select
                v-model="selectedBrand"
                :options="brandOptions"
                option-label="label"
                option-value="value"
                placeholder="Theme"
                class="w-40"
            />
            <Button
                :label="isDark ? 'Switch to Light' : 'Switch to Dark'"
                variant="outlined"
                @click="toggleTheme"
            />
        </div>
      </div>
    </header>

    <main class="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <slot />
    </main>

    <footer class="border-t border-slate-200 bg-white/80">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-slate-500 sm:px-6 lg:px-8">
        <p>&copy; {{ new Date().getFullYear() }} Volt Starter. All rights reserved.</p>
        <div class="flex gap-4">
          <slot name="footer" />
        </div>
      </div>
    </footer>
  </div>




</template>


<style scoped>
</style>

