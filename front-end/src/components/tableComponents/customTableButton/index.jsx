import './styles.css';
import { UserEdit } from '../../../apiCalls';
import useGlobal from '../../../hooks/useGlobal';

export default function CustomTableButton({
    buttonText, supplierData, className
}) {

    const {
        token,
        setUserData
    } = useGlobal();

    async function handleSubmit(id) {
        const {message, user} = await UserEdit(token, {fornecedor_id: id});
        setUserData(user);
    };


    return (
        <button
            onClick={() => handleSubmit(supplierData.id)}
            className='hire'>
            {buttonText}
        </button>
    );
};