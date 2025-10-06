<template>
  <div class="auth-container">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="exemple@domaine.com"
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Votre mot de passe"
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p>
      Pas encore de compte ?
      <router-link to="/register">S'inscrire</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = ''; // Réinitialise le message d'erreur

      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL+'/auth/login',
          {
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const authStore = useAuthStore();
        authStore.setToken(response.data.token);
        authStore.setUser(response.data.user);

        this.$router.push('/dashboard');

      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #3aa876;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
