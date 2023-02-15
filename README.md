# shop-family-backend

env: 
  PORT
  MONGO_SHOP
  JWT_ACCESS_SECRET
  JWT_REFRESH_SECRET
  SALT_ROUNDS

breakpoints:
POST     `http://localhost:${PORT}/signup` - регистрация
POST     `http://localhost:${PORT}/signin`- вход

GET       `http://localhost:${PORT}/cards/` - получить все карточки
GET       `http://localhost:${PORT}/cards/:cardId` - получить карточку по ID
POST      `http://localhost:${PORT}/cards/` - создать карточку
DELETE    `http://localhost:${PORT}/cards/:cardId` - удалить карточку
