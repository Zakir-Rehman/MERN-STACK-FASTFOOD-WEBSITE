import axios from 'axios';
import { config } from './config';



const api = axios.create({
    baseURL: config.baseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
api.interceptors.request.use(
    (request) => {
        console.group('🚀 API REQUEST');

        console.log('URL:', `${request.baseURL}${request.url}`);
        console.log('Method:', request.method?.toUpperCase());
        console.log('Headers:', request.headers);
        console.log('Data:', request.data);
        console.log('Params:', request.params);

        console.groupEnd();

        return request;
    },
    (error) => {
        console.error('❌ REQUEST ERROR:', error);

        return Promise.reject(error);
    }
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================

api.interceptors.response.use(
    (response) => {
        console.group('✅ API RESPONSE');

        console.log('URL:', response.config.url);
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);
        console.log('Headers:', response.headers);
        console.log('Data:', response.data);

        console.groupEnd();

        return response;
    },
    (error) => {
        console.group('❌ API ERROR');

        if (error.response) {
            // Server ne response diya, lekin status error hai
            console.log('URL:', error.config?.url);
            console.log('Status:', error.response.status);
            console.log('Status Text:', error.response.statusText);
            console.log('Response Data:', error.response.data);
            console.log('Response Headers:', error.response.headers);
        } else if (error.request) {
            // Request send hui lekin response nahi aaya
            console.log('Request:', error.request);
            console.log('Message:', 'Server se response nahi aaya');
        } else {
            // Request create karte waqt error
            console.log('Message:', error.message);
        }

        console.groupEnd();

        return Promise.reject(error);
    }
);
export default api;