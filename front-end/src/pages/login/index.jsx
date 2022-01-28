import CustomForm from '../../components/customForm';
import existingToken from '../../utils/existingToken';
import { UserLogin } from '../../apiCalls/index.js';
import useGlobal from '../../hooks/useGlobal';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const { useEffect, token, currentUrl } = useGlobal();
    const navigate = useNavigate();
    

    useEffect(() => {
        existingToken(token, navigate);
    }, [currentUrl]);



    return (
        <CustomForm
            title='Login'
            formClass='login-form'
            buttonText='Login'
            apiCall={UserLogin}
        />
    );
};