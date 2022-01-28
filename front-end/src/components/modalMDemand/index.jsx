import useGlobal from '../../hooks/useGlobal';
import { UserEdit } from '../../apiCalls';
import './styles.css';

export default function ModalMDemand() {

    const {
        useState,
        token, userData,
        error, setError,
        modalDemandUp, setModalDemandUp,
    } = useGlobal();

    const [demand, setDemand] = useState({
        energia_mensal: 0
    });

    function handleDemandValue(event) {
        const demandValue = event.target.value;
        setError({
            message: ''
        });

        setDemand({
            energia_mensal: demandValue
        });
    };

    async function handleSubmit() {
        if (demand.energia_mensal < 1) return setError({
            message: 'Demanda mensal de energia há de ser maior que zero.'
        });
        const { message } = await UserEdit(token, demand);
  
        if (!message.includes('sucesso')) return setError({
            message
        });

        return setModalDemandUp(!modalDemandUp);
    };
    
    return (
        <div
            className={`mdemand-backdrop ${modalDemandUp ? '' : 'hidden'}`}>
            <div className="mdemand-modal">
                <h1>Olá {userData.nome}!</h1>

                {error.message ? 
                    <p className='error'>{error.message}</p> :
                    <p>Por favor, nos informe sua demanda mensal de energia.</p> 
                }
                

                <input
                    type="number"
                    onChange={(event) => handleDemandValue(event) }
                    placeholder='3000'
                />

                <button
                    onClick={() => handleSubmit() }>
                    Confirmar
                </button>
            </div>
        </div>
    );
}