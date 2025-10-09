# 🧠 Backend - Projet Full Stack JS (EFREI)

Backend réalisé en **Node.js / Express** avec une base de données **MongoDB Atlas**.
Ce service expose une API REST sécurisée par **JWT**, documentée via **Swagger**, et testée avec **Jest + Supertest**.

---

## 🚀 Introduction

Ce backend constitue la partie serveur du projet Full Stack JS.
Il permet :

* L'**authentification** des utilisateurs (création et connexion),
* La **gestion sécurisée des contacts** (CRUD complet),
* Une **documentation interactive Swagger** accessible depuis `/docs`.

---

## 🧮 Stack technique

| Élément           | Technologie                          |
| ----------------- | ------------------------------------ |
| Serveur           | Node.js + Express                    |
| Base de données   | MongoDB Atlas (hébergée en ligne)    |
| ORM               | Mongoose                             |
| Authentification  | JWT (JSON Web Token)                 |
| Validation        | express-validator                    |
| Hashage           | bcrypt                               |
| Tests             | Jest + Supertest + MongoMemoryServer |
| Documentation API | Swagger (OpenAPI 3)                  |

---

## ⚙️ Installation & lancement

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/Remi-Petit/Projet_Full_Stack_JS_Efrei.git
cd Projet_Full_Stack_JS_Efrei/backend
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Créer le fichier `.env`

Crée un fichier `.env` à la racine du dossier `backend` :

```env
PORT=3300
MONGO_URI=mongodb+srv://remipetit_db_user:EPlAPGaLCR8Nhf7A@apipremiercoursdevfullj.yj709wt.mongodb.net/Premier_Cours_FullStack_JS
JWT_SECRET=ton_secret_super_secure_123
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:5200
```

> ⚠️ **Note :** ces variables sont aussi référencées dans `/config/config.js`.
> Pense à mettre à jour la variable `FRONTEND_URL` si tu modifies le port du frontend.

### 4️⃣ Lancer le serveur

```bash
node app.js
```

Si la connexion à MongoDB est réussie :

```
Connect DB : ✅
```

Sinon :

```
Connect DB : ❌
```

---

## 🧩 Architecture du projet

```
backend/
├── app.js                 # Point d'entrée principal Express
├── config/                # Configuration des variables d'environnement
│   └── config.js
├── db/                    # Connexion à la base MongoDB
│   └── connect.js
├── controller/            # Logique métier (auth & contacts)
│   ├── auth.js
│   └── contact.js
├── model/                 # Schémas Mongoose (User & Contact)
│   ├── user.js
│   └── contact.js
├── route/                 # Définition des routes Express
│   ├── auth.js
│   └── contact.js
├── middleware/            # Middleware d’authentification & validation
│   ├── authMiddleware.js
│   ├── contactValidation.js
│   └── validateAuth.js
├── swagger/               # Documentation Swagger (OpenAPI)
│   ├── index.js
│   ├── auth.swagger.js
│   └── contact.swagger.js
└── tests/                 # Tests Jest + Supertest
```

---

## 🧑‍💻 Scripts utiles

| Commande               | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `npm start`            | Lance le serveur                                              |
| `npm test`             | Lance tous les tests d’intégration                            |
| `node app.js`          | Lancement manuel du backend                                   |
| `docker compose up -d` | Lance le backend via Docker (si docker-compose.yml configuré) |

📌 /!\ Attention, pour les tests, il faut mettre le NODE_ENV=test pour que ça fonctionne !

---

## 🔐 Endpoints principaux

### 🔹 Authentification

#### `POST /api/auth/register`

Créer un compte utilisateur.

* Hashage automatique du mot de passe.
* Génération d’un token JWT.

**Exemple de requête :**

```json
{
  "email": "jolyne.kujo@gmail.com",
  "password": "MotDePasseBienSecret123!"
}
```

#### `POST /api/auth/login`

Connexion utilisateur.
Retourne un nouveau JWT.

**Exemple :**

```json
{
  "email": "jolyne.kujo@gmail.com",
  "password": "MotDePasseBienSecret123!"
}
```

---

### 🔹 Contacts (routes protégées par JWT)

Toutes ces routes nécessitent un header :

```
Authorization: Bearer <votre_token_JWT>
```

#### `GET /api/contacts`

Retourne tous les contacts appartenant à l’utilisateur connecté.

#### `POST /api/contacts`

Ajoute un nouveau contact.

**Exemple de corps de requête :**

```json
{
  "firstName": "Jolyne",
  "lastName": "Joestar",
  "email": "jolyne.joestar@gmail.com",
  "phone": "0612345678",
  "website": "https://osef.com",
  "address": { "street": "", "city": "Paris", "zipcode": "75010" },
  "company": { "name": "OSEF Corp" }
}
```

#### `PUT /api/contacts/:id`

Met à jour un contact existant.

#### `DELETE /api/contacts/:id`

Supprime un contact existant.

---

### 🔹 Documentation API

#### `GET /docs`

Accès à la documentation Swagger complète.
Permet de tester directement les endpoints depuis le navigateur.

---

## 🤪 Identifiants de test (exemple)

Si tu veux tester rapidement l’API :

```json
{
  "email": "test@example.com",
  "password": "Test123!"
}
```

> Tu peux aussi créer ton propre utilisateur via `/api/auth/register`.

---

## 🧹 Sécurité intégrée

✅ JWT pour authentification des routes
✅ CORS limité à l’URL du frontend
✅ Hashage bcrypt des mots de passe
✅ Validation stricte des entrées (`express-validator`)
✅ Tests automatisés sur toutes les routes principales

---

## 🧐 Informations complémentaires

* Les contacts de test ont été générés initialement depuis :
  🔗 [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

* Environnement de test :

  * Tests isolés en mémoire (MongoMemoryServer).
  * Pas besoin d’une base réelle pour exécuter les tests.

---

## 🏁 Auteur

👤 **Rémi Petit**
EFREI - Projet Full Stack JS
📧 [remi.petit93370@gmail.com](mailto:remi.petit93370@gmail.com)

---

> *« Clean code, modularité et sécurité avant tout. »*

> *« Merci ChatGPT sans qui ce README n'aurait jamais été aussi beau. »*