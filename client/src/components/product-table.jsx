import React, {useEffect, useState} from 'react';
import ToastHelper from "../helpers/toast-helper";
import ProductHelper from "../helpers/product-helper";
import ManageProduct from "./manage-product";
import Accordion from "./Accordion/accordion";
import ProductService from "../service/product-service";

function ProductTable(props) {
    const [loading, setLoading] = useState("")
    const [showList, setShowList] = useState(true)
    const [items, setItems] = useState([])
    const [product, setProduct] = useState()
    const [totalNumber, setTotalNumber] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [manage, setManage] = useState(false)
    const [vehicles, setVehicles] = useState([])
    const pages = Math.ceil(totalNumber / itemsPerPage)

    useEffect(() => {
        const fetchData = async () => {
            const response = await ProductService.getAllVehicles();
            console.log(response.data)
            setTotalNumber(response.data.length)
            setVehicles(response.data)
        }
        fetchData()
    }, [vehicles, setVehicles])

    function first(event) {
        setCurrentPage(Number(event.target.value))
        setLoading("first")
    }

    function previous(event) {
        setCurrentPage(Number(event.target.value))
        setLoading("previous")
    }

    function next(event) {
        setCurrentPage(Number(event.target.value))
        setLoading("next")
    }

    function last(event) {
        setCurrentPage(Number(event.target.value))
        setLoading("last")
    }

    function create(event) {
        event.preventDefault()

        const vehicle = {
            image: event.target[0].value,
            brand: event.target[1].value,
            model: event.target[2].value,
            price: event.target[3].value
        }
        console.log(vehicle)

        ToastHelper.showLoading(ProductService.createVehicle(vehicle), {
            success: 'Vehicle created',
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

    function deleteProduct(event, id) {
        event.preventDefault()

        ToastHelper.showLoading(ProductService.deleteVehicle(id), {
            success: 'Vehicle deleted',
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

    return (<>
            {showList ?
                <>
                    <Accordion
                        plus={true}
                        active={true}
                        title='New product'
                        content={
                            /* find and activate */
                            <form className="device-id-container" id="device-form" onSubmit={(event) => {
                                create(event)
                            }}>
                                <label className="label">Create new Product</label> <br/><br/>
                                <div className="form">
                                    <input className="input" type="text" placeholder="Image" required/>
                                    <input className="input" type="text" placeholder="Brand" required/>
                                    <input className="input" type="text" placeholder="Model" required/>
                                    <input className="input" type="text" placeholder="Price" required/>
                                    <button className="primary-button" type="submit">Create</button>
                                </div>
                            </form>
                        }
                    />

                    <div className="table-container animated animatedFadeInUp fadeInUp">
                        <table className="custom-table">
                            <thead className="table-header">
                            <tr>
                                <td>
                                    <div className="align-div">IMAGE</div>
                                </td>
                                <td>
                                    <div className="align-div">ID</div>
                                </td>
                                <td>
                                    <div className="align-div">BRAND</div>
                                </td>
                                <td>
                                    <div className="align-div">MODEL</div>
                                </td>
                                <td>
                                    <div className="align-div">PRICE</div>
                                </td>
                                <td>
                                    <div className="align-div"></div>
                                </td>
                                <td>
                                    <div className="align-div"></div>
                                </td>
                            </tr>
                            </thead>
                            <tbody className="custom-tbody">

                            {vehicles.map(vehicle => {
                                return <tr key={ProductHelper.id(vehicle)} onClick={() => setProduct(vehicle)}
                                           onDoubleClick={() => setManage(true)}>
                                    <td>
                                        <div className="align-div">{}
                                            <img className="product-preview" alt="Product preview"
                                                 src={ProductHelper.image(vehicle) || 'https://via.placeholder.com/50'}/>
                                        </div>
                                    </td>
                                    <td>
                                        {ProductHelper.id(vehicle) || "N/A"}
                                    </td>
                                    <td>
                                        {ProductHelper.brand(vehicle) || "N/A"}
                                    </td>
                                    <td>
                                        {ProductHelper.model(vehicle) || "N/A"}
                                    </td>
                                    <td>
                                        {ProductHelper.price(vehicle) || "N/A"}
                                    </td>
                                    <td onClick={() => setShowList(false)}>
                                        <i className="bi bi-pencil bi-accent bi-lg"></i>
                                    </td>

                                    <td onClick={(event) => deleteProduct(event, ProductHelper.id(vehicle))}>
                                        <i className="bi bi-trash3 bi-accent bi-lg"></i>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        Total number of vehicles: {totalNumber}
                    </div>
                </>
                :
                <>
                    <p className="link" style={{marginTop: '40px'}} onClick={() => setShowList(true)}><i
                        className="bi bi-chevron-left"></i>Back home</p>
                    <div className="animated animatedFadeInUp fadeInUp">
                        <ManageProduct product={product}/>
                        <br/>
                    </div>

                </>
            }
        </>
    );
}

export default ProductTable
