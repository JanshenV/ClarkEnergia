import CustomForm from '../../components/customForm';
import useGlobal from '../../hooks/useGlobal';
import { useNavigate } from 'react-router-dom';
import existingToken from '../../utils/existingToken';
import { UserSignUp } from '../../apiCalls/index.js';


export default function SignUp() {

    const { useEffect, token, currentUrl } = useGlobal();
    const navigate = useNavigate();

    useEffect(() => {
        existingToken(token, navigate);
    }, [currentUrl]);


    return (
        <CustomForm
            title='Cadastro'
            formClass='signUp-form'
            buttonText='Cadastrar-se'
            apiCall={UserSignUp}
        />
    );
};