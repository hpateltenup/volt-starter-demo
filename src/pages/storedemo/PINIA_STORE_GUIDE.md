# Pinia Store Demo — Complete Guide

A beginner-friendly walkthrough of how Pinia (Vue's state management library) works, using a simple login/logout demo as the example.

---

## Table of Contents

1. [What is Pinia and Why Do We Need It?](#1-what-is-pinia-and-why-do-we-need-it)
2. [Project Structure](#2-project-structure)
3. [The Big Picture — What Happens When You Click Login](#3-the-big-picture--what-happens-when-you-click-login)
4. [File-by-File Deep Dive](#4-file-by-file-deep-dive)
   - [auth.types.ts — Describing the Data Shape](#41-authtypests--describing-the-data-shape)
   - [auth.service.ts — The Fake API Call](#42-authservicets--the-fake-api-call)
   - [store/user.ts — The Pinia Store (Main Star)](#43-storeuserts--the-pinia-store-main-star)
   - [LoginPanel.vue — The Buttons](#44-loginpanelvue--the-buttons)
   - [UserProfile.vue — Showing User Info](#45-userprofilevue--showing-user-info)
   - [StorepageDemo.vue — The Page](#46-storepagedemo-vue--the-page)
   - [router/index.ts — The URL Route](#47-routerindexts--the-url-route)
   - [App.vue — The Nav Link](#48-appvue--the-nav-link)
5. [Key Pinia Concepts Explained Simply](#5-key-pinia-concepts-explained-simply)
6. [Full Data Flow Diagram](#6-full-data-flow-diagram)
7. [Quick Reference Table](#7-quick-reference-table)

---

## 1. What is Pinia and Why Do We Need It?

### Think of it like a shared whiteboard

Imagine you have two people (components) in a room — one handles the login button, another shows your profile. Both of them need to know if the user is logged in.

Without a shared place to store that info, you'd have to keep passing it back and forth like a game of telephone — messy and error-prone.

**Pinia is that shared whiteboard.** Any component in your entire app can read from it or write to it. When the whiteboard updates, every component that's watching it automatically refreshes.

### What problem does it solve?

| Without Pinia | With Pinia |
|---|---|
| Pass data down through many components via props | Any component reads directly from the store |
| Hard to keep components in sync | All components see the same state automatically |
| State scattered across many files | State lives in one organized place |

### What this demo shows

This demo builds a minimal login flow:
- A **Login button** that fetches user data from a (fake) API
- A **User Profile** section that shows the logged-in user's name and email
- A **Logout button** that clears everything

Both the login button and the user profile talk to the same Pinia store — that's the whole point.

---

## 2. Project Structure

```
src/pages/storedemo/
│
├── StorepageDemo.vue          ← The page itself (just combines the two components below)
│
├── components/
│   ├── LoginPanel.vue         ← Shows Login or Logout button based on store state
│   └── UserProfile.vue        ← Shows user name/email or "Not logged in"
│
├── store/
│   └── user.ts                ← THE PINIA STORE — the central brain of this demo
│
├── services/
│   └── auth.service.ts        ← Pretends to be an API, returns fake user data after 1.5s
│
└── types/
    └── auth.types.ts          ← TypeScript definition: what shape does user data have?
```

**In plain English:**
- `types/` — defines what user data *looks like*
- `services/` — handles talking to the (fake) API
- `store/` — holds and manages all the shared state
- `components/` — the visual UI pieces that read from the store
- `StorepageDemo.vue` — the page that puts it all together

---

## 3. The Big Picture — What Happens When You Click Login

```
User clicks "Login" button
        │
        ▼
LoginPanel.vue calls → userStore.login()
        │
        ▼
store/user.ts sets loading = true
(button shows "Logging in..." and disables)
        │
        ▼
store calls → loginApi() from auth.service.ts
        │
        ▼
auth.service.ts waits 1.5 seconds (simulating a real API)
then returns → { name: "John Doe", email: "john@example.com" }
        │
        ▼
store/user.ts receives the response:
  • sets name = "John Doe"
  • sets email = "john@example.com"
  • sets isLoggedIn = true
  • sets loading = false
        │
        ▼
Vue automatically re-renders every component watching the store:
  • LoginPanel.vue: Login button disappears, Logout button appears
  • UserProfile.vue: Shows "John Doe (john@example.com)"
```

**Clicking Logout** is simpler — it just resets everything in the store back to empty/false, and both components update instantly.

---

## 4. File-by-File Deep Dive

---

### 4.1 `auth.types.ts` — Describing the Data Shape

**Full file:**

```typescript
export interface LoginResponse {
  name: string
  email: string
}
```

**What is this?**

Think of an `interface` in TypeScript as a *description form*. It says: "Any piece of data called a `LoginResponse` MUST have a `name` field (text) and an `email` field (text)."

It doesn't store actual data — it just describes what valid data looks like.

**Why is this useful?**

If you accidentally try to use a field that doesn't exist (like `loginResponse.username`), TypeScript will warn you immediately before you even run the app. It's a safety net.

This interface is used in two places:
- `auth.service.ts` uses it to describe what the fake API returns
- `store/user.ts` uses it to safely read the returned data

---

### 4.2 `auth.service.ts` — The Fake API Call

**Full file:**

```typescript
import type { LoginResponse } from '../types/auth.types'

export function loginApi(): Promise<LoginResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        email: 'john@example.com'
      })
    }, 1500)
  })
}
```

**Breaking this down line by line:**

```typescript
import type { LoginResponse } from '../types/auth.types'
```
Importing the shape description we defined earlier so TypeScript knows what this function will return.

```typescript
export function loginApi(): Promise<LoginResponse> {
```
Defining a function called `loginApi` that is exported (so other files can use it). The `: Promise<LoginResponse>` part means: "this function will eventually give you a `LoginResponse` — not right now, but after some async work."

```typescript
return new Promise((resolve) => {
```
A `Promise` is like placing an order at a restaurant — you don't get the food immediately, but you will. `resolve` is the function you call when the food is ready.

```typescript
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        email: 'john@example.com'
      })
    }, 1500)
```
`setTimeout` waits **1500 milliseconds (1.5 seconds)** before calling `resolve`. This simulates the delay of a real network request. After 1.5 seconds, it delivers the fake user data.

**In simple terms:** This function pretends to be a server. You call it, it "thinks" for 1.5 seconds, then gives back hardcoded user data. In a real app, you'd replace this with an actual `fetch()` or `axios` call to your backend.

---

### 4.3 `store/user.ts` — The Pinia Store (Main Star)

**Full file:**

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi } from '../services/auth.service'

export const useUserStore = defineStore('userStoreId', () => {

  // STATE — the data we're storing
  const name = ref('')
  const email = ref('')
  const isLoggedIn = ref(false)
  const loading = ref(false)

  // COMPUTED — a value automatically calculated from state
  const userInfo = computed(() => {
    return `${name.value} (${email.value})`
  })

  // ACTION — async function to log in
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

  // ACTION — sync function to log out
  function logout() {
    name.value = ''
    email.value = ''
    isLoggedIn.value = false
  }

  // Everything the store exposes to components
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
```

**Breaking this down section by section:**

#### Imports

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi } from '../services/auth.service'
```

- `defineStore` — Pinia's function for creating a new store
- `ref` — Vue's way of making a variable "reactive" (when it changes, the UI updates)
- `computed` — Vue's way of making a value that auto-recalculates when its dependencies change
- `loginApi` — the fake API function from the service file

#### Defining the store

```typescript
export const useUserStore = defineStore('userStoreId', () => {
```

- `defineStore` takes two arguments: a **unique ID** (`'userStoreId'`) and a **setup function**
- The unique ID is used internally by Pinia's devtools and to avoid conflicts if you have multiple stores
- The `() => {` starts the setup function — similar to how a Vue component's `setup()` works
- `useUserStore` is the name exported — by convention, Pinia stores are always named `use___Store`

#### State

```typescript
const name = ref('')
const email = ref('')
const isLoggedIn = ref(false)
const loading = ref(false)
```

These are the **reactive variables** — the actual data being stored. Using `ref()` wraps each value so Vue knows to watch it. When any of these change, every component using them will automatically update.

Think of `ref` like putting a value inside a smart box. You read/write via `.value` inside the store, but components can access them directly.

| Variable | Type | Initial Value | Meaning |
|---|---|---|---|
| `name` | string | `''` (empty) | User's full name |
| `email` | string | `''` (empty) | User's email address |
| `isLoggedIn` | boolean | `false` | Whether user is logged in |
| `loading` | boolean | `false` | Whether an API call is in progress |

#### Computed property

```typescript
const userInfo = computed(() => {
  return `${name.value} (${email.value})`
})
```

`userInfo` is not stored data — it's **automatically derived** from `name` and `email`. Every time either of those changes, `userInfo` recalculates itself.

- If `name = 'John Doe'` and `email = 'john@example.com'`, then `userInfo = 'John Doe (john@example.com)'`
- If both are empty (logged out), `userInfo = ' ()'` — but we only show it when `isLoggedIn` is true, so this doesn't matter

Note: inside the store we must write `name.value` to read a `ref`. Outside (in components), you can just write `userStore.name` directly.

#### The `login` action (async)

```typescript
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
```

Step by step:

1. `loading.value = true` — immediately marks that we're waiting for a response (button shows "Logging in..." and becomes disabled)
2. `await loginApi()` — calls the fake API and **waits** for it to finish. The `await` keyword pauses this function until the API responds
3. `name.value = res.name` etc. — once the API responds, we save the user data into state
4. `isLoggedIn.value = true` — marks the user as logged in
5. `finally { loading.value = false }` — the `finally` block **always runs**, even if something went wrong. This ensures the loading spinner always stops, no matter what

**Why `try/finally` instead of just setting loading to false at the end?**
If `loginApi()` throws an error, code after `await` would be skipped. Using `finally` guarantees cleanup happens regardless of success or failure.

#### The `logout` action (sync)

```typescript
function logout() {
  name.value = ''
  email.value = ''
  isLoggedIn.value = false
}
```

Simple reset — clears all user data and marks as logged out. No API call needed (logout is client-side only in this demo). Because these are `ref` values, Vue instantly detects the change and re-renders everything.

#### Returning from the store

```typescript
return {
  name,
  email,
  isLoggedIn,
  loading,
  userInfo,
  login,
  logout
}
```

In Pinia's Composition API style, **you must explicitly return everything** you want components to be able to access. Anything not returned here stays private inside the store.

---

### 4.4 `LoginPanel.vue` — The Buttons

**Full file:**

```vue
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
```

**Breaking this down:**

#### Script section

```typescript
const userStore = useUserStore()
```

This is the magic line. Calling `useUserStore()` connects this component to the Pinia store. Now `userStore` gives full access to all the state and actions. The beautiful thing — if `UserProfile.vue` also calls `useUserStore()`, they both get the **exact same instance** (Pinia is a singleton per store ID).

#### Template — the Login button

```vue
<Button v-if="!userStore.isLoggedIn" type="button" @click="userStore.login" :disabled="userStore.loading">
    {{ userStore.loading ? 'Logging in...' : 'Login' }}
</Button>
```

- `v-if="!userStore.isLoggedIn"` — only show this button when NOT logged in
- `@click="userStore.login"` — when clicked, call the `login()` action on the store
- `:disabled="userStore.loading"` — disable the button while the API call is in progress
- `{{ userStore.loading ? 'Logging in...' : 'Login' }}` — show different text based on loading state. This is a **ternary operator**: "if loading is true, show 'Logging in...', else show 'Login'"

#### Template — the Logout button

```vue
<SecondaryButton v-if="userStore.isLoggedIn" type="button" @click="userStore.logout">
    Logout
</SecondaryButton>
```

- `v-if="userStore.isLoggedIn"` — only show this button when logged in (opposite of the Login button)
- `@click="userStore.logout"` — clicking calls the `logout()` action

**Key insight:** At any given time, only ONE of these buttons is visible — they're conditionally exclusive based on `isLoggedIn`.

---

### 4.5 `UserProfile.vue` — Showing User Info

**Full file:**

```vue
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
```

**Breaking this down:**

This component also calls `useUserStore()` — and gets the same shared store instance. This is the power of Pinia: no prop drilling, no event emitting. Both components are independently connected to the same truth.

```vue
<p v-if="userStore.isLoggedIn">
    {{ userStore.userInfo }}
</p>

<p v-else>
    Not logged in
</p>
```

- `v-if` / `v-else` — shows one paragraph or the other, never both
- `userStore.userInfo` — this reads the **computed property** from the store, which auto-formats as `"John Doe (john@example.com)"`

**Notice:** `UserProfile.vue` never calls any function — it only **reads** from the store. It has no idea how the data got there. It just reacts to whatever the store says.

---

### 4.6 `StorepageDemo.vue` — The Page

**Full file:**

```vue
<script setup lang="ts">
import LoginPanel from './components/LoginPanel.vue'
import UserProfile from './components/UserProfile.vue'
</script>

<template>
    <LoginPanel />
    <UserProfile />
</template>
```

**What this does:**

This is just a container page. It imports both child components and renders them one after the other. It has **zero logic of its own** — no state, no store access, nothing.

This is a good pattern: the page's only job is to compose which components appear. Each component manages its own concerns.

---

### 4.7 `router/index.ts` — The URL Route

**Relevant snippet from the router file:**

```typescript
{
    path: '/storepage',
    name: 'storepage',
    component: () => import('@/pages/storedemo/StorepageDemo.vue')
}
```

**What this does:**

When a user navigates to `/storepage` in the browser, Vue Router loads `StorepageDemo.vue` and renders it inside the `<RouterView />` in `App.vue`.

```typescript
component: () => import('@/pages/storedemo/StorepageDemo.vue')
```

The `() => import(...)` syntax is called **lazy loading**. Instead of loading ALL pages when the app first opens, this page's code is only downloaded when the user actually visits `/storepage`. This makes the initial load faster.

---

### 4.8 `App.vue` — The Nav Link

**Relevant snippet:**

```vue
<RouterLink to="/storepage" class="text-sm font-medium text-slate-600 hover:text-slate-500 transition-colors">
    Store page
</RouterLink>
```

**What this does:**

`<RouterLink>` is Vue Router's version of an `<a href>` tag. Instead of causing a full page reload, it navigates within the Single Page App (SPA) smoothly. The `to="/storepage"` matches the route path defined in the router.

---

## 5. Key Pinia Concepts Explained Simply

### `defineStore()` — Registering a Store

```typescript
export const useUserStore = defineStore('userStoreId', () => { ... })
```

Think of this as *registering a named locker* in a locker room. The first argument (`'userStoreId'`) is the locker number — it must be unique across your whole app. The second argument is a function that describes what's inside the locker (state, computed, actions).

### `ref()` — Reactive State

```typescript
const isLoggedIn = ref(false)
```

`ref()` wraps a value in a "reactive container." Vue watches this container, and whenever the value inside changes, it automatically updates every piece of UI that displays it.

- **Inside the store**, you read/write via `.value`: `isLoggedIn.value = true`
- **In components**, Pinia unwraps it for you: `userStore.isLoggedIn` (no `.value` needed)

### `computed()` — Auto-Calculated Values

```typescript
const userInfo = computed(() => `${name.value} (${email.value})`)
```

Think of `computed` like a spreadsheet formula. If cell A1 = "John" and B1 = "john@email.com", then a computed formula `=A1 & " (" & B1 & ")"` always shows the combined result and updates automatically when A1 or B1 changes.

You **never set** a computed value directly. You only set the pieces it depends on, and it recalculates itself.

### Actions — Functions That Change State

Actions are just regular functions inside the store that modify state. There's nothing special about them beyond the fact that they live inside the store. They can be:

- **Synchronous** (like `logout`) — runs instantly, no waiting
- **Asynchronous** (like `login`) — uses `async/await` to wait for API responses

### Why `useUserStore()` Works in Any Component

Pinia creates a **singleton** — one single instance of the store for the entire app. Every time any component calls `useUserStore()`, they all get back the *same object*. Changing state in one component's instance immediately reflects everywhere.

This is fundamentally different from just creating a regular JavaScript object and importing it — Pinia handles reactivity, devtools integration, and Vue lifecycle correctly.

### `try/finally` Pattern for Loading State

```typescript
async function login() {
  loading.value = true
  try {
    const res = await loginApi()
    // ... update state
  } finally {
    loading.value = false  // always runs, success or failure
  }
}
```

- `try` — attempt the risky operation (API call can fail)
- `finally` — always execute this, no matter what happened in `try`

Without `finally`, if `loginApi()` threw an error, `loading.value = false` would never execute and your button would be stuck in "Logging in..." state forever.

---

## 6. Full Data Flow Diagram

```
┌─────────────────────────────────────────────┐
│                  App.vue                     │
│   <RouterLink to="/storepage">               │
└──────────────────┬──────────────────────────┘
                   │ navigate
                   ▼
┌─────────────────────────────────────────────┐
│           StorepageDemo.vue                  │
│   <LoginPanel />                             │
│   <UserProfile />                            │
└──────┬───────────────────────┬──────────────┘
       │                       │
       ▼                       ▼
┌────────────────┐    ┌─────────────────────┐
│  LoginPanel    │    │   UserProfile        │
│                │    │                     │
│ reads:         │    │ reads:              │
│  isLoggedIn    │    │  isLoggedIn         │
│  loading       │    │  userInfo           │
│                │    │                     │
│ calls:         │    │ (no actions called) │
│  login()       │    └──────────┬──────────┘
│  logout()      │               │
└────────┬───────┘               │
         │                       │
         └───────────┬───────────┘
                     │ both use useUserStore()
                     ▼
┌─────────────────────────────────────────────┐
│            store/user.ts (Pinia)             │
│                                             │
│  STATE:                                     │
│    name, email, isLoggedIn, loading         │
│                                             │
│  COMPUTED:                                  │
│    userInfo = "name (email)"                │
│                                             │
│  ACTIONS:                                   │
│    login()  ──────────────────────────┐    │
│    logout() (resets state directly)   │    │
└───────────────────────────────────────┼────┘
                                        │ calls
                                        ▼
                          ┌─────────────────────────┐
                          │   services/auth.service   │
                          │                          │
                          │  loginApi()              │
                          │  └─ waits 1500ms         │
                          │  └─ returns fake user    │
                          │     { name, email }      │
                          └─────────────────────────┘
```

---

## 7. Quick Reference Table

| Concept | File | What It Does |
|---|---|---|
| `LoginResponse` interface | `types/auth.types.ts` | Defines what shape the API response has |
| `loginApi()` | `services/auth.service.ts` | Fake API — waits 1.5s, returns hardcoded user |
| `defineStore()` | `store/user.ts` | Creates and registers the Pinia store |
| `ref(false)` | `store/user.ts` | Reactive boolean — Vue watches it |
| `computed()` | `store/user.ts` | `userInfo` auto-formats name + email |
| `login()` action | `store/user.ts` | Async — calls API, updates state, handles loading |
| `logout()` action | `store/user.ts` | Sync — resets all state to defaults |
| `useUserStore()` | Both components | Gets the shared store instance |
| `v-if` / `v-else` | `LoginPanel.vue`, `UserProfile.vue` | Conditionally shows/hides elements |
| `@click="userStore.login"` | `LoginPanel.vue` | Calls store action on button click |
| `:disabled="userStore.loading"` | `LoginPanel.vue` | Disables button while API is running |
| Lazy loading route | `router/index.ts` | Only downloads page code when navigated to |
| `<RouterLink>` | `App.vue` | SPA navigation without full page reload |

---

## Summary

Here's the whole story in one paragraph:

> This demo creates a shared **Pinia store** (`store/user.ts`) that holds user data (name, email) and authentication state (isLoggedIn, loading). Two Vue components — `LoginPanel.vue` and `UserProfile.vue` — both connect to this same store using `useUserStore()`. When the user clicks "Login", `LoginPanel` calls `userStore.login()`, which triggers an async action in the store that calls a fake API (`auth.service.ts`). The API waits 1.5 seconds then returns fake user data. The store saves that data and sets `isLoggedIn = true`. Because the store is reactive, both components instantly re-render: the login button disappears and is replaced by a logout button, while the profile panel shows the user's name and email. Clicking "Logout" calls `userStore.logout()`, which clears everything and the UI resets.

The key takeaway: **the store is the single source of truth**. Components don't talk to each other directly — they each talk to the store, and the store keeps everyone in sync.
