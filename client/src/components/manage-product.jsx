import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ProductHelper from "../helpers/product-helper";
import ToastHelper from "../helpers/toast-helper";
import ProductService from "../service/product-service";

class ManageProdutct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
            id: ProductHelper.id(props.product),
            brandInput: null,
            modelInput: null,
            imageInput: null,
            priceInput: null
        };
    }

    handleBrandChange = (event) => {
        event.preventDefault()
        this.setState({brandInput: event.target.value})
    }

    handleModelChange = (event) => {
        event.preventDefault()
        this.setState({modelInput: event.target.value})
    }

    handleImageChange = (event) => {
        event.preventDefault()
        this.setState({imageInput: event.target.value})
    }

    handlePriceChange = (event) => {
        event.preventDefault()
        this.setState({priceInput: event.target.value})
    }

    updateProduct = (event) => {
        event.preventDefault()

        const id = this.state.id
        const vehicle = {
            brand: event.target[0].value,
            model: event.target[1].value,
            image: event.target[2].value,
            price: parseFloat(event.target[3].value.replace(/\D/g,''))
        }
        console.log(vehicle)

        ToastHelper.showLoading(ProductService.updateVehicle(id, vehicle), {
            success: 'Vehicle updated',
            pending: 'Pending...',
            error: {
                notFound: 'Not found',
                message: 'Error, you may need authenticate again'
            },
        })
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                console.log(e)
            });
    }

    render() {
        return (
            <section className="update-product">
                <p className="page-title">Update</p>
                <div className="forms-container">
                    <form className="custom-form" onSubmit={(event) => this.updateProduct(event)}>
                        <label>BRAND</label>
                        <input className="input-text"
                               value={this.state.brandInput || ProductHelper.brand(this.state.product)}
                               onChange={(event) => this.handleBrandChange(event)}/>
                        <br/>
                        <label>MODEL</label>
                        <input className="input-text" value={this.state.modelInput || ProductHelper.model(this.state.product)}
                               onChange={(event) => this.handleModelChange(event)}/>
                        <br/>
                        <label>IMAGE</label>
                        {/* TODO: Implement handler */}
                        <br/>
                        <img className="update-image" alt="product"
                             src={ProductHelper.image(this.state.product) || "http://via.placeholder.com/100"}/>
                        <br/>
                        <input className="input-text" value={this.state.imageInput || ProductHelper.image(this.state.product)}
                               onChange={(event) => this.handleImageChange(event)}/>
                        <br/>
                        <label>PRICE</label>
                        <input className="input-text" value={this.state.priceInput || ProductHelper.price(this.state.product)}
                               onChange={(event) => this.handlePriceChange(event)}/>
                        <br/>
                        <button className="primary-button" type="submit">Update</button>
                        <br/><br/>
                    </form>
                </div>
            </section>
        );
    }
}

export default ManageProdutct
