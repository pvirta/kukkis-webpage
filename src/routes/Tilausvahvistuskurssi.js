import {Button} from "antd";
import {Link} from "react-router-dom";
import {useEffect} from "react";

const Tilausvahvistuskurssi = () => {

    useEffect(() => {
        setTimeout(() => {window.location.href = '/'}, 20000)
    }, [])

    return (
        <div style={{textAlign: 'center', padding: '50px 20px'}}>
            <h2>Tiedot hiihtokurssista lähetetään antamaasi sähköpostiin</h2>
            <p>Palataan automaatisesti etusivulle 20 sekunnin kuluttua tai </p>
            <Button><Link to={'/'}>Palaa etusivulle</Link></Button>
        </div>
    )
}
export default Tilausvahvistuskurssi