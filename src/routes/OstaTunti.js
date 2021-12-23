import {useEffect, useState} from 'react'
import axios from 'axios'
import {
    Calendar,
    Card,
    ConfigProvider,
    Select,
    Typography,
    Row,
    Col,
    Button,
    Form,
    Input,
    Breadcrumb,
    Checkbox,
    Divider,
    notification,
    Modal
} from 'antd';
import {MinusCircleOutlined, PlusOutlined, HomeOutlined} from "@ant-design/icons";
import fi_FI from 'antd/lib/locale/fi_FI'
import {url} from './constants'
import moment from 'moment'
import 'moment/locale/fi'  // without this line it didn't work
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

import op from '../kuvat/pankkipainikkeet/osuuspankki.png'
import nordea from '../kuvat/pankkipainikkeet/nordea.png'
import handelsbanken from '../kuvat/pankkipainikkeet/handelsbanken.png'
import danskebank from '../kuvat/pankkipainikkeet/danskebank.png'
import aktia from '../kuvat/pankkipainikkeet/aktia.png'
import omasaastopankki from '../kuvat/pankkipainikkeet/omasaastopankki.png'
import paikallisosuuspankki from '../kuvat/pankkipainikkeet/paikallisosuuspankki.png'
import saastopankki from '../kuvat/pankkipainikkeet/saastopankki.png'
import alandsbanken from '../kuvat/pankkipainikkeet/alandsbanken.png'
import spankki from '../kuvat/pankkipainikkeet/spankki.png'
import mastercard from '../kuvat/pankkipainikkeet/mastercard.png'
import visa from '../kuvat/pankkipainikkeet/visa.png'
import {Link, useNavigate} from "react-router-dom";


moment.locale('fi')
const {Option} = Select;
const {Title, Text} = Typography;

