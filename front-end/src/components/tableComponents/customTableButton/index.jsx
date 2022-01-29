import './styles.css';
import {
    UserEdit, SingleSupplier, SuppliersList,
} from '../../../apiCalls';
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
        const {  user } = await UserEdit(token, { fornecedor_id: id });
        await SuppliersList(token);
        const { supplier } = await SingleSupplier(token);
        await setMySupplier(supplier);
        await setUserData(user);
        window.location.reload(true);
    };

    return (
        <button
            onClick={() => handleSubmit(supplierData.id)}
            className='hire'>
            {buttonText}
        </button>
    );
};