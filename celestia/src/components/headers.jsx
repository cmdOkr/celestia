import React from 'react';
import { Col, Row } from 'antd';
import { createStyles } from 'antd-style';
import logo from '../assets/logo.png';
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";

const useStyles = createStyles({
  status: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    textAlign: "center",
    '&.active': {
      background: '#4bb22f',
    },
    '&.error': {
      background: '#ff0000',
    },
    '&.offline': {
      background: '#9e9e9e',
    }
  },
  node: {
    fontSize: 20
  },
  logo: {
    cursor: "pointer"
  }
});

export default function WrapHeaders(props) {
  const { status = "active" } = props;
  const { styles } = useStyles();
  const navigate = useNavigate();

  return (
    <Row justify="space-between">
      <Col className={styles.logo}><img src={logo} alt="logo" onClick={() => {navigate("/")}} /></Col>
      <Col>
        <Row gutter={8} align="middle">
          <Col><div className={classNames(styles.status, status)}></div></Col>
          <Col className={styles.node}>Node {status}</Col>
        </Row>
      </Col>
    </Row>
  )
}
