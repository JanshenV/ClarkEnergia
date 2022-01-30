import {
    SingleSupplier, SuppliersList,
    EditSupplier, UserEdit,
} from '../../../apiCalls/index';
import useGlobal from '../../../hooks/useGlobal';
import './styles.css';

export default function MySupplier() {

    const {
        setUserData, useState,
        userData,
        useEffect, token, setMySupplierModalUp,
        mySupplier, setMySupplier,
    } = useGlobal();

    const [rating, setRating] = useState({
        avaliacao_media: Number(0)
    });

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

    async function handleSubmitRating() {
        let ratedByUser = localStorage.getItem('ratedByUser');

        if (ratedByUser) {
            ratedByUser = await JSON.parse(ratedByUser);

            if (ratedByUser.user_id === userData.id &&
                ratedByUser.supplier_id === mySupplier.id &&
                ratedByUser.rated) return alert('Só é possível avaliar uma vez');
        };

        const { avaliacao_media } = rating;

        ratedByUser = {
            user_id: userData.id,
            supplier_id: mySupplier.id,
            rated: true
        };
        
        localStorage.setItem('ratedByUser', JSON.stringify(ratedByUser));
        const serverResponse = await EditSupplier(token, { avaliacao_media });
        if (serverResponse.message) return console.log(serverResponse.message);

        await setMySupplier(setMySupplier);
        await setMySupplierModalUp(false);
        window.location.reload(true);
    };

    async function handleRatingValue(event){
        const inputValue = event.target.value;
        const eventKey = event.key;
        const { avaliacao_media } = rating;

        if (eventKey === 'Enter') {
            if (avaliacao_media < 1 || avaliacao_media > 5) {
                return alert(`Avaliação entre 1 e 5`);
            };

            return handleSubmitRating();
        }

        setRating({
            avaliacao_media: inputValue
        });
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

                   { <div className="tableLine-rating">
                        <label>Avaliação: </label>
                        <input
                            type="number"
                            onChange={(event) => handleRatingValue(event)}
                            onKeyDown={(event) => handleRatingValue(event)}
                            placeholder={`1 a 5`}
                        />
                    </div>}
                </div>
               
            </div>
        </div>
    );
}