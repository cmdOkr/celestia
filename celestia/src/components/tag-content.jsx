import React from "react";
import { createStyles } from "antd-style";
import classNames from "classnames";
import { Col, Row } from 'antd';

const useStyles = createStyles({
  status: {
    fontSize: 18,
    lineHeight: "1",
    fontFamily: "DINAlternate",
    fontWeight: "bold",
    borderRadius: "18px",
    color: "#fff",
    padding: "6px 10px 6px 10px",
    "&.normal": {
      background: "#65cc7f",
    },
    "&.error": {
      background: "#ff0000",
    },
    "&.warning": {
      background: "#ffad33",
    },
  },
  children: {
    fontSize: 24,
    lineHeight: "1",
    fontFamily: "DINAlternate",
    fontWeight: "bold",
  },
  
});

export default function TagContent(props) {
  const { tag, status, children } = props;
  const { styles } = useStyles();
  return (
    <Row gutter={24} align="middle">
      <Col>
        <div className={classNames(styles.status, status, styles.main)}>{tag}</div>
      </Col>
      <Col className={styles.children}>
        {children}
      </Col>
    </Row>
  );
}
