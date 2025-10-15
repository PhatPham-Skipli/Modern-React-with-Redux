import axiosClient2 from '../api/axiosClient2';

export const fetchLocations = async (query) => {
    const response = await axiosClient2.get(
        `/search?format=geojson&q=${query}&addressdetails=1&limit=5&layer=address&countrycodes=vn`
    );
    return response.data;
};
