import React from "react";
import { Layout, Menu } from "antd";
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import {
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
  AreaChartOutlined,
  PoweroffOutlined,
  ContactsOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import LoadRoutes from "./LoadRoutes";
import Auth from "../pages/Auth";
import { logout } from "../api/auth";
import UdpLogo from "../assets/jpeg/logo.jpeg";
import { Input } from "antd";

import "./LayoutAdmin.less";
function LayoutAdmin(props) {
  const { Header, Content, Footer, Sider } = Layout;
  const { routes, location } = props;
  const { user, isLoading } = useAuth();

  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/" component={Auth} />
        <Redirect to="/" />
      </>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <Link to="/">
            <img className="logoPanel" />
          </Link>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
          >
            <Menu.Item key="/home/perfil" icon={<AreaChartOutlined />}>
              <Link to="/home/perfil" style={{ fontWeight: "bold" }}>
                Estadísticas
              </Link>
            </Menu.Item>
            <Menu.Item key="/home/consultantes" icon={<SolutionOutlined />}>
              <Link to="/home/consultantes" style={{ fontWeight: "bold" }}>
                Consultantes
              </Link>
            </Menu.Item>
            <Menu.Item key="/home/usuarios" icon={<UserOutlined />}>
              <Link to="/home/usuarios" style={{ fontWeight: "bold" }}>
                Usuarios
              </Link>
            </Menu.Item>
            <Menu.Item key="/home/pacientes" icon={<TeamOutlined />}>
              <Link to="/home/pacientes" style={{ fontWeight: "bold" }}>
                Pacientes
              </Link>
            </Menu.Item>
            <Menu.Item key="/home/convenios" icon={<ContactsOutlined />}>
              <Link to="/home/convenios" style={{ fontWeight: "bold" }}>
                Convenios
              </Link>
            </Menu.Item>
            <Menu.Item key="/home/derivaciones" icon={<AuditOutlined />}>
              <Link to="/home/derivaciones" style={{ fontWeight: "bold" }}>
                Derivaciones
              </Link>
            </Menu.Item>
            <Menu.Item
              key="/"
              icon={<PoweroffOutlined />}
              onClick={logoutUser}
              style={{ fontWeight: "bold" }}
            >
              Cerrar Sesión
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <LoadRoutes routes={routes} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            clinica Psicológica UDP ©2020 Created by TICS II
          </Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}

export default withRouter(LayoutAdmin);