const OstaTunti = () => {
    const [tunnit, setTunnit] = useState([])
    const [tunti, setTunti] = useState()
    const [paivanSuksiTunnit, setPaivanSuksiTunnit] = useState([])
    const [paivanLautaTunnit, setPaivanLautaTunnit] = useState([])
    const [varausnumero, setVarausnnumero] = useState("")
    const [formValues, setFormValues] = useState({})
    const [maksutapa, setMaksutapa] = useState();
    const [valine, setValine] = useState()
    const [date, setDate] = useState(moment())
    const [hiihtokouluHinta, setHiihtokouluHinta] = useState()
    const [tanaan] = useState(moment())
    const [error, setError] = useState(false)
    const [hyvaksytty, setHyvaksytty] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [lisaoppilaita, setLisaoppilaita] = useState(0)


    const valineetLisaOppilaat = []

    const hiihtoituntiSolo = 45;
    const hiihtotuntiMoni = 35;
    const valinevuokra = 12;

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 14,
            },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 8,
                offset: 8,
            },
        },
    };

    const navigate = useNavigate();

    useEffect(async () => {
        await window.history.pushState(null, null, document.URL);
        await window.addEventListener('popstate', async function(event) {
            window.location.replace(`/ostatunti`);
        });
        vapauta()
    }, [])

    useEffect(() => {
        console.log('f: ', formValues)
    })

    useEffect(() => {
        console.log('lisaoppilaita: ', lisaoppilaita)
    })

    useEffect(async () => {
        const varno = await window.localStorage.getItem('user')
        console.log('localstorege: ', varno)
        const res = await axios(url + '/ostettavissa/' + varno)
        console.log(res.data)
        setTunnit(res.data)
    }, [])

    useEffect(() => {
        console.log('varasuno: ', varausnumero)
        console.log('localstorege: ', window.localStorage.getItem('user'))
    })

    useEffect(() => {
        window.onpopstate = (ev) => {
            ev.preventDefault()
            vapauta()
        }
    })

    const onChange = (e) => {
        setHyvaksytty(e.target.checked);
    }

    const onSelectTunti = (date) => {
        setPaivanSuksiTunnit(
            tunnit.filter(tunti => tunti.opettaja.suksi && (moment(date).format('YYYY-MM-DD') === moment(tunti.aika).format('YYYY-MM-DD')))
        )
        setPaivanLautaTunnit(
            tunnit.filter(tunti => tunti.opettaja.lauta && (moment(date).format('YYYY-MM-DD') === moment(tunti.aika).format('YYYY-MM-DD')))
        )
        setDate(date)
    }

    const onSelectLauta = (date) => {
        setPaivanLautaTunnit(
            tunnit.filter(tunti => tunti.opettaja.lauta && (moment(date).format('YYYY-MM-DD') === moment(tunti.aika).format('YYYY-MM-DD')))
        )
    }

    const paivita = async () => {
        const res2 = axios(url + '/ostettavissa/' + varausnumero)
        await setTunnit(res2.data)
    }

    const vapauta = () => {
        const varno = window.localStorage.getItem('user')
        axios(url + '/vapauta/' + varno)
    }

    const varaa = async (id, valine, tunti) => {
        setTunti(tunti)
        setValine(valine)
        console.log('params: ', id, valine)
        var optionAxios = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
            }
        }
        const varno = await window.localStorage.getItem('user')
        const res = await axios.post(url + '/varaatunti/' + varno, {id, valine}, {optionAxios})
        console.log(res.data)
        if (res.data === 'Tunti ehdittiin varaamaan') {
            openNotification()
            const res = await axios(url + '/ostettavissa')
            console.log(res.data)
            setTunnit(res.data)
            setPaivanSuksiTunnit(
                res.data.filter(tunti => tunti.opettaja.suksi && (moment(date).format('YYYY-MM-DD') === moment(tunti.aika).format('YYYY-MM-DD')))
            )
            setPaivanLautaTunnit(
                res.data.filter(tunti => tunti.opettaja.lauta && (moment(date).format('YYYY-MM-DD') === moment(tunti.aika).format('YYYY-MM-DD')))
            )
        } else {
            setVarausnnumero(res.data)
            window.localStorage.setItem('user', res.data)
        }
    }

    const openNotification = () => {
        notification.open({
            message: 'Tunti ehdittiin varaamaan',
            description:
                'Tunti ehdittiin varaamaan, ole hyvä ja valitse toinen tunti',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },

    };

    const onFinish = async (values) => {
        console.log({...values, pankki: maksutapa, varausno: varausnumero})
        console.log('maksutapa: ', maksutapa)
        if (maksutapa) {
            setError(false)
            const token = await axios.post(url + '/ostatunti', {...values, pankki: maksutapa, varausno: varausnumero})
            console.log('token: ', token.data)
            window.location.href = "https://www.vismapay.com/pbwapi/token/" + token.data
        } else {
            setError(true)
        }

    }

    const valuesChanged = (value, values) => {
        setFormValues({...values, varausno: varausnumero})
    }

    const dateFullCellRender = (date) => {
        const style =
            tunnit.filter(tunti =>
                (moment(tunti.aika).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))
            ).length > 0 ? {border: '1px solid green', padding: 8, borderRadius: '50%', textAlign: 'center'} : {}

        return <span style={style}>{date.date()}</span>
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

    return (
        <ConfigProvider locale={fi_FI}>
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
            {!varausnumero ?
                <>
                    <Breadcrumb style={{padding: "1rem 1rem"}}>
                        <Breadcrumb.Item href="/">
                            <HomeOutlined/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>hiihtotunnit</Breadcrumb.Item>
                    </Breadcrumb>
                    <Card>
                        <Calendar
                            fullscreen={false}
                            onSelect={onSelectTunti}
                            dateFullCellRender={dateFullCellRender}
                            headerRender={({value, onChange,}) => {
                                const start = 0;
                                const end = 12;
                                const monthOptions = [];

                                const current = value.clone();
                                const localeData = value.localeData();
                                const months = [];
                                for (let i = 0; i < 12; i++) {
                                    current.month(i);
                                    months.push(localeData.monthsShort(current));
                                }

                                for (let index = start; index < end; index++) {
                                    monthOptions.push(
                                        <Select.Option className="month-item" key={`${index}`}>
                                            {months[index]}
                                        </Select.Option>,
                                    );
                                }
                                const month = value.month();

                                const year = value.year();
                                const options = [];
                                for (let i = tanaan.year(); i < tanaan.year() + 2; i += 1) {
                                    options.push(
                                        <Select.Option key={i} value={i} className="year-item">
                                            {i}
                                        </Select.Option>,
                                    );
                                }
                                return (
                                    <div style={{padding: 8}}>
                                        <Typography.Title level={4}>Hiihtotunit</Typography.Title>
                                        <Row gutter={8}>
                                            <Col>
                                                <LeftOutlined
                                                    onClick={() => onChange(value.clone().subtract(1, 'months'))}/>
                                            </Col>
                                            <Col>
                                                <Select
                                                    size="small"
                                                    dropdownMatchSelectWidth={false}
                                                    className="my-year-select"
                                                    onChange={newYear => {
                                                        const now = value.clone().year(newYear);
                                                        onChange(now);
                                                    }}
                                                    value={String(year)}
                                                >
                                                    {options}
                                                </Select>
                                            </Col>
                                            <Col>
                                                <Select
                                                    size="small"
                                                    dropdownMatchSelectWidth={false}
                                                    value={String(month)}
                                                    onChange={selectedMonth => {
                                                        const newValue = value.clone();
                                                        newValue.month(parseInt(selectedMonth, 10));
                                                        onChange(newValue);
                                                    }}
                                                >
                                                    {monthOptions}
                                                </Select>
                                            </Col>
                                            <Col>
                                                <RightOutlined
                                                    onClick={() => onChange(value.clone().add(1, 'months'))}/>
                                            </Col>
                                            <Col>
                                                <span style={{marginLeft: 20}}>Tunteja saatavilla päivissä, joissa merkki: </span>
                                                <span style={{
                                                    border: '1px solid green',
                                                    padding: '2px 5px',
                                                    borderRadius: 10,
                                                }}>&nbsp;&nbsp;</span>
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            }}
                        />
                        {moment(date).format('dddd, D. MMMM')}
                        {(paivanSuksiTunnit.length > 0) && <p>Varaa suksitunti valitsemalla aika</p>}
                        {paivanSuksiTunnit.length === 0 ?
                            <p>Tällä hetkellä tunteja suksille ei saatavilla tälle päivälle, tarkasta saatavuus
                                myöhemmin</p> :
                            paivanSuksiTunnit.sort((a, b) => {
                                return moment(a.aika).isBefore(b.aika) ? -1 : 1
                            }).map(suksi => {
                                return <Button key={suksi.id} style={{margin: '5px', borderRadius: 5}}
                                               onClick={() => varaa(suksi.id, 0, suksi.aika)}>{moment(suksi.aika).format("HH:mm")} SUKSI</Button>
                            })}

                        {(paivanLautaTunnit.length > 0) && <p>Varaa lautatunti valitsemalla aika</p>}
                        {paivanLautaTunnit.length === 0 ?
                            <p>Tällä hetkellä tunteja laudalle ei saatavilla tälle päivälle, tarkasta saatavuus
                                myöhemmin</p> :
                            paivanLautaTunnit.sort((a, b) => {
                                return moment(a.aika).isBefore(b.aika) ? -1 : 1
                            }).map(suksi => {
                                return <Button key={suksi.id} style={{margin: '5px', borderRadius: 5}}
                                               onClick={() => varaa(suksi.id, 1, suksi.aika)}>{moment(suksi.aika).format("HH:mm")} LAUTA</Button>
                            })}

                    </Card>

                </>
                :
                <Form name="hiihtotunti" onFinish={onFinish} validateMessages={validateMessages} autoComplete="off"
                      requiredMark={false}
                      {...formItemLayout} style={{marginTop: 20}}
                      onValuesChange={(value, values) => valuesChanged(value, values)}
                      initialValues={{
                          valineet: false,
                          pituus: '',
                          paino: '',
                          kenka: ''

                      }}

                >
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>

                            <Col offset={8} style={{marginBottom: 30}}>
                                <Breadcrumb style={{padding: "1rem 1rem"}}>
                                    <Breadcrumb.Item onClick={() => {vapauta()}}>
                                        <Link to="/"><HomeOutlined/></Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item style={{cursor: 'pointer'}} onClick={() => {setVarausnnumero(null); vapauta()}}>
                                        hiihtotunnit
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Osta tunti</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>

                            <Form.Item
                                name="etunimi"
                                fieldKey="etunimi"
                                rules={[{required: true, message: "Kirjoita etunimi"}]}
                                label="Etunimi"
                            >
                                <Input placeholder="Etunimi"/>
                            </Form.Item>

                            <Form.Item
                                name="sukunimi"
                                fieldKey="sukunimi"
                                rules={[{required: true, message: "Kirjoita sukunimi"}]}
                                label="Sukunimi"
                            >
                                <Input placeholder="Sukunimi"/>
                            </Form.Item>

                            <Form.Item
                                name="puhelin"
                                fieldKey="puhelin"
                                rules={[{required: true, message: "Kirjoita puhelinnumero"}]}
                                label="Puhelinnumero"
                            >
                                <Input placeholder="Puhelinnumero"/>
                            </Form.Item>

                            <Form.Item
                                name="sahkoposti"
                                fieldKey="sahkoposti"
                                rules={[
                                    {
                                        type: 'email',
                                        required: true, message: "Virheellinen sähköpostiosoite"
                                    },
                                ]}
                                label="Sähköposti"
                            >
                                <Input placeholder="Sähköposti"/>
                            </Form.Item>

                            <Form.Item
                                name="ika"
                                fieldKey="ika"
                                rules={[{required: true, message: "Valitse ikä"}]}
                                label="Ikä"
                            >
                                <Select>
                                    <Option value="0">Lapsi (alle 6 v)</Option>
                                    <Option value="1">Lapsi (6-11 v)</Option>
                                    <Option value="2">Nuori</Option>
                                    <Option value="3">Aikuinen</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="taitotaso"
                                fieldKey="taitotaso"
                                rules={[{required: true, message: "Valitse taitotaso"}]}
                                label="Taitotaso"
                            >
                                <Select>
                                    <Option value="0">Ensikertalainen</Option>
                                    <Option value="1">Aloitteleva</Option>
                                    <Option value="2">Kokenut</Option>
                                </Select>
                            </Form.Item>
                            {/*
                            <Form.Item
                                name="valineet"
                                fieldKey="valineet"
                                {...tailFormItemLayout}
                                valuePropName="checked"
                            >
                                <Checkbox style={{ marginTop: -30 }} >Vuokraan myös välineet</Checkbox>
                            </Form.Item>

                            <Form.Item
                                label="Paino"
                                name="paino"
                                fieldKey="paino"
                                rules={[{ required: false, message: "Kirjoita paino" }]}
                                hidden={!formValues.valineet}
                            >
                                <Input placeholder="Paino" />
                            </Form.Item>
                            <Form.Item
                                label="Pituus"
                                name="pituus"
                                fieldKey="pituus"
                                rules={[{ required: false, message: "Kirjoita pituus" }]}
                                hidden={!formValues.valineet}
                            >
                                <Input placeholder="Pituus" />
                            </Form.Item>
                            <Form.Item
                                label="Kengän koko"
                                name="kenka"
                                fieldKey="kenka"
                                rules={[{ required: false, message: "Kirjoita kengänkoko" }]}
                                hidden={!formValues.valineet}
                            >
                                <Input placeholder="Kengän koko" />
                            </Form.Item>
                            */}


                            <Form.List
                                name="lisaOppilaat"
                            >

                                {(fields, {add, remove}) => (
                                    <>

                                        {fields.map((field, i) => (

                                            <>
                                                <Divider/>
                                                <Col sm={{offset: 4}}>
                                                    <Title level={3}>Oppilas {i + 2} <MinusCircleOutlined
                                                        onClick={() => {remove(field.name); setLisaoppilaita(lisaoppilaita - 1)}}/></Title>
                                                </Col>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "etunimi"]}
                                                    fieldKey={[field.fieldKey, "etunimi"]}
                                                    rules={[{required: true, message: "Kirjoita etunimi"}]}
                                                    label="Etunimi"
                                                >
                                                    <Input placeholder="Etunimi"/>
                                                </Form.Item>

                                                <Form.Item
                                                    name={[field.name, "ika"]}
                                                    fieldKey={[field.fieldKey, "ika"]}
                                                    rules={[{required: true, message: "Valitse ikä"}]}
                                                    label="Ikä"
                                                >
                                                    <Select>
                                                        <Option value="0">Lapsi (alle 6 v)</Option>
                                                        <Option value="1">Lapsi (6-11 v)</Option>
                                                        <Option value="2">Nuori</Option>
                                                        <Option value="3">Aikuinen</Option>
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item
                                                    name={[field.name, "taitotaso"]}
                                                    fieldKey={[field.fieldKey, "taitotaso"]}
                                                    rules={[{required: true, message: "Valitse taitotaso"}]}
                                                    label="Taitotaso"

                                                >
                                                    <Select>
                                                        <Option value="0">Ensikertalainen</Option>
                                                        <Option value="1">Aloitteleva</Option>
                                                        <Option value="2">Kokenut</Option>
                                                    </Select>
                                                </Form.Item>


                                                {/*<Form.Item
                                                    name={[field.name, "valineetLisaOppilas"]}
                                                    {...tailFormItemLayout}
                                                    valuePropName="checked"
                                                    initialValue={false}
                                                >
                                                    <Checkbox checked={valineetLisaOppilaat[i]}>Vuokraan myös
                                                        välineet</Checkbox>
                                                </Form.Item>*/}

                                              {/*  <Form.Item
                                                    noStyle
                                                    shouldUpdate={(prevValues, currentValues) => prevValues.valineetLisaOppilaat !== currentValues.valineetLisaOppilaat}
                                                >
                                                    {({}) => {
                                                        return formValues.lisaOppilaat[i] !== undefined && formValues.lisaOppilaat[i].valineetLisaOppilas ? (

                                                            <>
                                                                <Form.Item
                                                                    label="Paino"
                                                                    name={[field.name, "paino"]}
                                                                    fieldKey={[field.fieldKey, "paino"]}
                                                                    rules={[{
                                                                        required: false,
                                                                        message: "Kirjoita paino"
                                                                    }]}
                                                                    initialValue={''}
                                                                >
                                                                    <Input placeholder="Paino"/>
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label="Pituus"
                                                                    name={[field.name, "pituus"]}
                                                                    fieldKey={[field.fieldKey, "pituus"]}
                                                                    rules={[{
                                                                        required: false,
                                                                        message: "Kirjoita pituus"
                                                                    }]}
                                                                    initialValue={''}
                                                                >
                                                                    <Input placeholder="Pituus"/>
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label="Kengän koko"
                                                                    name={[field.name, "kenka"]}
                                                                    fieldKey={[field.fieldKey, "kenka"]}
                                                                    rules={[{
                                                                        required: false,
                                                                        message: "Kirjoita kenkän koko"
                                                                    }]}
                                                                    initialValue={''}
                                                                >
                                                                    <Input placeholder="Pituus"/>
                                                                </Form.Item>

                                                            </>

                                                        ) : null;
                                                    }}

                                                </Form.Item>*/}

                                            </>

                                        ))}


                                        <Form.Item
                                            {...tailFormItemLayout}
                                        >
                                            <Button

                                                type="dashed"
                                                onClick={
                                                    () => {
                                                        add()
                                                        setLisaoppilaita(lisaoppilaita + 1)
                                                    }}
                                                block icon={<PlusOutlined/>}

                                            >Lisää oppilas</Button>
                                        </Form.Item>
                                    </>
                                )}

                            </Form.List>


                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card
                                title={"Ostoskori"}
                                style={{margin: 20}}>
                                <Row>
                                    <Col>
                                        {(valine === 0 ? 'Hiihtotunti suksille - ' : '') + (valine === 1 ? 'Hiihtotunti laudalle - ' : '') + (moment(tunti).format("dddd, Do MMMM [klo:] HH:mm"))}
                                    </Col>
                                </Row>
                                <Row gutter={[16, 24]} style={{marginBottom: 35}}>
                                    <Col span={6}>
                                        <Text
                                            strong> {lisaoppilaita === 0 ? 1 : (1 + lisaoppilaita)} {(lisaoppilaita === 0 ? 1 : (1 + lisaoppilaita)) ? "oppilas" : 'oppilasta'}</Text>
                                        <Text
                                            strong> </Text>

                                        <Text
                                            strong>{"á "} {lisaoppilaita === 0 ? hiihtoituntiSolo : hiihtotuntiMoni} €</Text>
                                    </Col>
                                    <Col span={6}>
                                        <Text
                                            strong>{ lisaoppilaita === 0 ? hiihtoituntiSolo : (1 + lisaoppilaita) * hiihtotuntiMoni} €</Text>
                                    </Col>
                                </Row>
                                {/*
                                <Row gutter={[16, 24]} style={{marginBottom: 35}}>
                                    <Col span={6}>Välinevuokra: </Col>
                                    <Col span={6}>

                                        {(formValues.valineet ? 1 : 0) + (formValues.lisaOppilaat !== undefined && formValues.lisaOppilaat.filter(lisaOppilas => lisaOppilas && lisaOppilas.valineetLisaOppilas === true).length)} {((formValues.valineet ? 1 : 0) + (formValues.lisaOppilaat !== undefined && formValues.lisaOppilaat.filter(lisaOppilas => lisaOppilas && lisaOppilas.valineetLisaOppilas === true).length)) === 1 ? 'setti' : 'settiä'}

                                    </Col>
                                    <Col span={6}>{"á " + valinevuokra + " €"}</Col>

                                    <Col
                                        span={6}>{((formValues.valineet ? 1 : 0) + (formValues.lisaOppilaat !== undefined && formValues.lisaOppilaat.filter(lisaoppilas => lisaoppilas && (lisaoppilas.valineetLisaOppilas === true)).length)) * valinevuokra} €

                                    </Col>
                                </Row>*/}

                                <Row>
                                    <Col>Yhteensä: </Col>
                                    {/*<Col
                                        offset={4}>

                                        {((formValues.lisaOppilaat === undefined ?
                                        hiihtoituntiSolo :

                                        (formValues.lisaOppilaat !== undefined && formValues.lisaOppilaat.filter(lisaOppilas => lisaOppilas === undefined || lisaOppilas.valineetLisaOppilas !== undefined).length) === 0

                                            ? hiihtoituntiSolo : hiihtotuntiMoni * (formValues.lisaOppilaat !== undefined && formValues.lisaOppilaat.filter(lisaOppilas => lisaOppilas === undefined || lisaOppilas.valineetLisaOppilas !== undefined).length) + hiihtotuntiMoni) + ((formValues.valineet ? 1 : 0) + (formValues.lisaOppilaat !== undefined && formValues.lisaOppilaat.filter(lisaoppilas => lisaoppilas && (lisaoppilas.valineetLisaOppilas === true)).length)) * valinevuokra)} €
                                    </Col>*/}
                                    <Col offset={4}>
                                        { lisaoppilaita === 0 ? hiihtoituntiSolo : (1 + lisaoppilaita) * hiihtotuntiMoni} €
                                    </Col>
                                </Row>

                                <p style={{marginBottom: -1}}>Korttimaksu</p>
                                <Row gutter={[10, 10]} style={{marginBottom: 15}}>
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
                                </Row>

                                {/* <p style={{ marginBottom: -1 }}>Lompakkopalvelut</p>
                                <Row gutter={[10, 10]} style={{ marginBottom: 15 }}>
                                    <img src={mobilepay} style={{ marginRight: 4, maxWidth: 100, border: maksutapa === 'mobilepay' ? '3px solid gray' : '1px solid black' }} onClick={() => setMaksutapa('mobilepay')} />
                                    <img src={pivo} style={{ marginRight: 4, maxWidth: 100, border: maksutapa === 'pivo' ? '3px solid gray' : '1px solid black' }} onClick={() => setMaksutapa('pivo')} />
                                    <img src={siirto} style={{ marginRight: 4, maxWidth: 100, border: maksutapa === 'siirto' ? '3px solid gray' : '1px solid black' }} onClick={() => setMaksutapa('siirto')} />
                                    <img src={masterpass} style={{ marginRight: 4, maxWidth: 100, border: maksutapa === 'masterpass' ? '3px solid gray' : '1px solid black' }} onClick={() => setMaksutapa('masterpass')} />
                                </Row>*/}

                                <p style={{marginBottom: -1}}>Verkkopankkimaksu</p>
                                <Row gutter={[10, 10]} style={{marginBottom: 15}}>
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

                                </Row>
                                {error && <p style={{color: 'red'}}>Valitse maksutapa</p>}
                                <Checkbox onChange={onChange} checked={hyvaksytty}>Olen lukenut ja hyväksyn</Checkbox><a
                                onClick={showModal}>kaupan ehdot</a>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" disabled={!hyvaksytty}>
                                        Maksa
                                    </Button>
                                    <Button htmlType="button" onClick={() => {
                                        setVarausnnumero(null);
                                        onSelectTunti(moment());
                                        onSelectLauta(moment());
                                        setFormValues({})
                                    }} style={{marginLeft: 10}}>
                                        Peruuta
                                    </Button>
                                </Form.Item>

                            </Card>
                        </Col>
                    </Row>
                </Form>

            }

        </ConfigProvider>
    )
}

export default OstaTunti