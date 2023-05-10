import React from 'react';
import { Row, Col } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles({
  label: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Arial"
  },
  content: {
    fontSize: 24,
    color: "#63687e",
    fontFamily: "DINAlternate",
    fontWeight: "bold",
  }
})

export default function LabelContent(props) {
  const { label, children } = props;
  const { styles } = useStyles();
  return (
    <Row gutter={[0, 24]}>
      <Col span={24} className={styles.label}>{label}</Col>
      <Col span={24} className={styles.content}>{children}</Col>
    </Row>
  )
}
