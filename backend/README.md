# Introduction
Backend fait en Node.js, avec une base de donnée MongoDB.
La BDD est en ligne sur MongoDB Atlas.

## Installation

### Dépendances
npm i

### Lancer le serveur
node .\app.js

### Connexion à la base de donnée
Si le serveur renvoie "Connect DB : ✅" c'est que la connexion est faite avec succès.
Sinon, il renvoie "Connect DB : ❌".

### Variable d'environnement
Les variables d'environnemet de l'app sont dans le fichier .env.
N'oubliez pas de mettre à jour également côté frontend si besoin.

## Architecture
Variables d'environnement : /config/config.js
Connexion DB : /db/connect.js
Gestion des routes : /route
Gestion de la logique des routes : /controller
Gestion des models : /model
Gestion du hashage de mot de passe : /model/user.js
Gestion Swagger : /swagger 
Protection des routes : /middleware
Vérification du format des données utilisateur : /middleware

## Endpoints

### /api/auth/register
POST - Créer un compte : Chiffrement mot de passe - Création d'un JWT - Un JSON est envoyé dans la requête.

Exemple :
{
    "email": "jolyne.kujo@gmail.com",
    "password": "MotDePasseBienSecret123!"
}

### /api/auth/login
POST - Se connecter : Création d'un JWT - Un JSON est envoyé dans la requête.

Exemple :
{
    "email": "jolyne.kujo@gmail.com",
    "password": "MotDePasseBienSecret123!"
}

### /api/contacts
GET - Récupérer tous les contacts : Seulement ceux appartenant au user connecté.

### /api/contacts
POST - Création d'un contact : Un JSON est envoyé dans la requête.

Exemple :
{
    "firstName": "jolyne",
    "lastName": "joestar",
    "email": "Telly.Hoegeer@free.fr",
    "phone": "04548454d5846",
    "website": "https://osef.com",
    "address" : {
        "street": "",
        "city": "",
        "zipcode": "75010"
    },
    "company": {
        "name": "osef"
    }
}

### /api/contacts/:id
PUT - Modification d'un contact : Un JSON est envoyé dans la requête - Utilisation de l'id d'un contact.

### /api/contacts/:id
DELETE - Supprimer un contact : Utilisation de l'id d'un contact.

## Info anexe :
j'ai utilisé ce site à la base pour générer des contacts :
https://jsonplaceholder.typicode.com/users