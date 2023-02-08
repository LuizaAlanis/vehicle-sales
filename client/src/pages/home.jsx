import React, {useEffect, useState} from "react";
import ProductCard from "../components/product-card";
import ProductService from "../service/product-service";
import ProductHelper from "../helpers/product-helper";

function Home() {
    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await ProductService.getAllVehicles();
            console.log(response.data)
            setVehicles(response.data)
        }
        fetchData()
    }, [])

    return <div className="main">
        <div className="banner"></div>
        <header className="category-container">
            <div className="category-icon">
                <i className="bi bi-car-front"></i>
            </div>
            <div className="category-name">
                <h2>Our products</h2>
            </div>
        </header>
        <section className="vehicles-for-sale animated animatedFadeInUp fadeInUp">

            {vehicles.map(vehicle => {
                return <ProductCard
                    name={ProductHelper.brand(vehicle) + " " + ProductHelper.model(vehicle)}
                    price={ProductHelper.price(vehicle) || "N/A"}
                    image={ProductHelper.image(vehicle)}/>
            })}
        </section>
    </div>
}

export default Home;
