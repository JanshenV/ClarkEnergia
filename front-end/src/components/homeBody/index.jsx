import './styles.css';
import CustomSearchBar from '../customSearchBar';
import CustomTable from '../customTable';
import { SuppliersList } from '../../apiCalls';
import useGlobal from '../../hooks/useGlobal';

export default function HomeBody() {

    const {
        userData, suppliersList,
    } = useGlobal();
    
     function searchSuppliers(event) {
    };


    return (
        <div className="homeBody-container">
            <CustomSearchBar
                placeholder='Procure fornecedores'
                searchFunction={searchSuppliers}
            />

            <CustomTable/>
        </div>
    )
}