import './styles.css';


export default function CustomButton({buttonText, buttonFunction }) {
    return (
        <button
            className='customButton'
            onClick={() => {
                if (buttonFunction) return buttonFunction();
            }}
        >{buttonText}
        </button>
    );
}