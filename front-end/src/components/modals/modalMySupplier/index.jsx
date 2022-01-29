import { SingleSupplier, UserEdit } from '../../../apiCalls/index';
import useGlobal from '../../../hooks/useGlobal';
import './styles.css';

export default function MySupplier() {

    const {
        useState, setUserData,
        useEffect, token, setMySupplierModalUp
    } = useGlobal();

    const [mySupplier, setMySupplier] = useState({});

    async function mySupplierApiCall() {
         const { supplier } = await SingleSupplier(token);
        setMySupplier(supplier);
    };

    async function cancelContractApiCall() {
        const { user } = await UserEdit(token, { fornecedor_id: null });
        setUserData(user);
        setMySupplierModalUp(false);
    }

    useEffect(() => {
        mySupplierApiCall();
    }, []);

    const { nome, logo, estado_origem, preco_kwh, avaliacao_media, min_kwh } = mySupplier;

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
                    <p>{nome}</p>
                    <p>Estado: {estado_origem}</p>
                    <p>Preço por kWh: R$: {preco_kwh}</p>
                    <p>Avaliação: {avaliacao_media}</p>
                    <p>Limite mínimo: {min_kwh} kWh </p>
                </div>
               
            </div>
        </div>
    );
}