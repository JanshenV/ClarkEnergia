import './styles.css';
import { UserEdit, SingleSupplier } from '../../../apiCalls';
import useGlobal from '../../../hooks/useGlobal';

export default function CustomTableButton({
    buttonText, supplierData
}) {

    const {
        token,
        setUserData,
        setMySupplier
    } = useGlobal();

    async function handleSubmit(id) {
        const { message, user } = await UserEdit(token, { fornecedor_id: id });
        const {supplier} = await SingleSupplier(token);
        setMySupplier(supplier);
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