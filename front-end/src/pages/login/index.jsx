import CustomForm from '../../components/customForm';
import { UserLogin } from '../../apiCalls/index.js';

export default function Login(){
    return (
        <CustomForm
            title='Login'
            formClass='login-form'
            buttonText='Login'
            apiCall={UserLogin}
        />
    );
};