import './styles.css';
import { useState } from 'react';

export default function SignUpForm() {

    const [signUpData, setSignUpData] = useState({
        nome: '',
        email: '',
        senha: ''
    });


    function handleSignUpData(event) {
        const itemType = event.target.type;
        const itemValue = event.target.value;
        
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

        //POST API CALL
        console.log(signUpData);
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

                <label>Nome: </label>
                <input
                    type="text"
                    onChange={(event) => handleSignUpData(event) }
                />

                <label>Email: </label>
                <input
                    type="email"
                    onChange={(event) => handleSignUpData(event) }
                />

                <label>Senha: </label>
                <input
                    type="password"
                    onChange={(event) => handleSignUpData(event) }
                />

                <button>Cadastrar-se</button>
            </form>

            <div className='registred-container'>
                <p>Já cadastrado ? <button>Login</button></p>
      
            </div>
        </div>
    );
};