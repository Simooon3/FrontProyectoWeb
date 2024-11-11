import './Login.css';
import { Button, Card, Checkbox, Form, Input, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    // Agregar la clase login-body al body al cargar el componente y removerla al salir
    useEffect(() => {
        document.body.classList.add('login-body');
        return () => {
            document.body.classList.remove('login-body');
        };
    }, []);

    const onFinish = async (values) => {
        const { email, password } = values;
    
        try {
            // Hacer la solicitud POST al backend para verificar el usuario
            const response = await axios.post(`http://localhost:4000/verificar-usuario`, {
                correo: email,
                contraseña: password // Enviar la contraseña también
            });
    
            const { tipo_usuario, usuario } = response.data;
            console.log('Usuario recibido:', usuario); // Agrega esta línea para verificar el objeto usuario
    
            if (tipo_usuario === 'Tecnico') {
                navigate('/dashboardtecnico', { state: { usuario }}); // Enviar usuario al dashboard técnico
            } else if (tipo_usuario === 'Cliente') {
                navigate('/dashboardcliente', { state: { usuario }}); // Enviar usuario al dashboard cliente
            } else {
                console.error("Usuario no encontrado");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Contraseña incorrecta");
            } else {
                console.error("Error al iniciar sesión:", error);
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card className="login-container">
            <Typography.Title level={3} align="center" strong className="title">
                Log In
            </Typography.Title>
            <Typography.Text type="secondary" strong className="slogan">
                Bienvenido a Nombre de Empresa o slogan
            </Typography.Text>

            <Form name="formLogin" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor, ingresa tu email' }]}
                >
                    <Input placeholder="user@gmail.com" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" className="checkBoxRemember">
                    <Checkbox>Recordar me</Checkbox>
                </Form.Item>

                <Button block type="primary" htmlType="submit">
                    Iniciar Sesión
                </Button>
            </Form>
        </Card>
    );
};

export default Login;