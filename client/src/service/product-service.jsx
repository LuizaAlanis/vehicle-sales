import API from '../config/api';

const  ProductService = {
    /**
     * @description Get all vehicles.
     * @returns {Promise<AxiosResponse<any>>} The product information.
     */
    getAllVehicles: () => {
        return API.get(`/vehicles`);
    }
};

export default ProductService;

