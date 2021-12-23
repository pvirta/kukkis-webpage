import {Breadcrumb, Button, Table} from "antd";
import {Link} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";

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
            hinta: '45 € / kerta'
        },
        {
            key: '1',
            aika: '2 tai useampi henkilö',
            hinta: '35 € / henkilö / kerta'
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
            <h3 style={{ padding: "1rem 1rem" }}>Hiihtokoulu Kukkiksen koulutetut opettajat tarjoavat opetusta lasketteluun, lautailuun ja telemarkkiin.</h3>

            <Table dataSource={data} columns={columns} pagination={{ position: ['none', 'none'] }} />

            <Link style={{ padding: "2rem 1rem", position: 'relative', top: 20 }} to={'/ostatunti'}><Button size={'large'} type={'primary'}>Osta tunti</Button></Link>
        </main>
    );
}