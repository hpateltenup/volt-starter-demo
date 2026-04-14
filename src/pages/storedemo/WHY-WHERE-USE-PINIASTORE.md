---

# 🧠 Golden Rule (First thing to remember)

👉 **Component = UI (what user sees + interactions)**
👉 **Store = State + Business Logic (rules + shared data)**

---

# 🧩 Think like this

## 🖥️ Component = “Presenter”

* shows data
* takes user input
* calls store

## 📦 Store = “Brain”

* holds data
* decides rules
* talks to API
* updates state

---

# 🔥 Simple Decision Rule

Ask this for every piece of code:

---

## ❓ 1. “Is this related to UI only?”

👉 Put in **Component**

Example:

```ts
function onClick() {
  showModal.value = true
}
```

✔ UI state only → component

---

## ❓ 2. “Is this shared across components?”

👉 Put in **Store**

Example:

```ts
user, cart, auth, theme
```

✔ shared state → store

---

## ❓ 3. “Does this involve business rules?”

👉 Put in **Store**

Example:

```ts
if (user.age < 18) denyAccess()
```

✔ logic → store

---

## ❓ 4. “Does this involve API calls?”

👉 Usually in **Store (or service layer called by store)**

Example:

```ts
await api.login()
```

✔ data fetching → store

---

# 🧠 Your Current Example (User Login)

### ❌ Bad (logic in component)

```ts
function login() {
  const res = await api.login()
  user.name = res.name
}
```

---

### ✅ Good (store handles it)

```ts
// store
async function login() {
  const res = await api.login()

  name.value = res.name
  email.value = res.email
  isLoggedIn.value = true
}
```

Component:

```ts
userStore.login()
```

---

# 📦 Real Architecture (Professional Way)

## 3 Layers:

### 1. Component (UI only)

```txt
button click
form input
display data
```

---

### 2. Store (state + business logic)

```txt
login/logout
cart add/remove
auth rules
computed getters
```

---

### 3. API / Service layer (optional but best practice)

```txt
actual HTTP calls
axios/fetch logic
```

Example:

```ts
// api/auth.ts
export function loginAPI() {
  return axios.post('/login')
}
```

Then store uses it:

```ts
import { loginAPI } from '@/api/auth'

async function login() {
  const res = await loginAPI()
}
```

---

# 🧠 Simple Mental Model

Think:

## Component = Restaurant waiter 🍽️

* takes order
* shows food

## Store = Kitchen 👨‍🍳

* prepares food
* decides recipe

## API = Grocery store 🏪

* gives raw ingredients

---

# 🔥 What SHOULD go in Store

✔ Authentication (login/logout)
✔ User data
✔ Cart (add/remove items)
✔ App settings (theme, language)
✔ Shared UI state (sidebar open/close)
✔ API calls related to that feature
✔ Business rules

---

# ❌ What SHOULD NOT go in Store

❌ button click handlers
❌ local form UI state
❌ DOM manipulation
❌ purely visual toggles (unless shared)

---

# ⚡ Real Example Breakdown

## Login Page

### Component:

```ts
email input
password input
submit button click
```

---

### Store:

```ts
login()
logout()
isLoggedIn
user data
```

---

### API:

```ts
post /login
```

---

# 🧠 Key Insight (VERY IMPORTANT)

👉 Store is NOT just storage
👉 Store = **state + rules + shared logic**

---

# 🎯 Final Rule (Easy to remember)

> If it affects **multiple places OR data OR rules → Store**
> If it affects **only UI → Component**

---