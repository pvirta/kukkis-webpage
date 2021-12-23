import {Button, Table, Breadcrumb} from "antd";
import { HomeOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

export default function Vuokraamo() {
    const columns = [
        {
            title: '',
            dataIndex: 'aika',
            key: 'aika',

        },
        {
            title: 'Alle 12v',
            dataIndex: 'alle12',
            key: 'alle12',
        },
        {
            title: 'Normaali',
            dataIndex: 'normaali',
            key: 'normaali',
        },
    ]

    const data = [
        {
            key: '1',
            aika: '1 Tunti',
            alle12: '14,00 €',
            normaali: '16,00 €'
        },
        {
            key: '2',
            aika: '2 Tunti',
            alle12: '16,00 €',
            normaali: '18,00 €'
        },
        {
            key: '3',
            aika: '3 Tunti',
            alle12: '18,00 €',
            normaali: '20,00 €'
        },
        {
            key: '4',
            aika: '4 Tunti',
            alle12: '20,00 €',
            normaali: '22,00 €'
        },
        {
            key: '5',
            aika: 'Päivä 10-18 (12-20)',
            alle12: '22,00 €',
            normaali: '24,00 €'
        },

    ]

    const columns2 = [
        {
            title: '',
            dataIndex: 'aika',
            key: 'aika',
            render: text => <div style={{maxWidth: 200}}>{text}</div>

        },
        {
            title: '',
            dataIndex: 'normaali',
            key: 'normaali',
        },

    ]

    const data2 = [
        {
            key: '1',
            aika: 'Kausikortti',
            normaali: '240,00 €'
        },
        {
            key: '2',
            aika: 'Lisäkortti samaan perheeseen',
            normaali: '220,00 €'
        },
        {
            key: '3',
            aika: 'Yrityskausikortti',
            normaali: '400,00 €'
        },
        {
            key: '4',
            aika: 'Porin Slalomseuran kausikortti',
            normaali: '220,00 €',
        },
        {
            key: '5',
            aika: 'Lisäkortti samaan perheeseen',
            normaali: '200,00 €'
        },
        {
            key: '6',
            aika: 'Porin Slalomseuran jäsenmaksu',
            normaali: '25,00 €'
        },
    ]

    window.scrollTo(0, 0)

    return (
        <main style={{ padding: "1rem" }}>
            <Breadcrumb>
                <Link to={"/"}><Breadcrumb.Item>
                    <HomeOutlined />
                </Breadcrumb.Item></Link>
                <Breadcrumb.Item>Hissiliput</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Hissiliput</h1>
            <a href='https://snowcard.fi/v/#/ruosniemi/350'><Button>Osta ja lataa hissilippu</Button></a>
            <Table columns={columns} pagination={{ position: ['none', 'none'] }} dataSource={data} />
            <h3 style={{ padding: "1rem" }}>SnowCard, etäluettava älykortti 5€</h3>
            <p style={{ padding: "0 1rem" }}>Alle 7v. "kypäräpäät" maksavan aikuisen kanssa ilmaiseksi, molemmilla SnowCard </p>
            <h2 style={{ padding: "0 1rem" }}>Taikamatto kaikille ilmainen</h2>
            <Table columns={columns2} pagination={{ position: ['none', 'none'] }} dataSource={data2} />
            <p style={{ padding: "1rem 1rem" }}>Meillä käy käteinen, pankki- ja luottokortti sekä Smartum ja Epassi. Täältä voi lukea <a href={'https://www.ski.fi/info/sopimusehdot/hiihtokeskuspalveluiden-sopimusehdot/'}>Sopimusehdot.</a></p>

        </main>
    );
}