<template>
  <h1 class="text-2xl font-semibold mb-4">Register</h1>
  <form @submit.prevent="onRegister">
    <!-- Name Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Name</label>
      <input
        ref="fullnameInputRef"
        v-model="registerForm.fullname"
        type="text"
        id="name"
        name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        ref="emailInputRef"
        v-model="registerForm.email"
        type="email"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input
        ref="passwordInputRef"
        v-model="registerForm.password"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div>

    <!-- Register Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Create account
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Login Here</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';

import { useAuthStore } from '../stores/auth.store';

const toast = useToast();
const authStore = useAuthStore();

const fullnameInputRef = ref<HTMLInputElement | null>(null);
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

const registerForm = reactive({
  fullname: '',
  email: '',
  password: '',
});

const onRegister = async () => {
  if (registerForm.fullname === '') {
    return fullnameInputRef.value?.focus();
  }

  if (registerForm.email === '') {
    return emailInputRef.value?.focus();
  }

  if (registerForm.password.length < 6) {
    return passwordInputRef.value?.focus();
  }

  const { ok, message } = await authStore.register(
    registerForm.fullname,
    registerForm.email,
    registerForm.password,
  );

  if (!ok) {
    toast.error(message);
    return;
  }

  console.log({ ok });
};
</script>
