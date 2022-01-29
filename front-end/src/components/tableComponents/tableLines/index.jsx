import './styles.css';
import CustomTableButton from '../customTableButton';

export default function TableLines({
    supplier, user }) {

    const {
        logo, nome, estado_origem,
        preco_kwh, avaliacao_media, min_kwh,
        total_clientes
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
                <ul>
                    <li>{nome}</li>
                    <li>Estado: {estado_origem}</li>
                    <li>Preço kWh: {preco_kwh}</li>
                    <li>Limite Min: {min_kwh}</li>
                    <li>Avaliação Média: {avaliacao_media}</li>
                    <li>Clientes: {total_clientes}</li>
                </ul>
                
                <div className='tableLine-buttons'>
                    {(supplier.id !== user.fornecedor_id &&
                        user.nome !== 'Clarke Admin') &&
                        <CustomTableButton
                        className='contratar'
                        buttonText='Contratar'
                        supplierData={supplier}
                        userData={user}
                    />}
                    {/* <CustomTableButton /> */}
                </div>
               
            </div>
        </div>
    );
};