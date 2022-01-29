import './styles.css';
import EditIcon from '../../../assets/editIcon.png';
import LogoutIcon from '../../../assets/logoutIcon.svg';
import ArrowDownIcon from '../../../assets/arrowDownIcon.png';
import useGlobal from '../../../hooks/useGlobal';

export default function HomeHeader() {
    
    const {useState, navigate, userData} = useGlobal();
    const [tinyModalUp, setTinyModalUp] = useState(true);

    function handleTinyModal() {
        setTinyModalUp(!tinyModalUp);
    };

    function handleLogout() {
        localStorage.removeItem('token');
        setTinyModalUp(true);
        return navigate('/');
         
    };


    return (
        <div className='homeHeader-container'>
            <h1>Clarke</h1>
            <div className='userInfo-edit-logout'>

                <div className='username-arrow'>
                    <p>{userData.nome}</p>
                    <img
                        onClick={() => handleTinyModal()}
                        src={ArrowDownIcon}
                        alt="Edit user"
                    />
                </div>

                <div
                    className={`tinyModal
                     ${tinyModalUp ? 'hidden' : ''}`}>

                    <div className="icon">
                        <img
                            onClick={() => handleLogout()}
                            src={LogoutIcon}
                            alt="User logout"
                        />
                    </div>   
                </div>
            </div>
        </div>
    );
}