const ProductHelper = {
    id: (product) => {
        return product
            && product.id
            && product.id.toUpperCase();
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
}

export default ProductHelper;
