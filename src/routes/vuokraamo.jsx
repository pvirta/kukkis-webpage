import {Breadcrumb, notification, Space, Table} from "antd";
import {Link, useSearchParams} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";

export default function Vuokraamo() {
    const columns = [
        {
            title: <h2>Hinnasto</h2>,
            dataIndex: 'aika',
            key: 'aika',

        },
        {
            title: 'Hinta',
            dataIndex: 'hinta',
            key: 'hinta',
        },
    ]

    const data = [

        {
            key: '1',
            aika: <h3>Suksi-ja lautasetit</h3>,
            hinta: ''
        },
        {
            key: '2',
            aika: '1 Tunti',
            hinta: '10,00 €'
        },
        {
            key: '3',
            aika: '2 Tuntia',
            hinta: '14,00 €'
        },
        {
            key: '4',
            aika: '3 Tunta',
            hinta: '18,00 €'
        },
        {
            key: '5',
            aika: '4 Tuntia',
            hinta: '22,00 €'
        },
        {
            key: '6',
            aika: 'Päivä 10-18 (12-20)',
            hinta: '24,00 €'
        },
        {
            key: '7',
            aika: 'Päivä+ilta',
            hinta: '28,00 €'
        },
        {
            key: '8',
            aika: ' ',
            hinta: ' '
        },
        {
            key: '9',
            aika: <h3>Kypärä</h3>,
            hinta: ' '
        },
        {
            key: '10',
            aika: '1 Tunti',
            hinta: '3,00 €'
        },
        {
            key: '11',
            aika: '2 Tuntia',
            hinta: '4,00 €'
        },
        {
            key: '10',
            aika: '3 Tuntia',
            hinta: '5,00 €'
        },
        {
            key: '11',
            aika: '4 Tuntia',
            hinta: '6,00 €'
        },
        {
            key: '8',
            aika: ' ',
            hinta: ' '
        },
        {
            key: '8',
            aika: <h3>Kengät tai monot</h3>,
            hinta: '5,00 €'
        },
        {
            key: '8',
            aika: ' ',
            hinta: ' '
        },
        {
            key: '8',
            aika: <h3>Sauvat</h3>,
            hinta: '2,00 €'
        },

    ]

    const [searchParams, setSearchParams] =useSearchParams()

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

    if (q) {
        openNotificationTunti()
        console.log(q)
    }

    window.scrollTo(0, 0)

    return (
        <main style={{ padding: "1rem" }}>
            <Breadcrumb style={{ padding: "1rem 1rem" }}>
                <Link to={"/"}><Breadcrumb.Item>
                    <HomeOutlined />
                </Breadcrumb.Item></Link>
                <Breadcrumb.Item>Vuokraamo</Breadcrumb.Item>
            </Breadcrumb>
            <Table columns={columns} pagination={{defaultPageSize: 100, position: ['none', 'none'] }} dataSource={data} />
            <p style={{ padding: "1rem 1rem" }}>Meillä käy käteinen, pankki- ja luottokortti sekä Smartum ja Epassi. Täältä voi lukea <a href={'https://www.ski.fi/info/sopimusehdot/valinevuokraamojen-sopimusehdot/'}>Sopimusehdot.</a></p>
        </main>
    );
}