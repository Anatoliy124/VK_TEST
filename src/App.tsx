import React from 'react';
import RepoList from './components/RepoList';
import './styles/app.css'
import { Layout, Typography, ConfigProvider } from 'antd';
import theme from './styles/theme'; 
import './styles/app.css';

const { Content } = Layout;

const App: React.FC = () => {
    return (
        <ConfigProvider theme={theme}>
            <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}> 
                <Content style={{ padding: '20px 50px', maxWidth: '800px', margin: '0 auto' }}>
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
                        GitHub Repositories
                    </Typography.Title>
                    
                    <RepoList />
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default App;
