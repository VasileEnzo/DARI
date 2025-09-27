DARI App – Frontend (React Native) + Backend (Laravel)

Este proyecto conecta una app móvil en React Native (TypeScript) con un backend en Laravel para manejar usuarios, posts, categorías, etc.

🚀 Requisitos

Node.js
 (recomendado v18+)

npm
 (incluido con Node.js)

PHP 8.1+

Composer

XAMPP
 (o similar, para base de datos MySQL/MariaDB)

Android Studio
 (para emulador Android)

Git

📦 Instalación del Backend (Laravel API)

Ir a la carpeta del backend:

cd dari_api


Instalar dependencias:

composer install


Configurar el archivo .env:

cp .env.example .env


Configura la conexión a la base de datos (DB_DATABASE=dari, DB_USERNAME=root, etc).

Asegurate de tener activado MySQL/MariaDB en XAMPP.

Generar la app key:

php artisan key:generate


Ejecutar las migraciones (crea las tablas):

php artisan migrate


Instalar Sanctum (para tokens de login):

php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate


Levantar el servidor:

php artisan serve


👉 El backend quedará en: http://127.0.0.1:8000

📦 Instalación del Frontend (React Native)

Ir a la carpeta del frontend:

cd dariApp


Instalar dependencias:

npm install


Instalar librerías adicionales usadas en el proyecto:

npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install axios
npm install @react-native-async-storage/async-storage
npm install typescript @types/react @types/react-native --save-dev


Si usás Android, instalá pods:

cd ios
pod install
cd ..

▶️ Correr la app en emulador Android

Levantar el backend:

cd dari_api
php artisan serve


En otra terminal, correr el frontend:

cd dariApp
npx react-native run-android


👉 El emulador debe estar abierto desde Android Studio.

📂 Estructura del Proyecto
DARI/
 ├── dari_api/         # Backend Laravel (PHP, MySQL)
 │   ├── app/
 │   ├── database/
 │   └── routes/api.php
 │
 ├── dariApp/          # Frontend React Native (TypeScript)
 │   ├── src/
 │   │   ├── pages/    # Screens (Login, Registro, CrearPost, etc)
 │   │   ├── context/  # AuthContext
 │   │   └── api.ts    # Configuración de Axios
 │   └── App.tsx
 │
 └── README.md

🔑 Notas importantes

En Android, el emulador no entiende localhost. Usamos:

const baseURL = "http://10.0.2.2:8000/api";


En dispositivo físico, hay que usar la IP de la PC en la red local (ej: http://192.168.0.15:8000/api).

Los tokens de login se guardan en la tabla personal_access_tokens.