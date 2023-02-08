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
    },
    /**
     * @description Auth
     */
    auth: ({username, password}) => {
        return API.post(`/login`, {username, password});
    }
};

export default ProductService;

