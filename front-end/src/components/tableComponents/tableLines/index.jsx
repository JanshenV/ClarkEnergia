import './styles.css';
import CustomTableButton from '../customTableButton';



export default function TableLines({
    supplier, user }) {

    const {
        logo, nome, estado_origem,
        preco_kwh, avaliacao_media, min_kwh
    } = supplier;



    return (
        <div
            className='tableLine-container'
        >
            <div className='logo'>
                <img
                    src={logo}
                    alt="logo"
                />
            </div>

            <div className='supplierInfo'>
                <p>{nome}</p>
                <p>Estado: {estado_origem}</p>
                <p>Preço por kWh: R$: {preco_kwh}</p>
                <p>Avaliação: {avaliacao_media}</p>
                <p>Limite mínimo: {min_kwh} kWh </p>
                
                {(supplier.id !== user.fornecedor_id) && <CustomTableButton
                    className='contratar'
                    buttonText='Contratar'
                    supplierData={supplier}
                    userData={user}
                />}

                
            </div>
        </div>
    );
}