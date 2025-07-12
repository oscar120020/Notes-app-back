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

# NestJS Backend con Rate Limiter

Este proyecto implementa un rate limiter global usando Redis para limitar las peticiones por IP.

## Características

- Rate limiter global que se aplica a todos los endpoints
- Almacenamiento en Redis para persistencia de datos
- Configuración flexible de límites y ventanas de tiempo
- Headers de rate limiting en las respuestas
- Detección automática de IP real (soporte para proxies)

## Configuración

### Variables de Entorno

1. Copia el archivo de ejemplo:
```bash
cp env.example .env
```

2. Edita el archivo `.env` según tus necesidades:
```env
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Rate Limiter Configuration
RATE_LIMIT_MAX_REQUESTS=60
RATE_LIMIT_WINDOW_MS=60
```

### Configuración por Defecto

- **Máximo de peticiones**: 60 por minuto
- **Ventana de tiempo**: 60 segundos (1 minuto)
- **Host de Redis**: localhost
- **Puerto de Redis**: 6379

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar Redis con Docker:
```bash
docker-compose up -d
```

3. Ejecutar la aplicación:
```bash
npm run start:dev
```

## Uso

El rate limiter se aplica automáticamente a todos los endpoints. Cuando se excede el límite, la API devuelve un error 429 (Too Many Requests).

### Headers de Respuesta

- `X-RateLimit-Limit`: Límite máximo de peticiones
- `X-RateLimit-Remaining`: Peticiones restantes
- `X-RateLimit-Reset`: Timestamp de cuando se resetea el contador

### Ejemplo de Respuesta de Error

```json
{
  "statusCode": 429,
  "message": "Rate limit exceeded. Please try again later.",
  "error": "Too Many Requests"
}
```

## Estructura del Proyecto

```
src/
├── config/
│   └── rate-limiter.config.ts    # Configuración del rate limiter
├── middleware/
│   └── rate-limiter.middleware.ts # Middleware de rate limiting
├── redis/
│   ├── redis.module.ts           # Módulo de Redis
│   └── redis.service.ts          # Servicio de Redis
└── app.module.ts                 # Módulo principal con middleware global
```

## Docker

El proyecto incluye un `docker-compose.yml` para ejecutar Redis:

```bash
# Iniciar Redis
docker-compose up -d

# Ver logs de Redis
docker-compose logs redis

# Detener Redis
docker-compose down
```

## Personalización

Para cambiar los límites del rate limiter, modifica las variables de entorno o edita `src/config/rate-limiter.config.ts`.

Para excluir ciertas rutas del rate limiting, modifica el método `configure` en `src/app.module.ts`:

```typescript
configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(RateLimiterMiddleware)
    .exclude('health', 'metrics') // Excluir rutas específicas
    .forRoutes('*');
}
```
