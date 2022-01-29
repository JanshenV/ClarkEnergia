import { SingleSupplier, UserEdit, SuppliersList } from '../../../apiCalls/index';
import useGlobal from '../../../hooks/useGlobal';
import './styles.css';

export default function MySupplier() {

    const {
        setUserData,
        useEffect, token, setMySupplierModalUp,
        mySupplier, setMySupplier,
    } = useGlobal();


    async function mySupplierApiCall() {
        const { supplier } = await SingleSupplier(token);
        await setMySupplier(supplier);

    };

    async function cancelContractApiCall() {
        const { user } = await UserEdit(token, { fornecedor_id: null });
        await setUserData(user);
        await SuppliersList(token);
        await setMySupplierModalUp(false);
        window.location.reload(true);
    };

    useEffect(() => {
        mySupplierApiCall();
        
    }, []);

    const {
        nome, logo, estado_origem,
        preco_kwh, avaliacao_media,
        min_kwh, total_clientes
    } = mySupplier;

    return (
        <div
            className='mySupplier-backdrop'
            onClick={(event) => {
                const clickClass = event.target.className;
                if (clickClass !== 'mySupplier-backdrop') return;
                setMySupplierModalUp(false);
            }}
        >
            <p
                className='closeModal'
                onClick={() => setMySupplierModalUp(false)}
            >X
            </p>

            <div className='mySupplier-modal'>
                <div className='mySupplier-logo'>
                    <img
                        src={logo}
                        alt="logo"
                    />

                    <button
                        onClick={() => cancelContractApiCall()}
                        className='buttonCancelContract'>
                        Cancelar Contrato
                    </button>

                </div>
                <div className='mySupplier-supplierInfo'>
                    <ul>
                        <li>{nome}</li>
                        <li>Estado: {estado_origem}</li>
                        <li>Preço kWh: {preco_kwh}</li>
                        <li>Limite Min: {min_kwh}</li>
                        <li>Avaliação Média: {avaliacao_media}</li>
                        <li>Clientes: {total_clientes}</li>
                    </ul>
                </div>
               
            </div>
        </div>
    );
}