import axiosClient from '../api/axiosClient';

export const searchImages = async (query) => {
    const response = await axiosClient.get('/search/photos', {
        params: { query }
    });
    return response;
};

export const getLatestImages = async () => {
    const response = await axiosClient.get('/photos', {
        params: { per_page: 20 }
    });
    return response;
};