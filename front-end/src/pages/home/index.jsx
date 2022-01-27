import useGlobal from '../../hooks/useGlobal';
import HomeHeader from '../../components/homeHeader';
import ModalMDemand from '../../components/modalMDemand';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../apiCalls/index';
import './styles.css';


export default function Home() {

    const {
        useEffect, token,
        userData, setUserData
    } = useGlobal();

    const navigate = useNavigate();


    async function UserProfileApiCall() {
        if (!token) return navigate('/');
        const { user } = await UserProfile(token);
        setUserData(user);
    };

    useEffect(() => {
        UserProfileApiCall();
    }, []);



    return (
        <div className="home-container">
            <HomeHeader />
            <ModalMDemand userData={userData}/>
        </div>
    )
}