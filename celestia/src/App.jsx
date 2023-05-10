import "./App.css";
import { Layout } from "antd";
import { WrapHeaders, WrapFooter } from "./components/index";
import { createStyles } from "antd-style";
import { Navigate, useRoutes } from 'react-router-dom';
const { Header, Footer, Content } = Layout;
import { Send, Data } from './pages/index';

const useStyles = createStyles({
  header: {
    backgroundColor: "#fff",
    height: 83,
    lineHeight: "83px",
  },
  content: {
    background: "#f2f7fe",
    padding: 36
  },
  footer: {
    background: "#f2f7fe",
    paddingLeft: 36,
    paddingRight: 36,
  },
});

export default function App(props) {
  const { styles } = useStyles();
  return (
    <Layout>
      <Header className={styles.header}>
        <WrapHeaders></WrapHeaders>
      </Header>
      <Content className={styles.content}>
        <BaseRouter {...props}/>
      </Content>
      <div className={styles.footer}><WrapFooter ></WrapFooter></div>
    </Layout>
  );
}

function BaseRouter(props) {
  const element = useRoutes([
    {
      path: '/send',
      element: <Send {...props} />
    },
    {
      path: '/data',
      element: <Data {...props} />
    },
    {
      path: '*',
      element: <Navigate to='/send' />
    }
  ])
  return element;
}