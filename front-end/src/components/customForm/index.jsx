import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  ModalSucess  from '../modalSucess';

import './styles.css'

export default function CustomForm({
    title, formClass, buttonText,
    apiCall
}) {    

    const [error, setError] = useState({
        message: ''
    });

    const [formValues, setFormValues] = useState({
        nome: title === "Login" ? '' : null,
        email: '',
        senha: ''
    });

    const [modalSucessUp, setModalSucessUp] = useState(false);

    const navigate = useNavigate();

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
            // navigate('/');
        };
    };   

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

                <button>{buttonText}</button>
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
            {modalSucessUp &&
                <ModalSucess
                    setModalSucessUp={setModalSucessUp}
                />
            }
        </div>
    );
};