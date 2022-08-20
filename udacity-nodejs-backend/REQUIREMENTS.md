## API Endpoints

#### Auth
- Register (args: UserInfo)
  route: '/auth/signup' [POST]

- Register (args: LoginInfo)
  route: '/auth/login' [POST]

#### Users
- Index [token required]
  route: '/users' [GET]

- Show (args: userId)[token required]
  route: '/users/me' [GET]

- Delete User (args: userId)[token required]
  route: '/users/me' [DELETE]

- Get Reviews User (args: User)[token required]
  route: '/users/reviews' [GET]

- Get User Profile By Id (args: userId)[token required]
  route: '/users/:userId/profile' [GET]


#### Websites
- Index [token required]
  route: '/websites' [GET]

- Create Category (args: Website)[token required]
  route: '/websites' [POST]
- 
- Show (args: websiteId)[token required]
  route: '/websites/:websiteId' [GET] 

- Delete (args: categoryId)[token required]
  route: '/websites/:websiteId' [DELETE] 

#### Reviews
- Index 
  route: '/websites/:websiteId/reviews' [GET]

- Create product (args: Product)[token required]
  route: '/websites/:websiteId/reviews' [POST]

- Show (args: productId) [token required]
  route: '/websites/:websiteId/reviews/:reviewId' [GET]

- Show (args: productId) [token required]
  route: '/websites/:websiteId/reviews/:reviewId' [DELETE]

- Delete (args: productId) [token required]
  route: '/products/:productId' [DELETE]



#### Search
- Index [token required]
  route: '/search' [GET]




## Data Shapes
#### Website
-  id
- name
- category
- description [OPTIONAL]
- url
- created_at
- user_id

Websites (id: int PRIMARY KEY, name: varchar, category: varchar, user_id : int [FOREIGN KEY to users table])

#### User
- id
- username
- email
- password

Users (id: int PRIMARY KEY, username: varchar,  password: varchar )

#### Review
- id - id of each review
- user_id
- website_id
- rating
- comment

Order (id: int PRIMARY KEY,rating int, comment varchar user_id: int [foreign key to users table] website_id: int [foreign key to websites table])
