# frontend/Dockerfile
# Étape 1 : Build de l'application React avec les variables d'environnement
FROM node:18-alpine as build
WORKDIR /app

# Copie d'abord les dépendances pour le cache
COPY package*.json ./
RUN npm install

# Copie le reste et build avec les variables d'environnement
COPY . .
ARG VITE_ENV_MODE
ARG VITE_PROTOCOL_API
ARG VITE_HOST_API
ARG VITE_PORT_API
ARG VITE_API_URL
ARG VITE_PROTOCOL
ARG VITE_HOST
ARG VITE_PORT

# Passe les variables au build (via --build-arg et env)
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
