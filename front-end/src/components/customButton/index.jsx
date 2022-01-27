import './styles.css';


export default function CustomButton({
    buttonText, buttonFunction
}) {
    return (
        <button
            className='customButton'
        >{buttonText}
        </button>
    );
}