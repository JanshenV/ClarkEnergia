import CustomForm from '../../components/customForm';
import { UserSignUp } from '../../apiCalls/index.js';


export default function SignUp() {
    return (
        <CustomForm
            title='Cadastro'
            formClass='signUp-form'
            buttonText='Cadastrar-se'
            apiCall={UserSignUp}
        />
    );
};