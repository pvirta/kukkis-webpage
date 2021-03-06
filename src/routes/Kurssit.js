import {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row, Input, Checkbox, Modal} from 'antd';
import moment from 'moment';
import axios from "axios";
import {Link} from "react-router-dom";
import alkeiskurssi from '../kuvat/alkeiskurssi.pdf'
import taituri from '../kuvat/taituri.pdf'
import visa from "../kuvat/pankkipainikkeet/visa.png";
import mastercard from "../kuvat/pankkipainikkeet/mastercard.png";
import op from "../kuvat/pankkipainikkeet/osuuspankki.png";
import nordea from "../kuvat/pankkipainikkeet/nordea.png";
import handelsbanken from "../kuvat/pankkipainikkeet/handelsbanken.png";
import danskebank from "../kuvat/pankkipainikkeet/danskebank.png";
import aktia from "../kuvat/pankkipainikkeet/aktia.png";
import omasaastopankki from "../kuvat/pankkipainikkeet/omasaastopankki.png";
import paikallisosuuspankki from "../kuvat/pankkipainikkeet/paikallisosuuspankki.png";
import saastopankki from "../kuvat/pankkipainikkeet/saastopankki.png";
import alandsbanken from "../kuvat/pankkipainikkeet/alandsbanken.png";
import spankki from "../kuvat/pankkipainikkeet/spankki.png";
import {url} from "./constants";


