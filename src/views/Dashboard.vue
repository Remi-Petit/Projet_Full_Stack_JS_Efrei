<template>
  <div>
    <h1>Bienvenue dans l'environnement : {{ env }}</h1>
    <p>URL de l'API : {{ apiUrl }}</p>
    <p>Token : {{ token }}</p>
    <p>ID : {{ id }}</p>
  </div>

  <!-- Affichage des utilisateurs -->
  <div v-if="contacts.length > 0">
    <h2>Liste des utilisateurs :</h2>
    <div v-for="contact in contacts" :key="contact.id">
        <p>Nom : {{ contact.firstName }} | Prénom : {{ contact.lastName }} | Email : {{ contact.email }}</p>
    </div>
  </div>

  <!-- Message si aucun utilisateur -->
  <div v-else-if="!loading && contacts.length === 0">
    <p>Aucun utilisateur trouvé.</p>
  </div>

  <!-- Message de chargement -->
  <div v-if="loading">
    <p>Chargement en cours...</p>
  </div>

  <!-- Bouton de déconnexion -->
  <button @click="logout" class="logout-button">Déconnexion</button>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'Contact',
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      env: import.meta.env.VITE_ENV,
      contacts: [],
      loading: false,
    };
  },
  computed: {
    token() {
      const authStore = useAuthStore();
      return authStore.token;
    },
    id() {
        const authStore = useAuthStore();
        return authStore.user ? authStore.user.id : null;
    }
  },
  methods: {
    async getContacts() {
      this.loading = true;
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL+'/contacts/user/'+this.id,
          {
            headers: {
              'Authorization': `Bearer ${this.token}`
            },
          }
        );
        this.contacts = response.data;
        console.log(this.contacts);
      } catch (error) {
        if (error.response.status === 404) {
            console.log('Aucune donnée trouvée.');
        } else {
            console.log('Erreur de connexion. Veuillez réessayer plus tard.');
        }
      } finally {
        this.loading = false;
      }
    },


    logout() {
        const authStore = useAuthStore();
        authStore.clearAuth(); // Vide le token et l'utilisateur dans le store
        this.$router.push('/login'); // Redirige vers la page de connexion
    },
  },
  mounted() {
    this.getContacts();
  },
};

</script>
