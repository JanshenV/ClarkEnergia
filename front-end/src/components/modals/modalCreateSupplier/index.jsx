import useGlobal from '../../../hooks/useGlobal';
import { CreateSupplier } from '../../../apiCalls';
import './styles.css';


export default function ModalCreateSupplier() {

    const {
        useState, setModalCreateSupplierUp,
        token,
        error, setError
    } = useGlobal();

    const [supplierFormData, setSupplierFormData] = useState({
        nome: '',
        logo: '',
        estado_origem: '',
        preco_kwh: '',
        min_kwh: '',
        total_clientes: 0,
        avaliacao_media: 0
    });

    function handleSupplierFormValues(event) {
        const inputID = event.target.id;
        const inputValue = event.target.value;
        setError({
            message: ''
        });

        console.log(error);

        if (inputID === 'name') return setSupplierFormData({
            ...supplierFormData,
            nome: inputValue
        });

        if (inputID === 'logo') return setSupplierFormData({
            ...supplierFormData,
            logo: inputValue
         });
        
        if (inputID === 'state') return setSupplierFormData({
            ...supplierFormData,
            estado_origem: inputValue
         });
        
        if (inputID === 'price') return setSupplierFormData({
            ...supplierFormData,
            preco_kwh: inputValue
         });
        
        if (inputID === 'limit') return setSupplierFormData({
            ...supplierFormData,
            min_kwh: inputValue
        });
    };


    async function handleSubmit(event) {
        event.preventDefault();
        
        const { message } = await CreateSupplier(token, supplierFormData);
        if (!message.includes('Sucesso')) return setError({
            message
        });

        setModalCreateSupplierUp(false);
        window.location.reload(true);

    };

    async function closeModal() {
        setModalCreateSupplierUp(false);
    };

    

    return (
        <div className='createSupplier-backdrop'>
            <div className="createSupplier-container">

                {error.message && <p className='createSupplier-error'>{error.message}</p>}
                <form
                    onSubmit={(event) => handleSubmit(event)}
                    className="createSupplier-form">
                    <label>Nome:</label>
                    <input
                        id='name'
                        type="text"
                        required
                        onChange={(event) => handleSupplierFormValues(event)}
                    />

                    <label>Logo Link:</label>
                    <input
                        id='logo'
                        type="text"
                        required
                        onChange={(event) => handleSupplierFormValues(event)}
                    />

                    <label>Sigla Estado:</label>
                    <input
                        id='state'
                        type="text"
                        required
                        onChange={(event) => handleSupplierFormValues(event)}
                    />

                    <label>Preço kWh:</label>
                    <input
                        id='price'
                        type="number"
                        required
                        onChange={(event) => handleSupplierFormValues(event)}
                    />

                    <label>Limite Mínimo kWh:</label>
                    <input
                        id='limit'
                        type="text"
                        required
                        onChange={(event) => handleSupplierFormValues(event)}
                    />

                    <div className='createSupplierForm-buttons'>
                        <button
                            className='confirmSubmitButton'
                        >
                            Confirmar
                        </button>

                        <button
                            className='cancelSubmitButton'
                            onClick={() => closeModal()}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
