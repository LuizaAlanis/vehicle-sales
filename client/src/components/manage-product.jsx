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
            tag: ProductHelper.executorItemId(props.product),
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
            <>
                <p className="page-title">string</p>
                <div className="forms-container">
                    <form className="custom-form" onSubmit={this.updateProduct}>
                        <label>ID</label>
                        <input className="input-text" value={ProductHelper.id(this.state.product)} readOnly/>
                        <label>BRAND</label>
                        <input className="input-text" value={ProductHelper.brand(this.state.product)}/>
                        <label>MODEL</label>
                        <input className="input-text" value={ProductHelper.model(this.state.product)}/>
                        <label>IMAGE</label>
                        {/* TODO: Implement handler */}
                        <img alt="product" src={ProductHelper.image(this.state.product)}/>
                        <input className="input-text" value={ProductHelper.image(this.state.product)}/>
                        {/* TODO: Implement onSubmitEvent */}
                    </form>
                </div>
            </>
        );
    }
}

export default ManageProdutct
