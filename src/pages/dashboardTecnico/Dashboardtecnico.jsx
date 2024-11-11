import { Button, Flex, Layout } from 'antd';
import { useState } from 'react';
import Sidebar from '../../componentstecnico/Sidebar';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import CustomHeader from '../../componentstecnico/Header';
import './DashboardTecnico.css';
import MainContent from '../../componentstecnico/MainContent';
import SideContent from '../../componentstecnico/SideContent';
import { useLocation } from 'react-router-dom';

const { Sider, Header, Content } = Layout;

const DashboardTecnico = () => {
    const location = useLocation() // Usar useLocation para acceder a la ubicacion actual
    const { usuario } = location.state || {} // Obtener el usuario del estado, con un fallback a undefined

    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');  // Estado para controlar el item seleccionado

    // Función para manejar el clic en el menú
    const handleMenuClick = ({ key }) => {
        setSelectedKey(key);  // Actualiza el estado con la clave del ítem seleccionado
    };

    return (
        <Layout>
            <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
                <Sidebar onMenuClick={handleMenuClick} /> {/* Pasamos la función como prop al Sidebar */}

                <Button
                    type='text'
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="trigger-btn"
                />
            </Sider>

            <Layout>
                <Header className='header'>
                    <CustomHeader name={`${usuario.NombreTc} ${usuario.ApellidoTc}`}/>
                </Header>

                <Content className='content'>
                    <Flex gap="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh' }}>
                        {/* Pasamos el estado 'selectedKey' al MainContent para mostrar el formulario */}
                        <MainContent selectedKey={selectedKey} tecnicoId= {usuario?.ID_Tecnico}/>
                        {selectedKey === '1' && (
                            <div style={{ marginLeft: 'auto' }}>
                                <SideContent />
                            </div>
                        )}
                    </Flex>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardTecnico;