import './styles.css';
import CustomSearchBar from '../../customSearchBar';
import CustomTable from '../../tableComponents/customTable';
import useGlobal from '../../../hooks/useGlobal';

export default function HomeBody() {

    const {
        setSuppliersList,
        lastingSuppliersList
    } = useGlobal();

    async function searchSuppliers(event) {
        let searchInputValue = event.target.value;
        searchInputValue = searchInputValue.toLowerCase();

        if (searchInputValue.length === 0 || searchInputValue === '') {
            return setSuppliersList(lastingSuppliersList);
        };

        const searchSupplier = lastingSuppliersList.filter(supplier => {
            return supplier.nome.toLowerCase().includes(searchInputValue) ||
                supplier.estado_origem.toLowerCase().includes(searchInputValue)
        });

        return setSuppliersList(searchSupplier);
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