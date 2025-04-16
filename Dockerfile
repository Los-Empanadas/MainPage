# Usamos una imagen liviana con servidor web
FROM nginx:alpine

# Copiamos los archivos al directorio que nginx usa por defecto
COPY . /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80
