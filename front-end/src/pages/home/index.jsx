import useGlobal from '../../hooks/useGlobal';
import HomeHeader from '../../components/homeHeader';
import ModalMDemand from '../../components/modalMDemand';
import HomeBody from '../../components/homeBody';
import { useNavigate } from 'react-router-dom';
import {
    UserProfile,
    SuppliersList
} from '../../apiCalls/index';
import './styles.css';


export default function Home() {

    const {
        useEffect, token,
        userData, setUserData,
        setSuppliersList
    } = useGlobal();

    const navigate = useNavigate();

    async function UserProfileApiCall() {
        if (!token) return navigate('/');
        const { user } = await UserProfile(token);
        setUserData(user);
    };

    async function SuppliersApiCall() {
        const { serverResponse } = await SuppliersList(token);
        setSuppliersList(serverResponse);
    }

    useEffect(() => {
        UserProfileApiCall();
        SuppliersApiCall();
    }, []);

    const { energia_mensal } = userData;

    return (
        <div className="home-container">
            <HomeHeader />
            <HomeBody/>
            {!energia_mensal && <ModalMDemand/>}
        </div>
    );
}