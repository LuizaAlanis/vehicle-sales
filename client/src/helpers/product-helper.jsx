const ProductHelper = {
    id: (product) => {
        return product
            && product.id;
    },
    model: (product) => {
        return product
            && product.model
            && product.model.toUpperCase();
    },
    brand: (product) => {
        return product
            && product.brand
            && product.brand.toUpperCase();
    },
    image: (product) => {
        return product
            && product.image;
    },
    price: (product) => {
        return product
            && product.price
            && product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    },
    price_without_formatting: (product) => {
        return product
            && product.price;
    },
}

export default ProductHelper;
