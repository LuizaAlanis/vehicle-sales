import React from "react";
import Accordion from "../components/Accordion/accordion";
import ProductTable from "../components/product-table";

function insert(event) {
    event.preventDefault()
    return null
}

function Admin() {
    return <div className="main">

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
        <ProductTable/>
    </div>
}

export default Admin;
