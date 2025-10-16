# Portfolio Project: Twitter-like API Roadmap

## **Week 1: Setup & Authentication**
| Day | Target |
|-----|--------|
| 1   | Project setup: Node.js + Express, initialize Git, install dependencies, setup folder structure |
| 2   | Setup MongoDB (Atlas or local), create `.env` for config, connect DB to project |
| 3   | Implement User model (username, email, passwordHash, followers, following) |
| 4   | Implement signup endpoint (validate input, hash password) |
| 5   | Implement login endpoint (JWT generation) |
| 6   | Implement authentication middleware (JWT verification) |
| 7   | Test authentication endpoints using Postman, add basic error handling |

## **Week 2: Posts & CRUD**
| Day | Target |
|-----|--------|
| 8   | Create Post model (authorId, content, createdAt, likes) |
| 9   | Implement create post endpoint (POST /posts) |
| 10  | Implement read posts endpoint (GET /posts, GET /posts/:id) |
| 11  | Implement update post endpoint (PUT /posts/:id, author only) |
| 12  | Implement delete post endpoint (DELETE /posts/:id, author only) |
| 13  | Add input validation for posts (Joi or Zod) |
| 14  | Test all post endpoints and ensure proper error handling |

## **Week 3: Follow System & Feed**
| Day | Target |
|-----|--------|
| 15  | Implement follow/unfollow endpoints (POST /users/:id/follow) |
| 16  | Update User model to handle followers/following consistency |
| 17  | Implement feed endpoint (GET /feed) showing posts from followed users |
| 18  | Add pagination to feed (`limit` & `skip`) |
| 19  | Optimize feed query (MongoDB aggregation or indexes) |
| 20  | Optional: add like functionality to posts (POST /posts/:id/like) |
| 21  | Test feed & follow system thoroughly |

## **Week 4: Polish, Testing & Deployment**
| Day | Target |
|-----|--------|
| 22  | Centralize error handling middleware, proper HTTP codes |
| 23  | Add logging (Winston or console) for debugging |
| 24  | Write unit tests for controllers & services (Jest/Mocha) |
| 25  | Document API endpoints (Markdown or Swagger) |
| 26  | Deploy backend (Render, Railway, or Heroku) |
| 27  | Test deployed endpoints, fix bugs |
| 28  | Final review: refactor code, ensure modularity, commit final version |

---

### **Developer Tips**
- Commit **daily**, write clear commit messages.
- Keep **folders modular**: controllers, models, routes, middleware, utils.
- Validate inputs for every endpoint.
- Start **small, working first**, then add features.
- Use **Postman** to test as you build.
- Think about **queries you need** when designing models.
