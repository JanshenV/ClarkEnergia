import useGlobal from '../../hooks/useGlobal';
import HomeHeader from '../../components/homeHeader';
import './styles.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const {
         useEffect, token
    } = useGlobal();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return navigate('/');
    }, []);





    return (
        <div className="home-container">
            <HomeHeader/>
        </div>
    )
}