const Kurssit = () => {
    const [kurssit, setKurssit] = useState([])
    const [showForm, setShowForm] = useState(-1);
    const [current, setCurrent] = useState()
    const [pdf] = useState([alkeiskurssi, taituri])
    const [maksutapa, setMaksutapa] = useState();
    const [error, setError] = useState(false);
    const [hyvaksytty, setHyvaksytty] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    useEffect(async () => {
        const res = await axios(url + '/naytakurssitkaikille')
        console.log(res.data)
        setKurssit(res.data)
    }, [])

    useEffect(() => {
        console.log('current: ', current)
    })

    const osta = (id) => {
        setShowForm(id)
        setCurrent(kurssit.filter(kurssi => kurssi.id === id)[0])
    }

    const onFinish = async (values) => {
        console.log(values);
        if (maksutapa) {
            setError(false)
            const token = await axios.post(url + '/ostakurssi/' + current.id, {...values, pankki: maksutapa})
            console.log('token: ', token.data)
            window.location.href = "https://www.vismapay.com/pbwapi/token/" + token.data
        } else {
            setError(true)
        }
    };

    const onChange = (e) => {
        setHyvaksytty(e.target.checked);
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setHyvaksytty(true)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const validateMessages = {
        required: '${label} on pakollinen tieto!',
        types: {
            email: '${label} muoto ei ole oikea',

        },
    };

    return (
        <div style={{ padding: "1rem 1rem" }}>
            <Modal title="Toimitusehdot" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <h1>Toimitusehdot</h1>

                <div><p>Porin Slalomseura ry 0984219-1 (j??ljemp??n?? verkkokauppa) myy paveluita yksityishenkil??ille Suomeen. Pid??t??mme oikeuden
                    toimitusehtojen ja hintojen muutoksiin. Tuotteiden hinnat sis??lt??v??t arvonlis??veron.</p></div>

                {/*Verkkokaupan yhteystiedot

                S??hk??posti: info@esimerkki.fi
                Puhelin: 029 123 4567
                Postiosoite: Esimerkkikatu 1, 12345 Kaupunki*/}

                <h2>Tilaaminen</h2>

                <div><p>Tilattavat tuotteet valitaan verkkosivuilla lis????m??ll?? ne ostoskoriin. Tilaus l??hetet????n maksamalla
                    ostoskorin sis??lt?? verkkokaupan kassatoiminnossa. Tehdess??si tilauksen hyv??ksyt n??m?? toimitusehdot,
                    tuotteiden hinnat sek?? toimituskulut. Mik??li tilaushetkell?? annetaan s??hk??postiosoite, tilauksesta
                    l??hetet????n tilausvahvistus s??hk??postitse. Tilausvahvistuksesta ilmenev??t tilatut tuotteet sek?? hinta.</p></div>

                <h2>Maksaminen</h2>

                <div><p>Verkkokaupan maksuv??litt??j??n?? toimii Visma Pay (Visma Payments Oy, y-tunnus 2486559-4), joka on
                    rekister??ity Finanssivalvonnan yll??pit??m????n maksulaitosrekisteriin. Maksamiseen siirryt????n Visma Payn
                    verkkopalvelun kautta ja tiliotteella ja laskulla maksun saajana n??kyy Visma Pay tai Visma Payments Oy.
                    Visma Pay v??litt???? maksut verkkokauppiaalle. Maksaminen on turvallista, sill?? kaikki maksutapahtumaa
                    koskevat tiedot v??litet????n salattua yhteytt?? k??ytt??en niin ettei kukaan ulkopuolinen taho n??e
                    maksutapahtuman tietoja.</p></div>

                <div><p>Kauppa syntyy verkkokaupan asiakkaan ja verkkokaupan v??lille. Verkkokaupan vastuulla ovat kaikki
                    kauppaan liittyv??t velvoitteet.</p></div>

                <p>Lue lis???? Visma Paysta: https://www.visma.fi/vismapay/</p>

                <h2>Maksutavat</h2>

                <div><p>Visma Pay -palvelun kautta voit maksaa verkkopankkitunnuksilla tai maksukorteilla
                    (credit/debit). K??ytett??viss?? ovat seuraavat maksutavat: Osuuspankki, Nordea,
                    Danske Bank, Oma S????st??pankki, S????st??pankki, Aktia, Paikallisosuuspankit, S-Pankki, Handelsbanken,
                    ??landsbanken, MobilePay, Masterpass, Visa-, Visa Debit-, Visa Electron-, MasterCard- ja Debit
                    MasterCard -kortit.</p></div>

                {/*MobilePay: Voit maksaa MobilePay-lompakollasi mik??li olet sallinut verkkokaupoissa maksamisen
                sovelluksen asetuksista. MobilePay-lompakolla suoritetut maksut veloitetaan lompakkoon liitetylt??
                maksukortilta. Mik??li maksun veloittaminen maksukortilta ep??onnistuu, MobilePay-lompakolla maksaminen ei
                ole mahdollista verkkokaupassa.

                Pivo: K??ytt??ehdot ovat tarjolla Pivon sivuilla: https://pivo.fi/kayttoehdot/pivon-kayttoehdot/

                Jousto lasku ja osamaksu on kotimainen palvelu, jolla teet ostoksesi nopeasti ja turvallisesti. Jousto
                on tarkoitettu yksityishenkil??ille, jotka ovat hoitaneet raha-asiansa moitteettomasti. Joustolla saat 30
                vuorokautta korotonta ja kulutonta maksuaikaa. Laskun saatuasi voit p????tt???? maksatko sen kokonaan vai
                osissa. Osamaksulla voit maksaa ostoksesi jopa 36:ssa er??ss??, alkaen 9,90 eur/kk. Jousto osamaksun
                kustannukset ovat 3,90 eur/kk ja 19,90%:n luottokorko. Voit maksaa Joustolla 30???3000 euron ostoksia.
                Luotonmy??nt??j??n?? toimii Aurajoki Nordic Oy. Lue lis???? Joustosta osoitteessa www.jousto.com.*/}



                <h2>Visma Pay -maksupalvelun yhteystiedot</h2>

                <div><p>Visma Payments Oy (Y-tunnus 2486559-4)
                    S??hk??posti: helpdesk@vismapay.com
                    Puhelin: 09 315 42 037 (arkisin klo 8-16)
                    Postiosoite: Brahenkatu 4, 53100 Lappeenranta</p></div>

                {/*Toimitus

                Tilauksia postitetaan arkip??ivisin. Varastosta toimitettavien tuotteiden toimitusaika on yleens?? 3-5
                arkip??iv????. Mik??li toimitettavat tuotteet ovat tilaustuotteita, toimitusaika on yleens?? 1-3 viikkoa.
                Toimituskulut m????r??ytyv??t valitun toimitustavan, mahdollisten lis??palvelujen, tilauksen painon ja koon
                mukaan. N??et toimituskulut verkkokaupan kassatoiminnossa ennen tilauksen lopullista hyv??ksymist??.

                Mik??li tuote on kadonnut tai vioittunut toimituksen aikana, tulee t??st?? ilmoittaa viipym??tt??, mutta
                kuitenkin 14 vuorokauden kuluessa verkkokaupalle. Toimituksessa vioittuneista paketeista tulee
                viipym??tt?? ilmoittaa toimituksesta vastanneelle yhti??lle.

                Palautukset

                Verkkokaupan asiakkaalla on kuluttajansuojalain mukainen 14 vuorokauden vaihto- ja palautusoikeus.
                Asiakkaalla on oikeus vaihtaa tai palauttaa osa tai kaikki tilauksen tuotteet. Palautettavat tai
                vaihdettavat tuotteet tulee olla alkuper??ispakkauksessa ja myyntikuntoisia. Halutessasi palauttaa tai
                vaihtaa tuotteita, ota ensin yhteytt?? verkkokauppaan ja kysy palautusohjeita. Liit??th??n palautukseen
                mukaan nimesi, yhteystietosi sek?? tilinumerosi mahdollista maksunpalautusta varten.

                Tilauksen peruuttaminen, virhevastuu ja reklamaatiot

                Ennen tilauksen toimitusta tilauksen voi peruuttaa kirjallisella ilmoituksella s??hk??postitse.

                Verkkokaupalla on lakis????teinen virhevastuu myydyist?? tuotteista. Reklamaatiotapauksissa pyyd??mme
                olemaan yhteydess?? asiakaspalveluumme. Kuluttajalla on oikeus vied?? mahdolliset riitatilanteet
                kuluttajariitalautakunnan ratkaistavaksi.*/}
            </Modal>
            {kurssit && kurssit.length === 0 && <h2>Kursseja ei t??ll?? hetkell?? saatavilla.</h2>}
            {showForm === -1 &&
            <Row gutter={[20, 20]}>
                {kurssit && kurssit.map(kurssi => <Col xs={24} sm={24} md={12} lg={8} xl={8}> <Card title={kurssi.nimi} actions={[
                    <a href={pdf[kurssi.id-1]}>Katso lis????</a>,
                    <Button onClick={() => osta(kurssi.id)} type={'primary'}>Osta</Button>,
                ]}><p>{moment(kurssi.alkaa).format("DoMo") + "-" + moment(kurssi.paattyy).format("DoMo") + " " + kurssi.vkpaiva +" klo: " + kurssi.kello}</p> <p>Hinta: {kurssi.hinta}???</p> <p>{kurssi.kuvaus}</p></Card></Col>)}
            </Row>
            }

            {showForm !== -1 &&
            <div>
                <Row>
                    <Col offset={8}>
                        <h2>{current && current.nimi}  {current && current.alkaa && moment(current.alkaa).format("DoMo")}-{current && current.paattyy && moment('2022-01-01').format("DoMo")} {current && current.vkpaiva} klo {current && current.kello}</h2>
                    </Col>
                </Row>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

                    <Form.Item
                        name="nimi"
                        label="Oppilaan nimi"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="maksajanNimi"
                        label="Maksajan nimi"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label="Maksajan s-posti"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='puhelin'
                        label="Maksajan puhelinnumero"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>


                    <Row gutter={[10, 10]} style={{marginBottom: 15}}>
                        <Col offset={8}>
                            <p style={{marginBottom: -1}}>Korttimaksu</p>
                        <img src={visa} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'visa' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('visa')}/>
                        <img src={mastercard} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'mastercard' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('mastercard')}/>


                    {/* <p style={{ marginBottom: -1 }}>Lompakkopalvelut</p>
                                <Row gutter={[10, 10]} style={{ marginBottom: 15 }}>
                                    <img src={mobilepay} style={{ marginRight: 4, maxWidth: 100, border: maksutapa === 'mobilepay' ? '3px solid gray' : '1px solid black' }} onClick={() => setMaksutapa('mobilepay')} />
                                    <img src={pivo} style={{ marginRight: 4, maxWidth: 100, border: maksutapa === 'pivo' ? '3px solid gray' : '1px solid black' }} onClick={() => setMaksutapa('pivo')} />
                                    <img src={siirto} style={{ marginRight: 4, maxWidth: 100, border: maksutapa === 'siirto' ? '3px solid gray' : '1px solid black' }} onClick={() => setMaksutapa('siirto')} />
                                    <img src={masterpass} style={{ marginRight: 4, maxWidth: 100, border: maksutapa === 'masterpass' ? '3px solid gray' : '1px solid black' }} onClick={() => setMaksutapa('masterpass')} />
                                </Row>*/}

                    <p style={{marginBottom: -1}}>Verkkopankkimaksu</p>
                        <img src={op} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'osuuspankki' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('osuuspankki')}/>
                        <img src={nordea} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'nordea' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('nordea')}/>
                        <img src={handelsbanken} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'handelsbanken' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('handelsbanken')}/>
                        <img src={danskebank} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'danskebank' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('danskebank')}/>
                        <img src={aktia} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'aktia' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('aktia')}/>
                        <img src={omasaastopankki} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'omasaastopankki' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('omasaastopankki')}/>
                        <img src={paikallisosuuspankki} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'paikallisosuuspankki' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('paikallisosuuspankki')}/>
                        <img src={saastopankki} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'saastopankki' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('saastopankki')}/>
                        <img src={alandsbanken} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'alandsbanken' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('alandsbanken')}/>
                        <img src={spankki} style={{
                            marginRight: 4,
                            maxWidth: 100,
                            border: maksutapa === 'spankki' ? '3px solid gray' : '1px solid black'
                        }} onClick={() => setMaksutapa('spankki')}/>

                        </Col>
                    </Row>
                    <Row>
                        <Col offset={8}>
                            {error && <p style={{color: 'red'}}>Valitse maksutapa</p>}
                            <Checkbox onChange={onChange} checked={hyvaksytty}>Olen lukenut ja hyv??ksyn</Checkbox><a
                            onClick={showModal}>kaupan ehdot</a>
                        </Col>
                    </Row>
                            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                                <Button type="primary" htmlType="submit" disabled={!hyvaksytty}>
                                    Maksa
                                </Button>
                                <Button onClick={() => setShowForm(-1)} style={{marginLeft: 10}} type="primary">
                                    Peruuta
                                </Button>
                            </Form.Item>


                </Form>

            </div>
            }
        </div>
    )
}
export default Kurssit