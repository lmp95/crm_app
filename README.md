## Clone or download repo
In the root directory, you can run:

### `docker compose up`

Open [http://localhost:3060](http://localhost:3060) to view frontend in browser.
Open [http://localhost:8080](http://localhost:8080) to view backend api in browser.

##### Create User for login
**POST METHOD** [http://localhost:8080/v1/user/](http://localhost:8080/v1/user/)
*content-type* - application/json
*request body*
        
         "username": "Administrator",
         "password": "123@abc",
         "role": "admin",
         "email": "admin@mail.com",
         "status": true

After create user, able to login with created email and password.
