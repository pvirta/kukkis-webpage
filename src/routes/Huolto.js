import {Button} from "antd";
import {Link} from "react-router-dom";

const Huolto = () => {
    return (
        <div style={{textAlign: 'center', padding: '50px 20px'}}>
            <h2>Järjestelmää päivitetään</h2>
            <p>Ole hyvä ja yritä hetken päästä uudestaan!</p>
            <Button><Link to={'/'}>Palaa etusivulle</Link></Button>
        </div>
    )
}
export default Huolto
