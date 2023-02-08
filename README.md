[![Typing SVG](https://readme-typing-svg.demolab.com/?lines=Vehicle+sales;Full+Stack+Project)](https://git.io/typing-svg)
# :car: :palm_tree: :car: :city_sunrise:

<br/>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

<br/>

## :round_pushpin: README Roadmap

1. [Check on project requiriments](#1) 
2. [Clone the project](#2)
3. [Configure postgre database](#3) 
4. [Run Node service (back-end)](#4) 
5. [Run React (front-end)](#5) 

<br/>

<a id="1"></a>
## 1. Project requirements

- [x] Home page with vehicle showcase

![alt text](https://github.com/LuizaAlanis/vehicle-sales/blob/master/home-page.png?v=4&h=300&w=300&fit=cover&mask=circle&maxage=7d)

<br/>

- [x] Sort vehicles by price, from cheapest to most expensive.
```sql
SELECT * FROM vehicles ORDER BY price ASC
```

- [x] Admin panel with JWT authentication.
```javascript
if (!token) return res.status(401).send('Access denied. No token provided.');
```

- [x] Private requests need authentication token. Examples:
```http
POST /api/vehicle/register
DELETE /api/vehicle/remove/:vehicleId
PUT /api/vehicle/update/:vehicleId
```
- [x] Complete CRUD

- [x] The vehicle entity contains: id, brand, model, image and price

 id |     brand     |  model   |           image           |  price  
----|---------------|----------|---------------------------|----------
  4 | Chevrolet     | Cruze    | https://bit.ly/3JPRjGf    |   90000
  5 | Nissan        | Sentra   | https://bit.ly/3lcOODn    |   70000


- [x] API REST
- [x] Data persistence in database

<br/>
<br/>

<a id="2"></a>
## 2. Clone the project
```shell
git@github.com:LuizaAlanis/vehicle-sales.git
```

<br/>
<br/>

<a id="3"></a>
## 3. Configure database

<br/>

### Postgres step by step

<br/>

> Install postgres locally with following commands on linux ubuntu 20.4

a) Install wget and ca-certificates
```bash
sudo apt install wget ca-certificates
```
b) Add PostgreSQL's repository to your system
```bash
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```
c) Add the repository to the list of sources for apt
```bash
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
```
d) Update your local package index with the contents of the repository
```bash
sudo apt update
```
e) Install PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib
```
<br/>

> Check if active

Check the status of the PostgreSQL service
```bash
service postgresql status
```

<br/>

> Start server

Start the PostgreSQL server as the postgres user
```bash
sudo -u postgres psql
```

<br/>

> Connect to database

a) Get information about the current connection
```bash
\conninfo
```
b) Set the password for the postgres user to 123456
```bash
\password postgres
```
c) Create a new database named `vehicle_sales`
```sql
CREATE DATABASE vehicle_sales;
```
d) Connect to the `vehicle_sales` database
```postgres
\c vehicle_sales
```

<br/>

> Create tables for this project

a) Create a table named `users` with columns `id`, `username`, and `password`
```sql
CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR, password VARCHAR);
```
b) Create a table named `vehicles` with columns `id`, `brand`, `model`, `value`, and `image`
```sql
CREATE TABLE vehicles (id SERIAL PRIMARY KEY, brand VARCHAR, model VARCHAR, image VARCHAR, price FLOAT);
```

<br/>

> Insert data to user table

Insert a row into the `users` table with the username `admin` and the password is 123456789 with bcrypt hash `$2a$12$OMoWVjsi.Gr7oPN8OyuPa.my./uVsi2K6W7NsXoS0wtcfAtAwVK2G`
```sql
INSERT INTO users (username, password) VALUES ('admin', '$2a$12$OMoWVjsi.Gr7oPN8OyuPa.my./uVsi2K6W7NsXoS0wtcfAtAwVK2G');
```

<br/>

> Insert data to vehicles table

```sql
INSERT INTO vehicles (image, brand, model, price)
VALUES ('https://bit.ly/3JPRjGf', 'Chevrolet', 'Cruze', 90000),
       ('https://bit.ly/3lcOODn', 'Nissan', 'Sentra', 70000),
       ('https://bit.ly/3I6dEOh', 'Mitsubishi', 'Lancer', 80000),
       ('https://bit.ly/3DRx6fk', 'Hyundai', 'Elantra', 75000),
       ('https://bit.ly/3YfH6af', 'Kia', 'Rio', 68000),
       ('https://bit.ly/3RG8Xho', 'Jeep', 'Cherokee', 110000),
       ('https://bit.ly/3RKP49a', 'Dodge', 'Journey', 95000),
       ('https://bit.ly/40EEyEf', 'Ram', '1500', 130000),
       ('https://bit.ly/3RGWTfM', 'Chrysler', '300', 95000),
       ('https://bit.ly/3DPcDaS', 'Fiat', 'Uno', 50000),
       ('https://bit.ly/3DPcHaC', 'Peugeot', '208', 70000),
       ('https://bit.ly/3Yg1Sqe', 'Renault', 'Clio', 60000),
       ('https://bit.ly/3HGei3L', 'Citroen', 'C4', 70000),
       ('https://bit.ly/3XdxA6i', 'Volkswagen', 'Golf', 80000),
       ('https://bit.ly/3I4wZj0', 'BMW', '320i', 150000),
       ('https://bit.ly/3I3xbip', 'Mercedes-Benz', 'C200', 200000),
       ('https://bit.ly/3Yw9ept', 'Audi', 'A3', 130000),
       ('https://bit.ly/3jJMdk3', 'Porsche', '911', 400000),
       ('https://bit.ly/3JR0Pc8', 'Lamborghini', 'Huracan', 1500000);
```

<br/>

> Execute select to visualize all data

```sql
SELECT * FROM vehicles;
```

- The output will look like this:

 id |     brand     |  model   |           image           |  price  
----|---------------|----------|---------------------------|----------
  4 | Chevrolet     | Cruze    | https://bit.ly/3JPRjGf    |   90000
  5 | Nissan        | Sentra   | https://bit.ly/3lcOODn    |   70000


<br/>
<br/>

<a id="4"></a>
## 4. Run Node service (back-end)

- On Server folder...

```shell
cd server
```

- Run the command:

```shell
npm install
```

- Then:

```shell
npm run dev start
```

<br/>
<br/>

<a id="5"></a>
## 5. Run React (front-end)

- On Client folder...

```shell
cd client
```

- Run the command:

```shell
npm install
```


- Then:

```shell
npm start
```

- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
