<script setup lang="ts">
import Button from '@/components/volt/Button.vue';
import Card from '@/components/volt/Card.vue';
import Select from '@/components/volt/Select.vue';
import ContrastButton from '@/components/volt/ContrastButton.vue';
import DangerButton from '@/components/volt/DangerButton.vue';
import SecondaryButton from '@/components/volt/SecondaryButton.vue';

    const controlSections = [
        { id: 'buttons', label: 'Buttons' },
        { id: 'form-controls', label: 'Form controls' }
    ] as const;

const scrollToSection = (id: (typeof controlSections)[number]['id']) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};
</script>

<template>
    <section class="space-y-8">
        <header class="space-y-2">
            <p class="text-sm font-semibold text-primary-600">System</p>
            <h1 class="text-3xl font-semibold tracking-tight text-slate-900">
                Style guide
            </h1>
            <p class="text-sm text-slate-600 max-w-2xl">
                A quick overview of the core UI elements available in this starter template,
                including buttons, cards, and form controls.
            </p>
        </header>

        <div class="md:flex md:items-start md:gap-10">
            <nav
                class="mb-6 space-y-3 rounded-xl border border-slate-200 bg-white/70 p-3 shadow-sm md:mb-0 md:w-56 md:flex-none md:sticky md:top-24"
            >
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Controls
                </p>
                <ul class="space-y-1 text-sm">
                    <li v-for="section in controlSections" :key="section.id">
                        <button
                            type="button"
                            class="w-full text-left px-2 py-1 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            @click="scrollToSection(section.id)"
                        >
                            {{ section.label }}
                        </button>
                    </li>
                </ul>
            </nav>

            <div class="flex-1 space-y-6">
                <div id="buttons">
                    <Card>
                        <template #title>
                            <span class="text-base font-bold tracking-tight text-slate-900">
                                Buttons
                            </span>
                        </template>
                        <template #subtitle>Primary actions</template>
                        <template #content>
                            <div class="space-y-6">
                        <div class="space-y-3">
                            <p class="text-xs font-medium uppercase tracking-wide text-slate-500">
                                Examples
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <Button label="Primary" />
                                <Button label="Outlined" variant="outlined" />
                                <Button label="Text" variant="text" />
                                <Button label="Raised" variant="text" raised />
                                <SecondaryButton label="Secondary" />
                                <ContrastButton label="Contrast" />
                                <DangerButton label="Danger" />
                                <Button label="With icon" icon="pi pi-check" />
                                <Button label="Loading" :loading="true" />
                                <Button label="Disabled" :disabled="true" />
                            </div>
                        </div>

                        <div class="space-y-3 border-t border-slate-200 pt-4">
                            <p class="text-xs font-medium uppercase tracking-wide text-slate-500">
                                Props
                            </p>
                            <p class="text-xs text-slate-500">
                                The `Button` component is a Volt wrapper around the PrimeVue Button and
                                forwards all of its props. Below are the most commonly used ones.
                            </p>

                            <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                                <table class="min-w-full text-left text-xs">
                                    <thead class="bg-slate-50 text-slate-500 uppercase tracking-wide">
                                        <tr>
                                            <th class="px-3 py-2 font-semibold">Prop</th>
                                            <th class="px-3 py-2 font-semibold">Type</th>
                                            <th class="px-3 py-2 font-semibold">Default</th>
                                            <th class="px-3 py-2 font-semibold">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-200 text-slate-700">
                                        <tr>
                                            <td class="px-3 py-2 font-mono text-[11px]">label</td>
                                            <td class="px-3 py-2 text-[11px]">string</td>
                                            <td class="px-3 py-2 text-[11px] text-slate-400">undefined</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                Text label displayed inside the button.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-2 font-mono text-[11px]">icon</td>
                                            <td class="px-3 py-2 text-[11px]">string</td>
                                            <td class="px-3 py-2 text-[11px] text-slate-400">undefined</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                Icon class (e.g. <code>pi pi-check</code>) rendered alongside
                                                the label.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-2 font-mono text-[11px]">iconPos</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                'left' | 'right' | 'top' | 'bottom'
                                            </td>
                                            <td class="px-3 py-2 text-[11px] text-slate-400">'left'</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                Where to place the icon relative to the label.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-2 font-mono text-[11px]">severity</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | 'contrast'
                                            </td>
                                            <td class="px-3 py-2 text-[11px] text-slate-400">'primary'</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                Visual emphasis / color of the button.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-2 font-mono text-[11px]">variant</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                'outlined' | 'text' | 'link' | 'plain'
                                            </td>
                                            <td class="px-3 py-2 text-[11px] text-slate-400">'plain'</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                Overall visual style such as outlined or text-only.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-2 font-mono text-[11px]">size</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                'small' | 'large'
                                            </td>
                                            <td class="px-3 py-2 text-[11px] text-slate-400">undefined</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                Adjusts padding and font-size for compact or prominent buttons.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-2 font-mono text-[11px]">loading</td>
                                            <td class="px-3 py-2 text-[11px]">boolean</td>
                                            <td class="px-3 py-2 text-[11px] text-slate-400">false</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                Shows a spinner and disables the button while true.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-2 font-mono text-[11px]">disabled</td>
                                            <td class="px-3 py-2 text-[11px]">boolean</td>
                                            <td class="px-3 py-2 text-[11px] text-slate-400">false</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                Disables the button and prevents user interaction.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-2 font-mono text-[11px]">badge</td>
                                            <td class="px-3 py-2 text-[11px]">string</td>
                                            <td class="px-3 py-2 text-[11px] text-slate-400">undefined</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                Small badge value displayed on the button (e.g. notification
                                                count).
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-2 font-mono text-[11px]">type</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                'button' | 'submit' | 'reset'
                                            </td>
                                            <td class="px-3 py-2 text-[11px] text-slate-400">'button'</td>
                                            <td class="px-3 py-2 text-[11px]">
                                                Native button type when used inside forms.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                            </div>
                        </template>
                    </Card>
                </div>

                <div id="form-controls">
                    <Card>
                        <template #title>
                            <span class="text-base font-bold tracking-tight text-slate-900">
                                Form controls
                            </span>
                        </template>
                        <template #subtitle>Inputs and selects</template>
                        <template #content>
                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <label class="block text-xs font-medium text-slate-700">
                                        Select
                                    </label>
                                    <Select
                                        :options="[
                                            { label: 'Option A', value: 'a' },
                                            { label: 'Option B', value: 'b' },
                                            { label: 'Option C', value: 'c' }
                                        ]"
                                        placeholder="Pick an option"
                                        class="w-full"
                                    />
                                </div>

                                <p class="text-xs text-slate-500">
                                    These controls are wired to the same design tokens and themes as the
                                    rest of the system.
                                </p>
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
</style>

