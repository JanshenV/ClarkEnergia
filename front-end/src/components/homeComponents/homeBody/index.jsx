import './styles.css';
import CustomSearchBar from '../../customSearchBar';
import CustomTable from '../../tableComponents/customTable';
import useGlobal from '../../../hooks/useGlobal';

export default function HomeBody() {
    
    async function searchSuppliers(event) {
        console.log(event.target.value)
    }


    return (
        <div className="homeBody-container">
            <CustomSearchBar
                placeholder='Procure fornecedores'
                searchFunction={searchSuppliers}
            />

            <CustomTable/>
        </div>
    );
};