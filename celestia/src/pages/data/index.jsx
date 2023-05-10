import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, Row, Col, Button } from "antd";
import { createStyles } from "antd-style";
import { LabelContent, TagContent } from "../../components/index";

const useStyles = createStyles({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: "1",
  },
  link: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: "1",
    fontFamily: "DINAlternate"
  },
  button: {
    borderRadius: "18px",
  }
});

const gridStyle = {
  width: "50%",
  textAlign: "left",
  boxShadow: "none",
  lineHeight: "1",
};
const DateStyle = {
  width: "100%",
  textAlign: "left",
  boxShadow: "none",
  lineHeight: "1",
};

export default function Data(props) {
  const { styles } = useStyles();
  const [search, setSearch] = useSearchParams();
  const namespace_id = search.get("namespace_id");
  const height = search.get("height");
  const gas_used = search.get("gas_used");
  const gas_wanted = search.get("gas_wanted");
  const data = search.get("data");
  const txhash = search.get("txhash");
  // const match = useMatch();
  // console.log(match);
  return (
    <Card
      title={<div className={styles.title}>Transaction info</div>}
      headStyle={{
        boxShadow: "0px 2px 4px 0px rgba(188, 193, 200, 0.5)",
        borderRadius: "8px",
      }}
    >
      <Card.Grid hoverable={false} style={gridStyle}>
        <LabelContent label="Namespace ID:">{namespace_id}</LabelContent>
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        <LabelContent label="Height:">{height}</LabelContent>
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        <LabelContent label="Gas used:">{gas_used}</LabelContent>
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        <LabelContent label="Gas wanted:">{gas_wanted}</LabelContent>
      </Card.Grid>
      <Card.Grid hoverable={false} style={DateStyle}>
        <LabelContent label="Txhash:">
          <WrapData txhash={txhash} data={data}/>
        </LabelContent>
      </Card.Grid>
    </Card>
  );
}

function WrapData(props) {
  const { data, txhash } = props;
  const { styles } = useStyles();
  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <TagContent tag="data" status="warning">{data}</TagContent>
      </Col>
      <Col>
        <LabelContent label="Tx:">
          <Row gutter={[0, 24]}>
            <Col span={24}><Link to={`https://testnet.mintscan.io/celestia-incentivized-testnet/txs/${txhash}`} className={styles.link}>{txhash}</Link></Col>
            {/* <Button type="link">{data?.hash}</Button> */}
            <Col><Button type="primary" className={styles.button} href={`https://testnet.mintscan.io/celestia-incentivized-testnet/txs/${txhash}`}>explorer</Button></Col>
          </Row>
        </LabelContent>
      </Col>
    </Row>
  );
}
