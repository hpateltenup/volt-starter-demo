<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Button from '@/components/volt/Button.vue';
import Card from '@/components/volt/Card.vue';
import Select from '@/components/volt/Select.vue';
import Chip from '@/components/volt/Chip.vue';

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
    <section class="max-w-full">
       
        <div>
            <h2 class="font-bold text-2xl">Prime Blocks</h2>
            <p class="mt-6 text-sm text-gray-400">
            Visit
            <a
                href="https://primeblocks.org/free"
                target="_blank"
                rel="noopener"
                class="font-medium text-primary hover:text-primary-emphasis underline-offset-4 hover:underline"
            >
            primeblocks.org/free
            </a>
            to read the documentation.
        </p>

            <div class="bg-surface-50 dark:bg-surface-950 p-4">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-2xl flex flex-col gap-4">
            <div class="flex gap-4">
                <div class="flex flex-col gap-2 flex-1">
                    <div class="text-2xl leading-tight font-semibold text-surface-900 dark:text-surface-0">Card Title</div>
                    <div class="text-base leading-tight text-surface-500 dark:text-surface-300">Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.</div>
                </div>
            </div>
            <div class="flex flex-1">
                <div class="flex-1 border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-lg h-[150px]" />
            </div>
        </div>
            </div>

            <br>
            
            <div class="bg-surface-0 dark:bg-surface-950 p-4">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2 pb-4">
                <div class="font-semibold text-xl text-surface-900 dark:text-surface-0 leading-tight">Movie Information</div>
                <div class="text-surface-500 dark:text-surface-300 text-base leading-tight">Morbi tristique blandit turpis. In viverra ligula id nulla hendrerit rutrum.</div>
            </div>

            <div class="border-t border-surface-200 dark:border-surface-700" />

            <div class="flex flex-col gap-4">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex items-center gap-4 flex-1">
                        <div class="w-[140px] text-surface-900 dark:text-surface-0 font-medium text-base leading-tight">Title</div>
                        <div class="flex-1 text-surface-900 dark:text-surface-0 text-base leading-tight">Heat</div>
                    </div>
                    <div class="flex justify-end">
                        <Button icon="pi pi-pen-to-square" rounded outlined severity="secondary" icon-only class="shrink-0" />
                    </div>
                </div>

                <div class="border-t border-surface-200 dark:border-surface-700" />

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex items-center gap-4 flex-1">
                        <div class="w-[140px] text-surface-900 dark:text-surface-0 font-medium text-base leading-tight">Genre</div>
                        <div class="flex-1 flex flex-wrap gap-2">
                            <Chip label="Crime" severity="secondary" />
                            <Chip label="Drama" severity="secondary" />
                            <Chip label="Thriller" severity="secondary" />
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <Button icon="pi pi-pen-to-square" rounded outlined severity="secondary" icon-only class="shrink-0" />
                    </div>
                </div>

                <div class="border-t border-surface-200 dark:border-surface-700" />

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex items-center gap-4 flex-1">
                        <div class="w-[140px] text-surface-900 dark:text-surface-0 font-medium text-base leading-tight">Director</div>
                        <div class="flex-1 text-surface-900 dark:text-surface-0 text-base leading-tight">Michael Mann</div>
                    </div>
                    <div class="flex justify-end">
                        <Button icon="pi pi-pen-to-square" rounded outlined severity="secondary" icon-only class="shrink-0" />
                    </div>
                </div>

                <div class="border-t border-surface-200 dark:border-surface-700" />

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex items-center gap-4 flex-1">
                        <div class="w-[140px] text-surface-900 dark:text-surface-0 font-medium text-base leading-tight">Writer</div>
                        <div class="flex-1 text-surface-900 dark:text-surface-0 text-base leading-tight">Michael Mann</div>
                    </div>
                    <div class="flex justify-end">
                        <Button icon="pi pi-pen-to-square" rounded outlined severity="secondary" icon-only class="shrink-0" />
                    </div>
                </div>

                <div class="border-t border-surface-200 dark:border-surface-700" />

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex items-start gap-4 flex-1">
                        <div class="w-[140px] text-surface-900 dark:text-surface-0 font-medium text-base leading-tight">Plot</div>
                        <div class="flex-1 text-surface-900 dark:text-surface-0 text-base leading-normal">
                            A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist.
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <Button icon="pi pi-pen-to-square" rounded outlined severity="secondary" icon-only class="shrink-0" />
                    </div>
                </div>

                <div class="border-t border-surface-200 dark:border-surface-700" />
            </div>
        </div>
            </div>

            <br>

            <div class="bg-surface-0 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">
        <ul class="list-none p-0 m-0 flex items-center font-medium mb-5">
            <li>
                <a class="text-surface-500 dark:text-surface-300 no-underline leading-normal cursor-pointer">Application</a>
            </li>
            <li class="px-2">
                <i class="pi pi-angle-right text-surface-500 dark:text-surface-300 text-sm! leading-normal!" />
            </li>
            <li>
                <span class="text-surface-900 dark:text-surface-0 leading-normal">Analytics</span>
            </li>
        </ul>
        <div class="flex items-start flex-col md:justify-between md:flex-row">
            <div>
                <div class="font-bold text-3xl text-surface-900 dark:text-surface-0 mb-4">Customers</div>
                <div class="flex items-center text-surface-700 dark:text-surface-300 flex-wrap gap-8">
                    <div class="flex items-center gap-2">
                        <i class="pi pi-users text-base! leading-normal!" />
                        <span>332 Active Users</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="pi pi-globe text-base! leading-normal!" />
                        <span>9.402 Sessions</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="pi pi-clock text-base! leading-normal!" />
                        <span>2.32m Avg. Duration</span>
                    </div>
                </div>
            </div>
            <div class="mt-6 md:mt-0 flex items-center">
                <Button label="Add" class="mr-3" outlined icon="pi pi-user-plus" />
                <Button label="Save Changes" icon="pi pi-check" class="whitespace-nowrap" />
            </div>
        </div>
    </div>

    <br>

    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-2">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl">
                <div class="flex justify-between gap-4">
                    <div class="flex flex-col gap-2">
                        <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Messages</span>
                        <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">152</div>
                    </div>
                    <div class="flex items-center justify-center bg-linear-to-b from-cyan-400 dark:from-cyan-300 to-cyan-600 dark:to-cyan-500 rounded-lg w-10 h-10">
                        <i class="pi pi-envelope text-surface-0 dark:text-surface-900 text-xl! leading-none!" />
                    </div>
                </div>
                <div class="mt-4">
                    <span class="text-surface-600 dark:text-surface-300 font-medium leading-tight">24 new</span>
                    <span class="text-surface-500 dark:text-surface-300 leading-tight"> since last visit</span>
                </div>
            </div>

            <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl">
                <div class="flex justify-between gap-4">
                    <div class="flex flex-col gap-2">
                        <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Check-ins</span>
                        <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">532</div>
                    </div>
                    <div class="flex items-center justify-center bg-linear-to-b from-orange-400 dark:from-orange-300 to-orange-600 dark:to-orange-500 rounded-lg w-10 h-10">
                        <i class="pi pi-map-marker text-surface-0 dark:text-surface-900 text-xl! leading-none!" />
                    </div>
                </div>
                <div class="mt-4">
                    <span class="text-surface-600 dark:text-surface-300 font-medium leading-tight">48 new</span>
                    <span class="text-surface-500 dark:text-surface-300 leading-tight"> since last visit</span>
                </div>
            </div>

            <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl">
                <div class="flex justify-between gap-4">
                    <div class="flex flex-col gap-2">
                        <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Files Synced</span>
                        <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">28.441</div>
                    </div>
                    <div class="flex items-center justify-center bg-linear-to-b from-slate-400 dark:from-slate-300 to-slate-600 dark:to-slate-500 rounded-lg w-10 h-10">
                        <i class="pi pi-file text-surface-0 dark:text-surface-900 text-xl! leading-none!" />
                    </div>
                </div>
                <div class="mt-4">
                    <span class="text-surface-500 dark:text-surface-300 leading-tight">32,56 / 250 GB</span>
                </div>
            </div>

            <div class="bg-surface-0 dark:bg-surface-900 shadow-sm p-5 rounded-2xl">
                <div class="flex justify-between gap-4">
                    <div class="flex flex-col gap-2">
                        <span class="text-surface-700 dark:text-surface-300 font-normal leading-tight">Users Online</span>
                        <div class="text-surface-900 dark:text-surface-0 font-semibold text-2xl! leading-tight!">25.660</div>
                    </div>
                    <div class="flex items-center justify-center bg-linear-to-b from-violet-400 dark:from-violet-300 to-violet-600 dark:to-violet-500 rounded-lg w-10 h-10">
                        <i class="pi pi-users text-surface-0 dark:text-surface-900 text-xl! leading-none!" />
                    </div>
                </div>
                <div class="mt-4">
                    <span class="text-surface-600 dark:text-surface-300 font-medium leading-tight">72 new</span>
                    <span class="text-surface-500 dark:text-surface-300 leading-tight"> user this week</span>
                </div>
            </div>
        </div>
    </div>

    <br>

    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div class="flex flex-col gap-4 items-center justify-center mb-12">
            <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl lg:text-5xl text-center leading-tight">Pricing Plans</div>
            <div class="text-surface-500 dark:text-surface-400 text-lg text-center leading-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
        </div>

        <div class="flex lg:flex-row flex-col gap-8 max-w-7xl mx-auto">
            <div class="w-full flex-1 p-8 flex rounded-2xl flex-col bg-surface-0 dark:bg-surface-800 shadow-sm gap-6">
                <div class="flex flex-col gap-2">
                    <h4 class="text-surface-900 dark:text-surface-0 font-medium text-xl leading-tight">Basic</h4>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</p>
                </div>

                <div class="w-full h-px bg-surface-200 dark:bg-surface-700" />
                <div class="flex items-center gap-2">
                    <span class="font-bold text-3xl text-surface-900 dark:text-surface-0 leading-tight">$9</span>
                    <span class="font-medium text-surface-500 dark:text-surface-400 leading-tight">per month</span>
                </div>
                <div class="w-full h-px bg-surface-200 dark:bg-surface-600" />
                <ul class="list-none flex flex-col gap-4 flex-1">
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Arcu vitae elementum </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Dui faucibus in ornare </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Morbi tincidunt augue </span>
                    </li>
                </ul>
                <Button label="Buy Now" rounded class="w-full" />
            </div>
            <div class="w-full flex-1 p-8 flex rounded-2xl flex-col bg-surface-0 dark:bg-surface-800 shadow-sm gap-6">
                <div class="flex flex-col gap-2">
                    <h4 class="text-surface-900 dark:text-surface-0 font-medium text-xl leading-tight">Premium</h4>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</p>
                </div>

                <div class="w-full h-px bg-surface-200 dark:bg-surface-700" />
                <div class="flex items-center gap-2">
                    <span class="font-bold text-3xl text-surface-900 dark:text-surface-0 leading-tight">$29</span>
                    <span class="font-medium text-surface-500 dark:text-surface-400 leading-tight">per month</span>
                </div>
                <div class="w-full h-px bg-surface-200 dark:bg-surface-600" />
                <ul class="list-none flex flex-col gap-4 flex-1">
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Arcu vitae elementum </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Dui faucibus in ornare </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Morbi tincidunt augue </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Duis ultricies lacus sed </span>
                    </li>
                </ul>
                <Button label="Buy Now" rounded class="w-full" />
            </div>
            <div class="w-full flex-1 p-8 flex rounded-2xl flex-col bg-surface-0 dark:bg-surface-800 shadow-sm gap-6">
                <div class="flex flex-col gap-2">
                    <h4 class="text-surface-900 dark:text-surface-0 font-medium text-xl leading-tight">Enterprise</h4>
                    <p class="text-surface-500 dark:text-surface-400 leading-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</p>
                </div>

                <div class="w-full h-px bg-surface-200 dark:bg-surface-700" />
                <div class="flex items-center gap-2">
                    <span class="font-bold text-3xl text-surface-900 dark:text-surface-0 leading-tight">$49</span>
                    <span class="font-medium text-surface-500 dark:text-surface-400 leading-tight">per month</span>
                </div>
                <div class="w-full h-px bg-surface-200 dark:bg-surface-600" />
                <ul class="list-none flex flex-col gap-4 flex-1">
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Arcu vitae elementum </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Dui faucibus in ornare </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Morbi tincidunt augue </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Duis ultricies lacus sed </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-lg! text-green-500" />
                        <span class="text-surface-800 dark:text-surface-100 leading-tight"> Imperdiet proin </span>
                    </li>
                </ul>
                <Button label="Buy Now" rounded class="w-full" />
            </div>
        </div>
    </div>

    <br>


        </div>

        <div>
            <h2 class="font-bold text-2xl">Volt UI Components</h2>
            <Card style="width: 25rem; overflow: hidden">
            <template #header>
                <img
                    alt="user header"
                    class="w-full"
                    src="https://primefaces.org/cdn/primevue/images/card-vue.jpg"
                />
            </template>
            <template #title>Advanced Card</template>
            <template #subtitle>Card subtitle</template>
            <template #content>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
                    consequuntur error repudiandae numquam deserunt quisquam repellat libero
                    asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                    neque quas!
                </p>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button label="Cancel" severity="secondary" variant="outlined" class="w-full" />
                    <Button label="Save" class="w-full" />
                </div>
            </template>
        </Card>

        <p class="mt-6 text-sm text-gray-400">
            Visit
            <a
                href="https://vuejs.org/"
                target="_blank"
                rel="noopener"
                class="font-medium text-primary hover:text-primary-emphasis underline-offset-4 hover:underline"
            >
                vuejs.org
            </a>
            to read the documentation.
        </p>

        <div class="card flex flex-wrap items-center justify-center gap-4">
            <Button label="Small" icon="pi pi-check" size="small" />
            <Button label="Normal" icon="pi pi-check" />
            <Button label="Large" icon="pi pi-check" size="large" />
        </div>
        </div>

       
    </section>
</template>

<style scoped>
</style>

