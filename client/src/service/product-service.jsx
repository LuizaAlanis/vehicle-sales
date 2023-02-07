import API from '../config/api';

const  ProductService = {
    /**
     * @description Get all vehicles.
     * @returns {Promise<AxiosResponse<any>>} The product information.
     */
    getAllVehicles: () => {
        return API.get(`/vehicles`);
    },
    /**
     * @description Create new product
     */
    createVehicle: (body) => {
        return API.post(`/vehicle/register`, body);
    },
    /**
     * @description Update
     */
    updateVehicle: (body) => {
        return API.post(`/vehicle/register`, body);
    },
    /**
     * @description Delete
     */
    deleteVehicle: (id) => {
        return API.delete(`/vehicle/remove/${id}`);
    }
};

export default ProductService;

