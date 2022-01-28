import TableLines from '../tableLines';
import useGlobal from '../../../hooks/useGlobal';
import './styles.css';

export default function CustomTable() {
    
    const {suppliersList} = useGlobal();

    return (
        <div className='customTable-container'>
            {suppliersList.map(supplier => {
                return (
                        <TableLines
                            logo={supplier.logo}
                            fornecedor={supplier.nome}
                            estado_origem={supplier.estado_origem}
                            preco_kwh={supplier.preco_kwh}
                            avaliacao_media={supplier.avaliacao_media}
                            min_kwh={supplier.min_kwh}
                            buttonText='Contratar'
                        />
                );
            })}
        </div>
    );
}