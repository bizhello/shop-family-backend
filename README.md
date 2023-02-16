# shop-family-backend

### env: 
*  PORT
*  MONGO_SHOP
*  JWT_ACCESS_SECRET
*  JWT_REFRESH_SECRET
*  SALT_ROUNDS

### breakpoints:
###### Доступные не авторизованным пользователям.

###### Auth
*POST     `http://localhost:${PORT}/signup` - регистрация
>JSON(email, password, firstName, lastName).

* POST     `http://localhost:${PORT}/signin`- вход
>JSON(email, password).

* GET     `http://localhost:${PORT}/logout`- выход

* GET     `http://localhost:${PORT}/refresh`- запросить рефреш токен

###### Доступные только авторизованным пользователям.
###### cards
* GET       `http://localhost:${PORT}/cards/` - получить все карточки

* GET       `http://localhost:${PORT}/cards/:cardId` - получить карточку по ID

* POST      `http://localhost:${PORT}/cards/` - создать карточку
>JSON(title, dateFrom, dateTo, count, url).

* DELETE    `http://localhost:${PORT}/cards/:cardId` - удалить карточку

###### users
* GET       `http://localhost:${PORT}/users/` - получить всех пользователей

* GET       `http://localhost:${PORT}/users/:cardId` - получить пользователя по ID
* 
* DELETE    `http://localhost:${PORT}/users/:cardId` - удалить пользователя по ID

