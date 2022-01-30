import './styles.css';
import CustomSearchBar from '../../customSearchBar';
import CustomTable from '../../tableComponents/customTable';
import useGlobal from '../../../hooks/useGlobal';
import CustomButton from '../../customButton';
import MySupplier from '../../modals/modalMySupplier'
import ModalMDemand from '../../modals/modalMDemand';
import ModalCreateSupplier from '../../modals/modalCreateSupplier';

export default function HomeBody() {
    const {
        setSuppliersList, lastingSuppliersList,
        userData,
        mySupplierModalUp, setMySupplierModalUp,
        modalDemandUp,
        modalCreateSupplierUp, setModalCreateSupplierUp
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
    };

    async function callsMySupplier() {
        if (!userData.fornecedor_id) return;
        setMySupplierModalUp(true);
    };

    async function insertSupplier() {
        setModalCreateSupplierUp(true);
    };

    return (
        <div className="homeBody-container">
            {modalDemandUp && <ModalMDemand />}
            {modalCreateSupplierUp && <ModalCreateSupplier />}

            <div className='topBody'>
                <CustomSearchBar
                    placeholder='Procure fornecedores'
                    searchFunction={searchSuppliers}
                />
                {(userData.nome !== 'Clarke Admin') ?
                    <CustomButton
                        buttonText='Meu contrato'
                        buttonFunction={callsMySupplier}
                    /> :
                    <CustomButton
                        buttonText='Adiconar Fornecedor'
                        buttonFunction={insertSupplier}
                    />
                }
            </div>
            {mySupplierModalUp && <MySupplier />}
            <CustomTable />
        </div>
    );
};