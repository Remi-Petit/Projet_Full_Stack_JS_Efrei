# Étape 1 : Utilisation d'un conteneur léger pour copier les fichiers
FROM alpine AS builder
WORKDIR /app
COPY dist ./dist

# Étape 2 : Serveur Nginx pour servir les fichiers statiques
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
