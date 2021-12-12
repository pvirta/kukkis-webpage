import {useEffect} from "react";
import kukkis from './videot/kukkis.mp4';
import korona from './kuvat/korona.jpg';
import hissiliput from './kuvat/hissiliput.jpg';
import vuokraamo from './kuvat/vuokraamo.jpg'
import hiihtokoulu from './kuvat/hiihtokoulu.jpg'
import './App.css';
import {Row, Col} from 'antd';
import {Typography, notification} from 'antd';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const {Title} = Typography;


export default function App() {

    /*
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

    useEffect(() => {
        window.addEventListener('scroll', openNotification)
    }, [])


     */

    return (
        <div>

            <section id={"stack-top"}>
                <div className="video-container">
                    <video autoPlay loop muted playsInline width="1280" height="720">
                        <source src={kukkis} type="video/mp4"/>
                    </video>
                </div>
            </section>
            <section className={"mid"}></section>
            <section className={"stack"}>
                <Row>
                    <Col xs={{span: 24, order: 2}} sm={{span: 24, order: 2}} md={{span: 24, order: 2}}
                         lg={{span: 24, order: 2}} xl={{span: 8, order: 1}}>
                        <div className={"pad"} style={{textAlign: 'center'}}>
                            <h1 style={{fontSize: 40}}>Joulunajan aukiolot</h1>
                            <p className={"basic-text"}>23.-25.12 suljettuna</p>
                            <p className={"basic-text"}>26.12 klo 10-18</p>
                            <p className={"basic-text"}>27.-30.12 klo 12-20</p>
                            <p className={"basic-text"}>31.12-2.1 klo 10-18</p>
                            <p className={"basic-text"}>3.1-5.1 klo 12-20</p>
                            <p className={"basic-text"}>6.1 klo 10-18</p>
                            <p className={"basic-text"}>7.1 klo 12-20</p>
                            <p className={"basic-text"}>8.-9.1 klo 10-18</p>
                        </div>

                    </Col>
                    <Col xs={{span: 24, order: 1}} sm={{span: 24, order: 1}} md={{span: 24, order: 1}}
                         lg={{span: 24, order: 1}} xl={{span: 8, order: 2}}>
                        <div className={"pad"} style={{textAlign: 'center'}}>
                            <h2 style={{color: 'red'}}>AVATAAN LA 18.12. klo 10.</h2>
                            <h1 className={"title-text"}>Aukiolot</h1>
                            <p className={"basic-text"}>Maanantaisin suljettu</p>
                            <p className={"basic-text"}>ti-pe 17-21</p>
                            <p className={"basic-text"}>la-su 10-18</p>
                            <h2>lipunmyynti: <a href={'tel: 0413138836'}> 041-3138836</a></h2>
                            <h2>välinevuokraamo: <a href={'tel: 0413138956'}> 041-3138956</a></h2>
                        </div>

                    </Col>
                    <Col xs={{span: 24, order: 3}} sm={{span: 24, order: 3}} md={{span: 24, order: 23}}
                         lg={{span: 24, order: 3}} xl={{span: 8, order: 3}}>
                        <Link to={"/vuokraamo"}>
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
                                <div className={"overlay"}><Link to="/vuokraamo" className={"button"}>VUOKRAAMO</Link>
                                </div>
                            </div>
                        </Link>
                    </Col>

                </Row>
            </section>
            <section className={"mid"}></section>
            <section className={"stack"}>
                <Row>
                    <Col xs={{span: 24, order: 2}} sm={{span: 24, order: 2}} md={{span: 24, order: 2}}
                         lg={{span: 12, order: 2}} xl={{span: 8, order: 1}}>

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
                    <Col xs={{span: 24, order: 1}} sm={{span: 24, order: 1}} md={{span: 24, order: 1}}
                         lg={{span: 24, order: 1}} xl={{span: 8, order: 2}}>
                        <div className={'img'} style={{
                            flexShrink: 0,
                            backgroundImage: `url(${hiihtokoulu})`,
                            width: '100%',
                            height: '500px',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '10px'
                        }}>
                            <div className={"overlay"}><Link to={"/hiihtokoulu"} className={"button"}>HIIHTOKOULU</Link>
                            </div>
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
                                allowFullScreen="true"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </div>
                    </Col>
                </Row>
            </section>
            <section id="stack-bottom">
                <h1>RUOSNIEMEN HIIHTOKESKUS</h1>

            </section>

        </div>
    );
}