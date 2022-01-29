import TableLines from '../tableLines';
import useGlobal from '../../../hooks/useGlobal';
import { SuppliersList } from '../../../apiCalls';
import './styles.css';

export default function CustomTable() {
    
    const { suppliersList, userData } = useGlobal();
    

    return (
        <div className='customTable-container'>
            {suppliersList && suppliersList.map(supplier => {
                return (
                    <TableLines
                        user={userData}
                        supplier={supplier}
                    />
                );
            })}
        </div>
    );
}