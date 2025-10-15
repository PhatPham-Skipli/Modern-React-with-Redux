import { createContext, useState } from "react";
import { searchPackages } from "../services/regitryService";

const RegistryContext = createContext();

export const RegistryProvider = ({ children }) => {
    const [term, setTerm] = useState('');
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (newTerm) => {
        setTerm(newTerm);
        setLoading(true);
        setError(null);
        try {
            const response = await searchPackages(newTerm);
            console.log(response)
            setPackages(response.objects || []);
        } catch (err) {
            setError('Không thể tải packages');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RegistryContext.Provider value={{ term, packages, loading, error, handleSearch }}>
            {children}
        </RegistryContext.Provider>
    );
};

export default RegistryContext;