# AirWC
A bathroom version of AirBnB.
An app for people to find a bathroom real quick when they're on the fly.

# Technologies Used

<div style=display:flex>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style=width:50px /> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" style=width:50px /> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" style=width:50px /> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" style=width:50px /> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style=width:50px /> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" style=width:50px />
</div>


# Features
### All users can:
    • View listings

### Logged in users can:
    • Create listings
    • Update listings
    • Delete their listings
    • Book a spot
    • Edit a booking
    • Delete a booking


## To run start the app locally:

##### 1. Clone this repo from terminal:
    • run "git clone https://github.com/CodeWhatThouWilt/AirWC" in terminal 

##### 2. Install dependencies in both the backend and frontend directories:
    • run "npm install"

##### 3. Create a new user  with POSTGRESQL:
    • run "psql" in your terminal
    • run "CREATE USER 'username' WITH PASSWORD 'password' CREATEDB;"

##### 4. Create a .env file in the backend directory. There's a env.example file that will provide you with a framework for the environment variables:
    • Port is the port you want the backend server to run this can default to 5000
    • DB_USERNAME is the username you input in step 3
    • DB_PASSWORD is the password you created in step 3
    • DB_DATABASE is the name you would like your database to have upon creation
    • DB_HOST can default to localhost
    • JWT_SECRET is the secret phrase for your JWT token
    • JWT_EXPIRES_IN is the amount of time in seconds until your JWT tokens expire

##### 5. Add a proxy to your package.json file in your frontend directory. This should match the port that you input in step 4:
    • Example: "proxy": "http://localhost:5000"

##### 6. Run sequelize commands to create, migrate and seed your database:
    • npx dotenv sequelize db:create
    • npx dotenv sequelize db:migrate
    • npx dotenv sequelize db:seed:all

##### 7. Navigate to your backend directory in a terminal and run:
    • npm start

##### 8. Navigate to your front directory in a terminal and run:
    • npm start

##### 9. Your browser will now open and you can begin navigating the application

