<template>
  <div class="auth-container">
    <h1>Inscription</h1>
    <form @submit.prevent="handleRegister">
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
      <button type="submit">S'inscrire</button>
    </form>
    <p>
      Déjà un compte ?
      <router-link to="/login">Se connecter</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    handleRegister() {
      // Logique d'inscription (à adapter selon ton backend)
      console.log('Nom:', this.name);
      console.log('Email:', this.email);
      console.log('Mot de passe:', this.password);
      alert('Inscription réussie (simulée) !');
    },
  },
};
</script>

<style scoped>
/* Même style que pour Login.vue */
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
</style>
