import './styles.css';
import { useState } from 'react';
import {
    UserSignUp
} from '../../apiCalls';


export default function SignUpForm() {

    const [signUpData, setSignUpData] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    const [signUpError, setSignUpError] = useState({
        message: ''
    });
    

    function handleSignUpData(event) {
        const itemType = event.target.type;
        const itemValue = event.target.value;
        setSignUpError({ message: '' });
        
        if (itemType === "text") return setSignUpData({
            ...signUpData,
            nome: itemValue
        });

        if (itemType === "email") return setSignUpData({
            ...signUpData,
            email: itemValue
        });

        if (itemType === "password") return setSignUpData({
            ...signUpData,
            senha: itemValue
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const {message} = await UserSignUp(signUpData);
    
        if (!message.includes('Cadastro')) return setSignUpError({ message });
        return setSignUpError({ message: '' });
    }


    return (
        <div className='signUpForm-container'>
            <form
                className='signUp-form'
                onSubmit={(event) => handleSubmit(event)}
            >

                <h1 className="title">
                    Cadastro
                </h1>

                {signUpError &&
                    <p className='error'>
                        {signUpError.message}
                    </p>
                }

                <label>Nome: </label>
                <input
                    type="text"
                    required
                    onChange={(event) => handleSignUpData(event)}
                />

                <label>Email: </label>
                <input
                    type="email"
                    required
                    onChange={(event) => handleSignUpData(event)}
                />

                <label>Senha: </label>
                <input
                    type="password"
                    required
                    onChange={(event) => handleSignUpData(event)}
                />

                <button>Cadastrar-se</button>
            </form>

            <div className='registred-container'>
                <p>Já cadastrado ? <button>Login</button></p>
      
            </div>
        </div>
    );
};