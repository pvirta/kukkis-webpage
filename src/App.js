import {useEffect, useState} from "react";
import kukkis from './videot/kukkis.mp4';
import korona from './kuvat/korona.jpg';
import hissiliput from './kuvat/hissiliput.jpg';
import vuokraamo from './kuvat/vuokraamo.jpg'
import hiihtokoulu from './kuvat/hiihtokoulu.jpg'
import OstaTunti from "./routes/OstaTunti";
import './App.css';
import {Row, Col, Button} from 'antd';
import {Typography, notification} from 'antd';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useSearchParams
} from "react-router-dom";
import { ArrowRightOutlined } from '@ant-design/icons';

const {Title} = Typography;


export default function App() {

    const [searchParams, setSearchParams] =useSearchParams()
    const [loaded, setLoaded] = useState(false)

    const q = searchParams.get('tunti')


    const openNotificationTunti = () => {
        const args = {
            message: 'Tunti ostettu',
            description:
                'Antamaasi sähköpostiin on lähetty tietot ostetusta hiihtotunnista',
            duration: 0,
        };
        notification.open(args);
    }

    let done = false
    const openNotification = () => {
        const args = {
            message: 'Notification Title',
            description:
                'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
            duration: 0,
        };
        if (!done) {
            notification.open(args);
        }
        done = true
    };


    /*
    useEffect(() => {
        window.addEventListener('scroll', openNotification)
    }, [])
    */


    return (
        <div>
            <section id={"stack-top"}>
                <div className="video-container">
                    <video autoPlay loop muted playsInline width="1280" height="720" onCanPlayThrough={() => setLoaded(true)}>>
                        <source src={kukkis} type="video/mp4"/>
                    </video>
                    {loaded &&
                    <div className="overlayvideo">
                        <a className={'buttonvideo buttonvideofontsize'} href='https://snowcard.fi/v/#/ruosniemi/350'>Lippukauppaan <ArrowRightOutlined /></a>
                    </div>
                    }
                </div>
            </section>
            <section className={"mid"}></section>

            <section className={"stack"}>
                <Row gutter={[10, 10]}>
                    <Col xs={{span: 24, order: 1}} sm={{span: 24, order: 1}} md={{span: 24, order: 1}}
                         lg={{span: 12, order: 1}} xl={{span: 8, order: 1}}>
                        <div className={"pad"} style={{textAlign: 'center'}}>
                            <h1 style={{fontSize: 40}}>Joulun ja uudenvuoden aukiolot</h1>
                            <p className={"basic-text"}>27.-30.12. klo 12-20</p>
                            <p className={"basic-text"}>31.12-2.1. klo 10-18</p>
                            <p className={"basic-text"}>3.1.-5.1. klo 12-20</p>
                            <p className={"basic-text"}>6.1. klo 10-18</p>
                            <p className={"basic-text"}>7.1. klo 12-20</p>
                            <p className={"basic-text"}>8.-9.1. klo 10-18</p>
                        </div>

                    </Col>
                    <Col xs={{span: 24, order: 2}} sm={{span: 24, order: 2}} md={{span: 24, order: 2}}
                         lg={{span: 12, order: 2}} xl={{span: 8, order: 2}}>
                        <div className={"pad"} style={{textAlign: 'center'}}>
                            <br />
                            <p>Hiihtokeskuksen välinevuokraamossa on saattanut altistua koronavirukselle tiistaina 28.12. klo 12.30-13.00 sekä 18.00-19.00 välisinä aikoina. Näinä aikoina vuokraamossa on työskennellyt henkilö, jolla on myöhemmin todettu koronaviruksen aiheuttama tartunta. Henkilö on ollut työskennellessään täysin oireeton ja hän on käyttänyt maskia. Kehoitamme kyseisinä aikoina vuokraamossa asioineita henkilöitä tarkkailemaan tehostetusti omaa oloaan ja hakeutumaan testiin vähäistenkin oireiden ilmetessä.</p>
                            <h2>Aukiolot</h2>
                            {/*<h1 className={"title-text"}>Aukiolot</h1>
                            <p className={"basic-text"}>Maanantaisin suljettu</p>*/}
                            <p className={"basic-text"}>ti-pe 17-21</p>
                            <p className={"basic-text"}>la-su 10-18</p>
                            <h2>lipunmyynti: <a href={'tel: 0413138836'}> 041-3138836</a></h2>
                            <h2>välinevuokraamo: <a href={'tel: 0413138956'}> 041-3138956</a></h2>
                            <p>Viimeinen hissinousu 10 min ennen sulkemista</p>
                        </div>

                    </Col>
                    <Col xs={{span: 24, order: 3}} sm={{span: 24, order: 3}} md={{span: 24, order: 23}}
                         lg={{span: 12, order: 3}} xl={{span: 8, order: 3}}>
                        <div style={{display: 'block', margin: '0 auto', border: 'none', overflow: 'hidden'}}>
                            <iframe
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FRuosniemen-Hiihtokeskus-138335259651428%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=303465581578087"
                                width="340" height="500"
                                style={{display: 'block', margin: '0 auto', border: 'none', overflow: 'hidden'}}
                                scrolling="no" frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </div>
                    </Col>

                    <Col xs={{span: 24, order: 4}} sm={{span: 24, order: 4}} md={{span: 24, order: 4}}
                         lg={{span: 12, order: 4}} xl={{span: 8, order: 4}}>

                        <div className={'img'} style={{
                            flexShrink: 0,
                            backgroundImage: `url(${hissiliput})`,
                            width: '100%',
                            height: '500px',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '10px'
                        }}>
                            <div className={"overlay"}><Link to={"hissiliput"} className={"button"}>HISSILIPUT</Link>
                            </div>
                        </div>
                       {/* <div style={{textAlign: 'center'}}>
                            <img height={'500px'} src={korona} className={"korona"}/>
                        </div>*/}
                    </Col>
                    <Col xs={{span: 24, order: 5}} sm={{span: 24, order: 5}} md={{span: 24, order: 5}}
                         lg={{span: 12, order: 5}} xl={{span: 8, order: 5}}>
                        <div className={'img'} style={{
                            flexShrink: 0,
                            backgroundImage: `url(${hiihtokoulu})`,
                            height: '500px',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '10px',

                        }}>
                            <div className={"overlay"}><Link to={"/hiihtokoulu"} className={"button"}>HIIHTOKOULU</Link>
                            </div>
                        </div>
                    </Col>
                    <Col xs={{span: 24, order: 6}} sm={{span: 24, order: 6}} md={{span: 24, order: 6}}
                         lg={{span: 12, order: 6}} xl={{span: 8, order: 6}}>

                        <div className={'img'} style={{
                            flexShrink: 0,
                            backgroundImage: `url(${vuokraamo})`,
                            width: '100%',
                            height: '500px',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '10px'
                        }}>
                            <div className={"overlay"}><Link to={"vuokraamo"} className={"button"}>VUOKRAAMO</Link>
                            </div>
                        </div>

                    </Col>
                </Row>
            </section>

            <section id="stack-bottom">
                <span className={'footertext'} style={{lineHeight: '0.9'}}>RUOSNIEMEN HIIHTOKESKUS</span>
                <p id={'address'} style={{ position: 'relative', top: '-8%'}}>MYYRYNKUJA, PORI</p>
            </section>

        </div>
    );
}