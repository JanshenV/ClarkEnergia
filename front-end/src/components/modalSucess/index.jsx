import './styles.css';
import useGlobal from '../../hooks/useGlobal';

export default function ModalSucess() {
    const { setModalSucessUp, navigate } = useGlobal();

    function closeModal() {
        setModalSucessUp(false);
        navigate('/');
    };

    setTimeout(() => {
        closeModal();
    }, 5000);

    return (
        <div className="modalSucess-backdrop">
            <h1
                className='closeModal'
                onClick={() => closeModal()}>
                X
            </h1>
            <div className="modalSucess-container">
                <h1>Cadastro Realizado com sucesso!</h1>
            </div>
        </div>
    );
};