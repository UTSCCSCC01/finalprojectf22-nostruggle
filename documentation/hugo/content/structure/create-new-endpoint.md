---
title: "Create New Endpoint"
date: 2022-10-07T10:22:21-04:00
draft: false
author: "Team NoStruggle"
menu: 
    main: 
        title: "Create New Endpoint"
        parent: 'structure'
        weight: 1
---

#### Model

The model will contain the definition of the mongoose schema that represents the document on MongoDB

##### models/user.model.js
![models/user.model.js](https://i.imgur.com/z6noBBy.png)

#### Controller

Controllers will contain the functions that handle the various request methods for the endpoint.

##### controller/users.js
![controller/users.js](https://i.imgur.com/Ml4BaBt.png)


#### Routes and Index.js

The routers will route the endpoints for a specific api. It will be appended to the server's baseURL found it `.env` and the api path defined in the server's `index.js` file.

##### index.js
![index.js](https://i.imgur.com/vRtyG7s.png)

**app.use()** tells the app to run the routes/users.js `userRouter` function (which contains methods handling requests), on the path `/users`.

##### routes/users.js
![routes/users.js](https://i.imgur.com/KcUJFO9.png)

##### routes/tasks.js
![routes/tasks.js](https://i.imgur.com/s0urgkW.png)

For example, to (get) a new user, the url will be `baseURL` + `/users` + `/get` = `baseURL/users/get`

To (post) a new task, the url will be `baseURL` + `/tasks` + `/` =  `baseURL/tasks`
