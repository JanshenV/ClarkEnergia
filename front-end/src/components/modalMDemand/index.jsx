
import useGlobal from '../../hooks/useGlobal';
import './styles.css';

export default function ModalMDemand({userData}) {

    const { useEffect } = useGlobal();


    const stringCurrentUser = localStorage.getItem('currentUser');
    const {
        nome, email
    } = JSON.parse(stringCurrentUser);
    

    return (
        <div className='mdemand-backdrop'>
            <div className="mdemand-modal">
                <h1>Olá {nome}!</h1>
                <p>Por favor, nos informe sua demanda mensal de energia.</p>

                <input
                    type="number"
                    required
                    placeholder='3000'
                />

                <button>Confirmar</button>
            </div>
        </div>
    );
}