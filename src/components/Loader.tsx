import React from 'react';
import { Spin } from 'antd';
import '../styles/Loader.css'; 

const Loader: React.FC = () => (
    <div className="loader-container">
        <Spin size="large" />
    </div>
);

export default Loader;
