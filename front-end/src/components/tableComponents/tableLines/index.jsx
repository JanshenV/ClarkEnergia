import './styles.css';
import CustomButton from '../../customButton';


export default function TableLines({
    logo,
    fornecedor, estado_origem,
    preco_kwh, avaliacao_media,
    buttonText, min_kwh
}) {
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
                <p>{fornecedor}</p>
                <p>Estado: {estado_origem}</p>
                <p>Preço por kWh: R$: {preco_kwh}</p>
                <p>Avaliação: {avaliacao_media}</p>
                <p>Limite mínimo: {min_kwh} kWh </p>

                <CustomButton
                    buttonText={buttonText}
                />
            </div>
        </div>
    );
}