---
### 2026-07-28T13:15:00.000Z — Cursor Agent

**Prompt (verbatim):**
> Implementa método getProfilePosts en users.service.ts para GET /v1/users/:id/posts
>
> hay que filtrar por profileOwnerId === userId
> paginados por cursor query.limit (1-50 por defecto 10) y query.cursor
> cada post debe incluir el autor completo y el flag likedByMe para currentUserId 
> Devuelve un PostsPageDto
>
> Requisitos:
> 1. Query con base QueryBuilder 
> - Left join post.author, author
> - where post.profileOwnerId = userId
> - orderBy post.createdAt DESC
> - limit+1 (para saber si hay mas). 
> 2. Si el user tiene post, tendra recuento de likes. El flag likedByMe no lo resuelvas con un join, haz un unico query donde obtengas todos los likes del post. Si currentUserId es null o está vacío, el Set estará vacío likedByMe = false
> 3. paginacion por cursor, si se recibe, descidificalo desde Base64 (formato original) (evitando exponer campos)
> - andWhere('(post.createdAt, post.id) < (:cursorDate, :cursorId)', { cursorDate: new Date(cursorDateStr), cursorId }) para prevenir que dos registros al mismo momento queden atrapados
> 4. que retorne los posts de un perfil paginados 
> 5. 
> - incluye los imports necesarios
> - dame el codigo completo de @backend/src/users/users.service.ts (metodo y contructor actualizados)
> - sin fallos 

**What I did:**
- Implemented `UsersService.getProfilePosts` with QueryBuilder, cursor Base64 JSON pagination, and a separate likes query for `likedByMe`.
- Injected `PostEntity` and `LikeEntity` repositories in the constructor.
- Ran `npm run build` to verify compilation.
