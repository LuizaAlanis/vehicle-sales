const express = require("express")

const allCars = [{name: "Tempra", image: "https://img.freepik.com/free-psd/silver-sedan-car_53876-84522.jpg?w=1380&t=st=1675453507~exp=1675454107~hmac=297c85d83c967d9d596ee99ef6d9836e7c80c667d9036e7835978b7a0dfcbad7"}];
const routes = express.Router()

// C
routes.post("/cars", (request, response) => {
    const {name} = request.body
    const {image} = request.body
    allCars.push({name, image})
    return response.status(201).json(allCars)
})

// R
routes.get("/cars", (request, response) => {
    return response.status(200).json(allCars)
})
// U
// D

module.exports = routes;