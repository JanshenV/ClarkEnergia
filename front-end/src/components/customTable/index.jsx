import useGlobal from '../../hooks/useGlobal';
import CustomButton from '../customButton/index'
import './styles.css';

function TableLines({
    logo,
    fornecedor, estado_origem,
    preco_kwh, avaliacao_media,
    buttonText, min_kwh
}) {
    return (
        <div className='tableLine-container'>
            <img
                src={logo}
                alt="logo"
            />

            <p>{fornecedor}</p>
            <p>Estado: {estado_origem}</p>
            <p>Preço por kWh: R$: {preco_kwh}</p>
            <p>Avaliação: {avaliacao_media}</p>
            <p>Limite mínimo: {min_kwh} kWh </p>

            <CustomButton
                buttonText={buttonText}
            />
        </div>
    );
};

export default function CustomTable({
    suppliersList}) {
    

    return (
        <div className='customTable-container'>
            {suppliersList.map(supplier => {
                return (
                    <TableLines
                        key={supplier.id}
                        logo={supplier.logo}
                        fornecedor={supplier.nome}
                        estado_origem={supplier.estado_origem}
                        preco_kwh={supplier.preco_kwh}
                        avaliacao_media={supplier.avaliacao_media}
                        min_kwh={supplier.min_kwh}
                        buttonText='Contratar'
                    />
                )
            })}
        </div>
    );
}