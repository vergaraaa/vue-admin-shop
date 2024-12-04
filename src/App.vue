<template>
  <FullScreenLoader v-if="authStore.isChecking" />
  <RouterView v-else />
  <VueQueryDevtools />
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

import { useAuthStore } from './modules/auth/stores/auth.store';
import FullScreenLoader from './modules/common/FullScreenLoader.vue';
import { AuthStatus } from './modules/auth/interfaces/auth-status.enum';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authStore.checkAuth();
      return;
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>
