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

                <div><p>Porin Slalomseura ry 0984219-1 (jäljempänä verkkokauppa) myy paveluita yksityishenkilöille Suomeen. Pidätämme oikeuden
                    toimitusehtojen ja hintojen muutoksiin. Tuotteiden hinnat sisältävät arvonlisäveron.</p></div>

                {/*Verkkokaupan yhteystiedot

                Sähköposti: info@esimerkki.fi
                Puhelin: 029 123 4567
                Postiosoite: Esimerkkikatu 1, 12345 Kaupunki*/}

                <h2>Tilaaminen</h2>

                <div><p>Tilattavat tuotteet valitaan verkkosivuilla lisäämällä ne ostoskoriin. Tilaus lähetetään maksamalla
                    ostoskorin sisältö verkkokaupan kassatoiminnossa. Tehdessäsi tilauksen hyväksyt nämä toimitusehdot,
                    tuotteiden hinnat sekä toimituskulut. Mikäli tilaushetkellä annetaan sähköpostiosoite, tilauksesta
                    lähetetään tilausvahvistus sähköpostitse. Tilausvahvistuksesta ilmenevät tilatut tuotteet sekä hinta.</p></div>

                <h2>Maksaminen</h2>

                <div><p>Verkkokaupan maksuvälittäjänä toimii Visma Pay (Visma Payments Oy, y-tunnus 2486559-4), joka on
                    rekisteröity Finanssivalvonnan ylläpitämään maksulaitosrekisteriin. Maksamiseen siirrytään Visma Payn
                    verkkopalvelun kautta ja tiliotteella ja laskulla maksun saajana näkyy Visma Pay tai Visma Payments Oy.
                    Visma Pay välittää maksut verkkokauppiaalle. Maksaminen on turvallista, sillä kaikki maksutapahtumaa
                    koskevat tiedot välitetään salattua yhteyttä käyttäen niin ettei kukaan ulkopuolinen taho näe
                    maksutapahtuman tietoja.</p></div>

                <div><p>Kauppa syntyy verkkokaupan asiakkaan ja verkkokaupan välille. Verkkokaupan vastuulla ovat kaikki
                    kauppaan liittyvät velvoitteet.</p></div>

                <p>Lue lisää Visma Paysta: https://www.visma.fi/vismapay/</p>

                <h2>Maksutavat</h2>

                <div><p>Visma Pay -palvelun kautta voit maksaa verkkopankkitunnuksilla tai maksukorteilla
                    (credit/debit). Käytettävissä ovat seuraavat maksutavat: Osuuspankki, Nordea,
                    Danske Bank, Oma Säästöpankki, Säästöpankki, Aktia, Paikallisosuuspankit, S-Pankki, Handelsbanken,
                    Ålandsbanken, MobilePay, Masterpass, Visa-, Visa Debit-, Visa Electron-, MasterCard- ja Debit
                    MasterCard -kortit.</p></div>

                {/*MobilePay: Voit maksaa MobilePay-lompakollasi mikäli olet sallinut verkkokaupoissa maksamisen
                sovelluksen asetuksista. MobilePay-lompakolla suoritetut maksut veloitetaan lompakkoon liitetyltä
                maksukortilta. Mikäli maksun veloittaminen maksukortilta epäonnistuu, MobilePay-lompakolla maksaminen ei
                ole mahdollista verkkokaupassa.

                Pivo: Käyttöehdot ovat tarjolla Pivon sivuilla: https://pivo.fi/kayttoehdot/pivon-kayttoehdot/

                Jousto lasku ja osamaksu on kotimainen palvelu, jolla teet ostoksesi nopeasti ja turvallisesti. Jousto
                on tarkoitettu yksityishenkilöille, jotka ovat hoitaneet raha-asiansa moitteettomasti. Joustolla saat 30
                vuorokautta korotonta ja kulutonta maksuaikaa. Laskun saatuasi voit päättää maksatko sen kokonaan vai
                osissa. Osamaksulla voit maksaa ostoksesi jopa 36:ssa erässä, alkaen 9,90 eur/kk. Jousto osamaksun
                kustannukset ovat 3,90 eur/kk ja 19,90%:n luottokorko. Voit maksaa Joustolla 30–3000 euron ostoksia.
                Luotonmyöntäjänä toimii Aurajoki Nordic Oy. Lue lisää Joustosta osoitteessa www.jousto.com.*/}



                <h2>Visma Pay -maksupalvelun yhteystiedot</h2>

                <div><p>Visma Payments Oy (Y-tunnus 2486559-4)
                    Sähköposti: helpdesk@vismapay.com
                    Puhelin: 09 315 42 037 (arkisin klo 8-16)
                    Postiosoite: Brahenkatu 4, 53100 Lappeenranta</p></div>

                {/*Toimitus

                Tilauksia postitetaan arkipäivisin. Varastosta toimitettavien tuotteiden toimitusaika on yleensä 3-5
                arkipäivää. Mikäli toimitettavat tuotteet ovat tilaustuotteita, toimitusaika on yleensä 1-3 viikkoa.
                Toimituskulut määräytyvät valitun toimitustavan, mahdollisten lisäpalvelujen, tilauksen painon ja koon
                mukaan. Näet toimituskulut verkkokaupan kassatoiminnossa ennen tilauksen lopullista hyväksymistä.

                Mikäli tuote on kadonnut tai vioittunut toimituksen aikana, tulee tästä ilmoittaa viipymättä, mutta
                kuitenkin 14 vuorokauden kuluessa verkkokaupalle. Toimituksessa vioittuneista paketeista tulee
                viipymättä ilmoittaa toimituksesta vastanneelle yhtiölle.

                Palautukset

                Verkkokaupan asiakkaalla on kuluttajansuojalain mukainen 14 vuorokauden vaihto- ja palautusoikeus.
                Asiakkaalla on oikeus vaihtaa tai palauttaa osa tai kaikki tilauksen tuotteet. Palautettavat tai
                vaihdettavat tuotteet tulee olla alkuperäispakkauksessa ja myyntikuntoisia. Halutessasi palauttaa tai
                vaihtaa tuotteita, ota ensin yhteyttä verkkokauppaan ja kysy palautusohjeita. Liitäthän palautukseen
                mukaan nimesi, yhteystietosi sekä tilinumerosi mahdollista maksunpalautusta varten.

                Tilauksen peruuttaminen, virhevastuu ja reklamaatiot

                Ennen tilauksen toimitusta tilauksen voi peruuttaa kirjallisella ilmoituksella sähköpostitse.

                Verkkokaupalla on lakisääteinen virhevastuu myydyistä tuotteista. Reklamaatiotapauksissa pyydämme
                olemaan yhteydessä asiakaspalveluumme. Kuluttajalla on oikeus viedä mahdolliset riitatilanteet
                kuluttajariitalautakunnan ratkaistavaksi.*/}
            </Modal>
            {kurssit && kurssit.length === 0 && <h2>Kursseja ei tällä hetkellä saatavilla.</h2>}
            {showForm === -1 &&
            <Row gutter={[20, 20]}>
                {kurssit && kurssit.map(kurssi => <Col xs={24} sm={24} md={12} lg={8} xl={8}> <Card title={kurssi.nimi} actions={[
                    <a href={pdf[kurssi.id-1]}>Katso lisää</a>,
                    <Button onClick={() => osta(kurssi.id)} type={'primary'}>Osta</Button>,
                ]}><p>{moment(kurssi.alkaa).format("DoMo") + "-" + moment(kurssi.paattyy).format("DoMo") + " " + kurssi.vkpaiva +" klo: " + kurssi.kello}</p> <p>Hinta: {kurssi.hinta}€</p> <p>{kurssi.kuvaus}</p></Card></Col>)}
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
                            <Checkbox onChange={onChange} checked={hyvaksytty}>Olen lukenut ja hyväksyn</Checkbox><a
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