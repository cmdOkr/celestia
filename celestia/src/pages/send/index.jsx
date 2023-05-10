import React, {useState} from "react";
import { Typography } from "antd";
import { createStyles } from "antd-style";
import { Row, Col, Form, Input, Button, message } from "antd";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cryptoJS from "crypto-js";

const { Title } = Typography;

const useStyles = createStyles({
  main: {
    // background: "#fff",
    // padding: 48,
    borderRadius: "8px",
  },
  button: {
    fontSize: 24,
  },
  form: {
    "& .lable": {
      fontSize: 24,
      fontWeight: "bold",
      color: "#63687e",
    },
  },
  white: {
    background: "#fff",
    padding: 48,
    // borderRadius: "8px",
  },
  textarea: {
    resize: "none",
  },
});

const formItemLayout = {
  layout: "vertical",
  labelCol: {
    // span: 2,
  },
};

export default function Send(props) {

  const [loading, setLoading] = useState(false)
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = () => {
    setLoading(true);
    const value = form.getFieldValue();
    const { data, fee, gaslimit, node } = value;
    if (!data || !fee || !gaslimit || !node) {
      return message.error("Insufficient data");
    }
    const namespace_id = getNamespaceID();
    axios
      .post(
        "/api/submit_pfb",
        {
          namespace_id,
          data: getData(data),
          gas_limit: gaslimit * 1,
          fee: fee * 1,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        setLoading(false);
        const { height, gas_used, gas_wanted, data, txhash, raw_log } = res.data;
        if (!height) {
          return message.error(raw_log ? raw_log : "something error")
        }
        navigate(`/data?namespace_id=${namespace_id}&height=${height}&gas_used=${gas_used}&gas_wanted=${gas_wanted}&data=${data}&txhash=${txhash}`)
      }).catch(err => {
        message.error(err.message);
        setLoading(false);
      });
    // navigate("/data/123")
  };

  return (
    <Row gutter={[0, 48]}>
      <Col span={24}>
        <Form
          form={form}
          {...formItemLayout}
          className={classNames(styles.form, styles.white)}
          onFinish={onFinish}
        >
          <Row className={styles.main} gutter={48}>
            <Col span={12}>
              <Row gutter={[0, 12]}>
                <Col span={24}>
                  <Title level={2}>Send transaction</Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="data"
                    label={<div className="lable">Data</div>}
                  >
                    <Input.TextArea rows={8} style={{ resize: "none" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="gaslimit"
                    label={<div className="lable">Gas limit</div>}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="fee"
                    label={<div className="lable">Fee</div>}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="node"
                    label={<div className="lable">Node</div>}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col span={24}>
        <Button block type="primary" size="large" onClick={onFinish} loading={loading}>
          Send data
        </Button>
      </Col>
    </Row>
  );
}

function getNamespaceID() {
  const randomWords = cryptoJS.lib.WordArray.random(8);
  return randomWords.toString(cryptoJS.enc.Hex);
}
function getData(txData) {
  const encoder = new TextEncoder(); // 创建 TextEncoder 对象
  const bytes = encoder.encode(txData); // 将字符串转换成字节数组
  const buffer = new Uint8Array(bytes).buffer; // 将字节数组转换成 ArrayBuffer 对象
  return Buffer.from(buffer).toString("hex"); // 将 ArrayBuffer 对象转换成十六进制字符串
}
