import './assets/css/style.css';

function App() {
    return (<div className="App">
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
        </div>);
}

export default App;
