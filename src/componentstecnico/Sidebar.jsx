import { Flex, Menu } from 'antd';
import { HomeOutlined, UserOutlined, SearchOutlined, LaptopOutlined, SettingOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import '../pages/dashboardTecnico/Dashboardtecnico.css';

const Sidebar = ({ onMenuClick }) => {
    return (
        <>
            <Flex align='center' justify='center'>
                <div className='logo'>
                    <LaptopOutlined style={{ fontSize: '32px' }} /> {/* Icono de computador */}
                </div>
            </Flex>

            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                className='menu-bar'
                onClick={onMenuClick}  // Manejo del click, es decir, en que botón estamos
                items={[
                    {
                        key: '1',
                        icon: <HomeOutlined />,
                        label: 'Dashboard',
                    },
                    {
                        key: '2',
                        icon: <UserOutlined />,
                        label: 'New Client',
                    },
                    {
                        key: '3',
                        icon: <SearchOutlined />,
                        label: 'Search Client',
                    },
                    {
                        key: '4',
                        icon: <SettingOutlined />,
                        label: 'Assigned Computers',
                    },
                    {
                        key: '5',
                        icon: <ProfileOutlined />,
                        label: 'History',
                    },
                    {
                        key: '6',
                        icon: <LogoutOutlined />,
                        label: 'Log Out',
                    },
                ]}
            />
        </>
    );
};

export default Sidebar;