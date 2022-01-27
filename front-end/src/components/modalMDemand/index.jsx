import useGlobal from '../../hooks/useGlobal';
import { UserEdit } from '../../apiCalls';
import './styles.css';

export default function ModalMDemand({userData}) {

    const {
        useEffect, useState,
        token,
        error, setError
    } = useGlobal();

    const [demand, setDemand] = useState({
        energia_mensal: 0
    });
    const { nome } = userData;

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

        return window.location.reload(true);
    };

    return (
        <div className='mdemand-backdrop'>
            <div className="mdemand-modal">
                <h1>Olá {nome}!</h1>

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