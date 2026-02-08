# --- FASE 1: El Constructor ---
# Usamos una imagen de Node para tener todas las herramientas de compilación
FROM node:20-alpine AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de configuración y package.json
COPY package.json package-lock.json* ./

# Instalamos las dependencias
# Usamos 'npm ci' que es más rápido y eficiente para entornos de producción/CI
RUN npm ci && npm cache clean --force

# Copiamos el resto del código
COPY . .

# ¡El paso más importante! Compilamos la aplicación.
# Esto crea la carpeta /app/dist con los archivos estáticos.
RUN npm run build


# --- FASE 2: El Servidor Final ---
# Usamos la imagen oficial de Caddy, el mismo servidor que usa Easypanel
FROM caddy:2-alpine

# Borramos el archivo de configuración por defecto de Caddy
RUN rm /etc/caddy/Caddyfile

# Copiamos nuestra propia configuración simple
COPY Caddyfile /etc/caddy/Caddyfile

# Copiamos SOLAMENTE los archivos compilados de la FASE 1
# desde la carpeta /app/dist del constructor a la carpeta raíz del servidor Caddy
COPY --from=builder /app/dist/ /usr/share/caddy