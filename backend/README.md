# ⚙️ Debook — Backend (NestJS + PostgreSQL)

API que alimenta la pantalla de perfil. **Ya arranca** con datos de seed y un endpoint de referencia implementado. Completa los `TODO`.

---

## 🚀 Puesta en marcha

Requisitos: **Node ≥ 18** y **Docker**.

```bash
cd backend
cp .env.example .env
npm install
npm run db:up        # Postgres (docker-compose)
npm run seed         # crea el schema y siembra usuarios + posts
npm run start:dev    # API en http://localhost:3000/v1
```

Comprobación rápida (endpoint de referencia, ya hecho):

```bash
curl http://localhost:3000/v1/users/11111111-1111-1111-1111-111111111111
```

> **Auth simplificada:** el usuario autenticado va en la cabecera `x-user-id`
> (ver `src/common/current-user.decorator.ts`). Usa a **Mario**
> (`33333333-3333-3333-3333-333333333333`) para probar likes. `npm run seed`
> imprime todos los IDs.

---

## 🧩 Qué implementar

Tres métodos marcados con `TODO` (lanzan `NotImplementedException`). Los controllers, DTOs, entidades e índices ya están puestos.

| Endpoint | Método | Devuelve |
| --- | --- | --- |
| `GET /v1/users/:id/posts` | `UsersService.getProfilePosts` | Posts del perfil, paginados por cursor (`PostsPageDto`). |
| `POST /v1/posts/:id/like` | `PostsService.like` | Estado final del like (`LikeResultDto`). |
| `DELETE /v1/posts/:id/like` | `PostsService.unlike` | Estado final del like (`LikeResultDto`). |

Como referencia (ya implementado) tienes `UsersService.getProfile`.

---

## 🧪 Tests

Convierte los esqueletos `it.todo` en tests reales:

- **Unitario** — `src/posts/posts.service.spec.ts`
- **e2e** — `test/like.e2e-spec.ts`

```bash
npm run test        # unit
npm run test:e2e    # e2e
```

---

## 🗂️ Estructura

```
backend/src/
├── common/current-user.decorator.ts   # auth (x-user-id)
├── database/{data-source-options,seed}.ts
├── users/    # user.entity · users.service (getProfile ✅ · getProfilePosts 🚧) · controller
├── posts/    # post.entity · posts.service (like 🚧 · unlike 🚧) · controller
└── likes/like.entity.ts
```

---

## 🌟 Bonus (opcional)

- Notificación asíncrona al recibir un like (evento/cola/worker).
- Tiempo real con Socket.io.
- Migraciones en vez de `synchronize`.

Prioriza que el núcleo esté **correcto** antes que añadir bonus.

---

## 📋 Entregables

- `.env.example`, `docker-compose.yml` y scripts (incluidos).
- La carpeta **`.ai-logs/`** con tu registro de IA (ver [README principal](../README.md)).
- En tu README de entrega: **decisiones y trade-offs**.
