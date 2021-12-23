import {
    Link
} from "react-router-dom";
import {useEffect} from "react";
import {Button} from "antd";

const Tilausvahvistus = () => {

    useEffect(() => {
        setTimeout(() => {window.location.href = '/'}, 20000)
    }, [])

    return (
        <div style={{textAlign: 'center', padding: '50px 20px'}}>
            <h2>Tiedot hiihtotunnista lähetetään antamaasi sähköpostiin</h2>
            <h2>Ole paikalla vähintään 10 minuuttia ennen tuntia. Jos vuokraat myös välineet, ole paikalla vähintään 30 minuuttia ennen.</h2>
            <p>Palataan automaatisesti etusivulle 20 sekunnin kuluttua tai </p>
            <Button><Link to={'/'}>Palaa etusivulle</Link></Button>
        </div>
    )
}

export default Tilausvahvistus