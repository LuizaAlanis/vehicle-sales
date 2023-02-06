import './assets/css/style.css';
import React from "react";

function App() {
    return <div className="App">
        <nav className="white">
            <ul className="navbar-items">
                <li className="logo">Brand</li>
            </ul>
            <ul className="navbar-items">
                <li>Releases</li>
                <li>Categories</li>
                <li>Help</li>
                <li>Login</li>
            </ul>
        </nav>
        <header className="category-container">
            <div className="category-icon">
                <i className="bi bi-car-front"></i>
            </div>
            <div className="category-name">
                <h2>Cars</h2>
            </div>
        </header>

        <div className="center">
            <section className="vehicles-for-sale">
                <div className="vehicle">
                    <div className="vehicle-image">
                        <img alt="vehicle"
                             src="https://www.transparentpng.com/thumb/car-png/clipart-transparent-car-7.png"/>
                    </div>
                    <h3 className="vehicle-name">
                        Car
                    </h3>
                    <p className="vehicle-price">$00.00</p>
                </div>

                <div className="vehicle">
                    <div className="vehicle-image">
                        <img alt="vehicle"
                             src="https://www.transparentpng.com/thumb/car-png/clipart-transparent-car-7.png"/>
                    </div>
                    <h3 className="vehicle-name">
                        Car
                    </h3>
                    <p className="vehicle-price">$00.00</p>
                </div>

                <div className="vehicle">
                    <div className="vehicle-image">
                        <img alt="vehicle"
                             src="https://www.transparentpng.com/thumb/car-png/clipart-transparent-car-7.png"/>
                    </div>
                    <h3 className="vehicle-name">
                        Car
                    </h3>
                    <p className="vehicle-price">$00.00</p>
                </div>

                <div className="vehicle">
                    <div className="vehicle-image">
                        <img alt="vehicle"
                             src="https://www.transparentpng.com/thumb/car-png/clipart-transparent-car-7.png"/>
                    </div>
                    <h3 className="vehicle-name">
                        Car
                    </h3>
                    <p className="vehicle-price">$00.00</p>
                </div>

                <div className="vehicle">
                    <div className="vehicle-image">
                        <img alt="vehicle"
                             src="https://www.transparentpng.com/thumb/car-png/clipart-transparent-car-7.png"/>
                    </div>
                    <h3 className="vehicle-name">
                        Car
                    </h3>
                    <p className="vehicle-price">$00.00</p>
                </div>

                <div className="vehicle">
                    <div className="vehicle-image">
                        <img alt="vehicle"
                             src="https://www.transparentpng.com/thumb/car-png/clipart-transparent-car-7.png"/>
                    </div>
                    <h3 className="vehicle-name">
                        Car
                    </h3>
                    <p className="vehicle-price">$00.00</p>
                </div>

                <div className="vehicle">
                    <div className="vehicle-image">
                        <img alt="vehicle"
                             src="https://www.transparentpng.com/thumb/car-png/clipart-transparent-car-7.png"/>
                    </div>
                    <h3 className="vehicle-name">
                        Car
                    </h3>
                    <p className="vehicle-price">$00.00</p>
                </div>
            </section>
        </div>
    </div>;
}

export default App;
