FROM nginx:alpine

# Copiar archivos del frontend
COPY . /usr/share/nginx/html

# Copiar configuración a conf.d (NO a nginx.conf directamente)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5500

CMD ["nginx", "-g", "daemon off;"]