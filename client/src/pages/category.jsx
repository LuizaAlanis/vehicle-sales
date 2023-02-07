import React from "react";
import ProductCard from "../components/product-card";

function Category() {
    return <div className="main">
        <header className="category-container">
            <div className="category-icon">
                <i className="bi bi-car-front"></i>
            </div>
            <div className="category-name">
                <h2>Cars</h2>
            </div>
        </header>
        <section className="vehicles-for-sale animated animatedFadeInUp fadeInUp">
            <ProductCard
                name={'Product'}
                price={'00.00'}
                image={'https://www.transparentpng.com/thumb/car-png/clipart-transparent-car-7.png'}/>
            <ProductCard
                name={'Product'}
                price={'00.00'}
                image={'https://www.transparentpng.com/thumb/car-png/clipart-transparent-car-7.png'}/>
            <ProductCard
                name={'Product'}
                price={'00.00'}
                image={'https://www.transparentpng.com/thumb/car-png/clipart-transparent-car-7.png'}/>
            <ProductCard
                name={'Product'}
                price={'00.00'}
                image={'https://www.transparentpng.com/thumb/car-png/clipart-transparent-car-7.png'}/>
        </section>
    </div>
}

export default Category;
