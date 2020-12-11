import React, { useState } from "react";
import { Form, Input, Button, notification, Tooltip } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { signUpApi } from "../../../api/user";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";

export default function SignUp() {
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    nombre: false,
    nombre_social: false,
    repeatPassword: false,
    apellido: false,
  });
  const inputValidation = (values) => {
    const { email, password } = values;

    if (email) {
      setFormValid({ ...formValid, [email]: emailValidation(email) });
    }
    if (password) {
      setFormValid({ ...formValid, [password]: minLengthValidation(password) });
    }
  };

  const login = async (values) => {
    const {
      nombre,
      nombre_social,
      email,
      password,
      apellido,
      repeatPassword,
    } = values;
    if (
      !email ||
      !password ||
      !repeatPassword ||
      !nombre_social ||
      !nombre ||
      !nombre_social ||
      !apellido
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (password !== repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales.",
        });
      } else {
        const user = {
          nombre,
          nombre_social,
          email,
          password,
          apellido,
        };

        const result = await signUpApi(user);

        if (result.msg) {
          notification["error"]({
            message: result,
          });
        } else {
          notification["success"]({
            message: result.message,
          });
          resetForm();
        }
      }
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };
  return (
    <Form name="normal_login" className="login-form" onFinish={login}>
      <h1> Registro</h1>
      <Form.Item
        name="nombre"
        rules={[{ required: true, message: "Favor ingresar nombre!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nombre"
          type="text"
        />
      </Form.Item>
      <Form.Item
        name="apellido"
        rules={[{ required: true, message: "Favor ingresar apellido!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Apellido"
          type="text"
        />
      </Form.Item>

      <Form.Item
        name="nombre_social"
        rules={[{ required: true, message: "Favor ingresar nombre social!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nombre Social"
          type="text"
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="como quieres que te llamemos?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Favor ingresar correo electrónico!" },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Correo electrónico"
          onChange={inputValidation}
          type="email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Favor ingresar contraseña!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          onChange={inputValidation}
          placeholder="Contraseña"
        />
      </Form.Item>
      <Form.Item
        name="repeatPassword"
        rules={[{ required: true, message: "Favor repetir contraseña!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          onChange={inputValidation}
          placeholder="Contraseña"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Registrate
        </Button>
      </Form.Item>
    </Form>
  );
}
