import React, {useEffect, useState} from 'react';
import ToastHelper from "../helpers/toast-helper";
import ProductHelper from "../helpers/product-helper";
import ManageProduct from "./manage-product";
import Accordion from "./Accordion/accordion";

function ProductTable(props) {
    const [loading, setLoading] = useState("")
    const [showList, setShowList] = useState(true)
    const [items, setItems] = useState([])
    const [product, setProduct] = useState()
    const [totalNumber, setTotalNumber] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [manage, setManage] = useState(false)
    const pages = Math.ceil(totalNumber / itemsPerPage)

    const changeQuantity = (itemsPerPage) => {
        setItemsPerPage(itemsPerPage)
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = ['', '']
            setItems(result)

            /*
                  TODO: Create Product Service
                  const result = await ProductService.findProducts(currentPage, itemsPerPage, 'DESC')
                  setItems(result.data.content)
                  setTotalNumber(result.data.totalElements)*/

            ToastHelper.showInfo('carregando componentes')
            setLoading("")
        }
        fetchData()
    }, [currentPage, itemsPerPage, product])

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

    function insert(event) {
        event.preventDefault()
        return null
    }

    function deleteProduct(event) {
        return null
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
                                insert(event)
                            }}>
                                <label className="label">Create new Product</label> <br/><br/>
                                <div className="form">
                                    <input className="input" type="text" id="" placeholder="Name"/>
                                    <input className="input" type="text" id="" placeholder="Price"/>
                                    <button className="primary-button" type="submit">Create</button>
                                </div>
                            </form>
                        }
                    />

                    <div className="filter-container">
                        <div className="portal-custom-select">
                            <div className="label-container">
                                <p className="silver label-same-size">Devices per page</p>
                            </div>
                            <select
                                onChange={(event) => changeQuantity(event.target.value)}
                                className="custom-select"
                                value={itemsPerPage}
                            >
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                    </div>

                    <div className="table-container animated animatedFadeInUp fadeInUp">
                        <table className="custom-table">
                            <thead className="table-header">
                            <tr>
                                <td>
                                    <div className="align-div">ID</div>
                                </td>
                                <td>
                                    <div className="align-div">MODEL</div>
                                </td>
                                <td>
                                    <div className="align-div">BRAND</div>
                                </td>
                                <td>
                                    <div className="align-div">IMAGE</div>
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

                            {items.map(item => {
                                return <tr key={item.id} onClick={() => setProduct(item)}
                                           onDoubleClick={() => setManage(true)}>
                                    <td>
                                        <div className="align-div">{ProductHelper.id(item) || "N/A"}</div>
                                    </td>
                                    <td>
                                        <div className="align-div">{ProductHelper.model(item) || "N/A"}</div>
                                    </td>
                                    <td>
                                        <div className="align-div">{ProductHelper.brand(item) || "N/A"}</div>
                                    </td>
                                    <td>
                                        <div className="align-div">{ProductHelper.image(item) || "N/A"}</div>
                                    </td>
                                    <td>
                                        <div className="align-div">{ProductHelper.price(item) || "N/A"}</div>
                                    </td>
                                    <td onClick={() => setShowList(false)}>
                                        <i className="bi bi-pencil bi-accent bi-lg"></i>
                                    </td>

                                    <td onClick={() => deleteProduct(item)}>
                                        <i className="bi bi-trash3 bi-accent bi-lg"></i>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination-container">
                        <div className="pagination-bar">
                            <button value={0} onClick={(event) => {
                                first(event)
                            }} disabled={currentPage === 0}>
                                First
                            </button>

                            <button value={currentPage > 0 ? currentPage - 1 : currentPage} onClick={(event) => {
                                previous(event)
                            }} disabled={currentPage === 0}>
                                <i className="bi bi-chevron-left"></i>
                            </button>

                            <button className="currentPage" value={currentPage}>{currentPage + 1}</button>

                            <button value={currentPage < pages - 1 ? currentPage + 1 : currentPage}
                                    onClick={(event) => {
                                        next(event)
                                    }} disabled={currentPage === pages - 1}>
                                <i className="bi bi-chevron-right"></i>
                            </button>

                            <button value={pages - 1} onClick={(event) => {
                                last(event)
                            }} disabled={currentPage === pages - 1}>
                                Last
                            </button>
                        </div>
                        <div className="pagination-numbers">
                            Total {totalNumber}
                        </div>
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
