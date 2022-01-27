import useGlobal from '../../hooks/useGlobal';
import CustomButton from '../customButton/index'
import './styles.css';

function TableLines({
    logo,
    fornecedor, estado_origem,
    preco_kwh, avaliacao_media,
    buttonText
}) {
    return (
        <div className='tableLine-container'>
            <img
                src={logo}
                alt="logo"
            />

            <p>{fornecedor}</p>
            <p>Origem: {estado_origem}</p>
            <p>Preço por kWh: {preco_kwh}</p>
            <p>Avaliação: {avaliacao_media}</p>

            <CustomButton
                buttonText={buttonText}
            />
        </div>
    );
};



export default function CustomTable() {

    const { suppliersList } = useGlobal();


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
                        buttonText='Contratar'
                    />
                )
            })}
        </div>
    );
}