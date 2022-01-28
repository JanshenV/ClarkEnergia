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
        modalDemandUp, setModalDemandUp,
        suppliersList, setSuppliersList
    } = useGlobal();


    const navigate = useNavigate();

    async function ServidorRequest() {
        if (!token) return navigate('/');

        if (!userData) {
            const { user } = await UserProfile(token);
            await setUserData(user);
        };
     
        if (!suppliersList) {
            const { serverResponse } = await SuppliersList(token);
            await setSuppliersList(serverResponse);
        };
       
        if (userData.energia_mensal) {
            setModalDemandUp(false);
        };
    };

    useEffect(() => {
        ServidorRequest();
    }, [modalDemandUp]);


    return (
        <div className="home-container">
            <HomeHeader />
            <HomeBody/>
            <ModalMDemand/>
        </div>
    );
}