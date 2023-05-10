import { Col, Row } from "antd";
import { createStyles } from "antd-style";

const useStyles = createStyles({
  main: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  copyright: {
    color: "#63687e"
  }
});

export default function WrapFooter() {
  const { styles, cx } = useStyles();
  return (
    <Row  justify="space-between">
      <Col className={cx(styles.main, styles.copyright)}>ⓒ《PayForBlod》,2023</Col>
      <Col className={styles.main}>Github</Col>
    </Row>
  );
}
