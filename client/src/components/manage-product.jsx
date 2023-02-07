import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ToastHelper from "../helpers/toast-helper";
import ProductHelper from "../helpers/product-helper";

class ManageProdutct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
            offlineCode: '',
            dateTime: '',
            newDueDate: ''
        };
    }

    updateProduct = (event) => {
        event.preventDefault()
        /* ToastHelper.showLoading( OPERATION HERE ), {
             pending: 'pending',
             success: 'success',
             error: {
                 notFound: 'not found',
             }
         })
             .then(response => {
                 this.setState({
                     collateral: response.data,
                     littleLoading: '',
                     showConfirmation: '',
                 });
             })
             .catch(e => {
                 this.setState({littleLoading: ''});
                 console.log('Something went wrong')
             });*/
    }

    render() {
        return (
            <section className="update-product">
                <p className="page-title">Update</p>
                <div className="forms-container">
                    <form className="custom-form" onSubmit={this.updateProduct}>
                        <label>ID</label>
                        <input className="input-text" value={ProductHelper.id(this.state.product)} readOnly/>
                        <br/>
                        <label>BRAND</label>
                        <input className="input-text" value={ProductHelper.brand(this.state.product)}/>
                        <br/>
                        <label>MODEL</label>
                        <input className="input-text" value={ProductHelper.model(this.state.product)}/>
                        <br/>
                        <label>IMAGE</label>
                        {/* TODO: Implement handler */}
                        <br/>
                        <img className="update-image" alt="product"
                             src={ProductHelper.image(this.state.product) || "http://via.placeholder.com/100"}/>
                        <br/>
                        <input className="input-text" value={ProductHelper.image(this.state.product)}/>
                        <br/>
                        <button className="primary-button" type="submit">Update</button>
                        {/* TODO: Implement onSubmitEvent */}
                    </form>
                </div>
            </section>
        );
    }
}

export default ManageProdutct
