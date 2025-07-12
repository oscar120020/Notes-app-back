<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# NestJS Backend - API de Usuarios y Notas

Backend desarrollado con NestJS que proporciona una API RESTful para gestión de usuarios y notas con autenticación JWT.

## 🚀 Características

- **Autenticación JWT** con Passport
- **Gestión de usuarios** con contraseñas cifradas (bcrypt)
- **Sistema de notas** con relación one-to-many
- **Validación de datos** con class-validator
- **Migraciones de base de datos** con TypeORM
- **CORS configurado** para frontend
- **PostgreSQL** como base de datos
- **UUID** para IDs de notas

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio:**
```bash
git clone <repository-url>
cd nest-backend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp env.example .env
```

Editar `.env` con tus configuraciones:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=nestuser
DB_PASSWORD=nestpass
DB_NAME=nestdb

# JWT
JWT_SECRET=your-super-secret-key

# Environment
NODE_ENV=development
```

4. **Ejecutar migraciones:**
```bash
npm run migration:run
```

5. **Iniciar la aplicación:**
```bash
npm run start:dev
```

## 🗄️ Base de Datos

### Migraciones

```bash
# Generar nueva migración
npm run migration:generate -- src/migrations/NombreMigracion

# Ejecutar migraciones
npm run migration:run

# Revertir última migración
npm run migration:revert
```

### Estructura de Tablas

**Users:**
- `id` (Primary Key, Auto Increment)
- `name` (VARCHAR 100)
- `email` (VARCHAR 100, Unique)
- `password` (VARCHAR 255, Hashed)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**Notes:**
- `id` (Primary Key, UUID)
- `title` (VARCHAR 100)
- `content` (VARCHAR 500)
- `userId` (Foreign Key)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

## 🔐 Autenticación

### Endpoints de Autenticación

#### POST /auth/login
```json
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Usuario",
    "email": "usuario@example.com"
  }
}
```

#### GET /auth/profile
Requiere token JWT en header: `Authorization: Bearer <token>`

**Respuesta:**
```json
{
  "id": 1,
  "name": "Usuario",
  "email": "usuario@example.com",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

## 👥 Gestión de Usuarios

### Endpoints

- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users` - Crear nuevo usuario
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### Crear Usuario
```json
{
  "name": "Nuevo Usuario",
  "email": "nuevo@example.com",
  "password": "password123"
}
```

## 📝 Gestión de Notas

### Endpoints (Protegidos con JWT)

- `GET /notes` - Obtener notas del usuario autenticado
- `GET /notes/user/:userId` - Obtener notas por usuario
- `GET /notes/:id` - Obtener nota por ID
- `POST /notes/note/user/:userId` - Crear nueva nota
- `PATCH /notes/:id` - Actualizar nota
- `DELETE /notes/:id` - Eliminar nota

### Crear Nota
```json
{
  "title": "Mi Nota",
  "content": "Contenido de la nota",
  "userId": 1
}
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Build
npm run build

# Tests
npm run test
npm run test:e2e

# Migraciones
npm run migration:generate -- src/migrations/NombreMigracion
npm run migration:run
npm run migration:revert

# Linting y Formato
npm run lint
npm run format
```

## 📁 Estructura del Proyecto

```
src/
├── auth/                    # Autenticación JWT
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   └── dto/
│       └── login.dto.ts
├── users/                   # Gestión de usuarios
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   ├── user.entity.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
├── notes/                   # Gestión de notas
│   ├── notes.controller.ts
│   ├── notes.service.ts
│   ├── notes.module.ts
│   ├── note.entity.ts
│   └── dto/
│       ├── create-note.dto.ts
│       └── update-note.dto.ts
├── config/                  # Configuraciones
│   └── typeorm.config.ts
├── migrations/              # Migraciones de BD
├── app.module.ts           # Módulo principal
└── main.ts                 # Punto de entrada
```

## 🌐 CORS

Configurado para aceptar peticiones desde:
- `http://localhost:3000` (React/Next.js)
- `http://localhost:3001` (Puerto alternativo)
- `http://localhost:5173` (Vite)
- `http://localhost:4200` (Angular)

## 🔒 Seguridad

- Contraseñas cifradas con bcrypt
- JWT para autenticación
- Validación de datos con class-validator
- CORS configurado
- Headers de seguridad

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura de tests
npm run test:cov
```

## 📦 Dependencias Principales

- `@nestjs/common` - Framework NestJS
- `@nestjs/typeorm` - Integración con TypeORM
- `@nestjs/jwt` - JWT para autenticación
- `@nestjs/passport` - Passport para autenticación
- `typeorm` - ORM para base de datos
- `pg` - Driver de PostgreSQL
- `bcrypt` - Cifrado de contraseñas
- `class-validator` - Validación de datos
- `passport-jwt` - Estrategia JWT

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.
