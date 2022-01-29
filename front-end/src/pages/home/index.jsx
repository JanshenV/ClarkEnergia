import useGlobal from '../../hooks/useGlobal';
import HomeHeader from '../../components/homeComponents/homeHeader';
import HomeBody from '../../components/homeComponents/homeBody';

import { useNavigate } from 'react-router-dom';
import {
    UserProfile,
    SuppliersList
} from '../../apiCalls/index';
import './styles.css';

export default function Home() {
    const {
        useEffect, token,
        setModalDemandUp,
        setUserData,
        setSuppliersList,
        setLastingSuppliersList
    } = useGlobal();

    const navigate = useNavigate();

    useEffect(() => {
        async function ServidorRequest() {
            if (!token) return navigate('/');
            
            const {user} = await UserProfile(token);
            await setUserData(user);
        
            const {serverResponse} = await SuppliersList(token);
            await setSuppliersList(serverResponse);
            setLastingSuppliersList(serverResponse);
            if (user.energia_mensal || user.nome === 'Clarke Admin') return setModalDemandUp(false);
        };
        ServidorRequest();
    }, [token]);


    return (
        <div className="home-container">
            <HomeHeader />
            <HomeBody/>
        </div>
    );
}