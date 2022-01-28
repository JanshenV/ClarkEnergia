import './styles.css';
import CustomSearchBar from '../customSearchBar';
import CustomTable from '../customTable';
import useGlobal from '../../hooks/useGlobal';

export default function HomeBody() {

    const {
        suppliersList, userData,
        useEffect
    } = useGlobal();
    
    useEffect(() => {
        console.log('y');
    },[HomeBody])

    

    return (
        <div className="homeBody-container">
            <CustomSearchBar
                placeholder='Procure fornecedores'
            />

            <CustomTable
                suppliersList={suppliersList}
                userData = {userData}
            />
        </div>
    );
};