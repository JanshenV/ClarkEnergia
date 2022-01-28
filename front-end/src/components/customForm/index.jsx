import useGlobal from '../../hooks/useGlobal';
import ModalSucess from '../modalSucess';
import CustomButton from '../customButton';

import './styles.css'

export default function CustomForm({
    title, formClass, buttonText,
    apiCall
}) {    

    const {
        useState, navigate,
        useEffect,
        modalSucessUp, setModalSucessUp,
        error, setError
    } = useGlobal();

    const [formValues, setFormValues] = useState({
        nome: title === "Login" ? '' : null,
        email: '',
        senha: ''
    });

    function handleValues(event) {
        const itemType = event.target.type;
        const itemValue = event.target.value;
        setError({ message: '' });

        if (itemType === "text") return setFormValues({
            ...formValues,
            nome: itemValue
        });

        if (itemType === "email") return setFormValues({
            ...formValues,
            email: itemValue
        });

        if (itemType === "password") return setFormValues({
            ...formValues,
            senha: itemValue
        });
    };
        
    function clearFormValues() {
        setFormValues({
            nome: '',
            email: '',
            senha: ''
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const { message, token } = await apiCall(formValues);
        
        if (title === 'Login') {
            if (!token) return setError({ message }); 
            localStorage.setItem('token', token);
            clearFormValues();
            navigate('/home');
        };

        if (title === 'Cadastro') {
            if (!message.includes('Cadastro')) return setError({ message });
            clearFormValues();
            setModalSucessUp(true);
        };
    };  
    
    useEffect(() => {
        setError({
            message: ''
        });
    },[]);

    return (
        <div className='customForm-container'>
            <form
                className={formClass}
                onSubmit={(event) => handleSubmit(event)}>

                <h1 className="title">
                    {title}
                </h1>

                {error &&
                    <p className="error">
                        {error.message}
                    </p>
                }
                
                
                {title === "Cadastro" &&
                    <>
                        <label>Nome: </label>
                        <input
                            type="text"
                            onChange={(event) => handleValues(event)}
                            required/>
                    </>
                }

                <label>Email: </label>
                <input
                    type="email"
                    required
                    onChange={(event) => handleValues(event)}
                />

                <label>Senha: </label>
                <input
                    type="password"
                    required
                    onChange={(event) => handleValues(event)}
                />

                <CustomButton buttonText={buttonText}/>
                
            </form>

            <div className='signup-login-container'>
                <p>
                    {title === 'Login' ?
                        'Não cadastrado ?' : 'Já cadastrado ?'}
                    
                    <button
                        onClick={() => title === 'Login' ?
                            navigate('/signup') : navigate('/')}>
                        {title === 'Login' ?
                            'Cadastre-se' : 'Login'}
                    </button>
                </p>
            </div>
            {modalSucessUp && <ModalSucess/>}
        </div>
    );
};