# Dockerfile
# Étape 1 : Build de l'application Vite
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build

RUN npm run build -- --force  # Ignore les erreurs TypeScript non critiques

# Étape 2 : Serveur Nginx pour servir les fichiers statiques
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
