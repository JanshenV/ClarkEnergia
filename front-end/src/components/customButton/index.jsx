import './styles.css';


export default function CustomButton({buttonText}) {
    return (
        <button
            className='customButton'
        >{buttonText}
        </button>
    );
}