# Etapa de construcción
FROM node:16.20.2-alpine AS build-step

# Crear y definir el directorio de trabajo
RUN mkdir -p /app
WORKDIR /app

# Copiar el package.json y package-lock.json (si lo tienes)
COPY package*.json /app/

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . /app

# Ejecutar la construcción en producción
RUN npm run build --prod

# Etapa de producción
FROM nginx:1.17.1-alpine

# Copiar los archivos construidos desde la etapa anterior al contenedor Nginx
COPY --from=build-step /app/dist/angular-app /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
