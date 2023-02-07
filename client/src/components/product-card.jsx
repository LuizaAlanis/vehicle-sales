import React from 'react';

function ProductCard(props) {
    return (
        <div className="vehicle">
            <div className="vehicle-image">
                <img alt="vehicle"
                     src={props.image}/>
            </div>
            <h3 className="vehicle-name">
                {props.name}
            </h3>
            {/* TODO: Make the currency helper */}
            <p className="vehicle-price">${props.price}</p>
        </div>
    );
}

export default ProductCard;