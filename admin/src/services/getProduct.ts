import api from './axios';

// GET all products
export const getProducts = async () => {
    const res = await api.get('/products'); // GET http://localhost:4000/api/products
    return res.data;
};

// GET single product by id
export const getProductById = async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
};

// POST add new product
export const addProduct = async (productData) => {
    const res = await api.post('/products', productData);
    return res.data;
};

// PUT update product
export const updateProduct = async (id, productData) => {
    const res = await api.put(`/products/${id}`, productData);
    return res.data;
};

// DELETE product
export const deleteProduct = async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
};