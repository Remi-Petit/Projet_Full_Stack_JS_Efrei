<template>
  <div>
    <h1>Bienvenue dans l'environnement : {{ env }}</h1>
    <p>URL de l'API : {{ apiUrl }}</p>
    <p>Token : {{ token }}</p>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'Contact',
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      env: import.meta.env.VITE_ENV,
    };
  },
  computed: {
    token() {
      const authStore = useAuthStore();
      return authStore.token;
    },
  },
};
</script>
