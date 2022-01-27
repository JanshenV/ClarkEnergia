import './styles.css';


export default function ModalMDemand() {
    return (
        <div className='mdemand-backdrop'>
            <div className="mdemand-modal">
                <h1>Olá usuário!</h1>
                <p>Por favor, nos informe sua demanda mensal de energia.</p>

                <input
                    type="number"
                    required
                    placeholder='3000'
                />

                <button>Confirmar</button>
            </div>
        </div>
    )
}