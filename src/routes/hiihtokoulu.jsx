import {Breadcrumb, Button, Table} from "antd";
import {Link} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";
import Kurssit from "./Kurssit";

export default function Hiihtokoulu() {

    const columns = [
        {
            title: <h2>Opetushinnasto</h2>,
            dataIndex: 'aika',
            key: 'aika',
        },
        {
            title: '',
            dataIndex: 'hinta',
            key: 'hinta',
        }

    ]

    const data = [
        {
            key: '1',
            aika: '1 henkilö',
            hinta: '45 € / kerta (50 min)'
        },
        {
            key: '1',
            aika: '2 tai useampi henkilö',
            hinta: '35 € / henkilö / kerta (50 min)'
        },
    ]

    window.scrollTo(0, 0)

    return (
        <main style={{ padding: "1rem 0" }}>
            <Breadcrumb style={{ padding: "1rem 1rem" }}>
                <Link to={"/"}><Breadcrumb.Item>
                    <HomeOutlined />
                </Breadcrumb.Item></Link>
                <Breadcrumb.Item>Hiihtokoulu</Breadcrumb.Item>
            </Breadcrumb>
            <h2 style={{ padding: "0 1rem" }}>HIIHTOKOULU KUKKIS</h2>
            <h3 style={{ padding: "0 1rem" }}>Hiihtokoulu Kukkiksen koulutetut opettajat tarjoavat opetusta lasketteluun, lautailuun ja telemarkkiin.</h3>
            <h3 style={{ padding: "0 1rem" }}>Soveltavia kelkkatunteja voit kysyä numerosta: <a href={'tel: 0405486397'}>0405486397</a></h3>

            <Table dataSource={data} columns={columns} pagination={{ position: ['none', 'none'] }} />
            <br />
            <p style={{ padding: "0 1rem" }}>Tunnit ovat ostettavissa edelliseen päivään klo 20 asti. Täältä voi lukea hiihtokoulun <a href={' https://www.ski.fi/info/sopimusehdot/hiihtokoulujen-sopimusehdot/'}>Sopimusehdot.</a></p>
            <Link style={{ padding: "1rem" }} to={'/ostatunti'}><Button size={'large'} type={'primary'}>Osta tunti</Button></Link>


            <Link style={{ padding: "1rem" }} to={'/kurssit'}><Button size={'large'} type={'primary'}>Kurssit</Button></Link>

        </main>
    );
}