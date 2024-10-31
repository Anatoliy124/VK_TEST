import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { observer } from 'mobx-react-lite';  
import repoStore from '../store/RepoStore';
import styles from '../styles/RepoItem.module.css';

interface RepoItemProps {
    repo: any;
    onDelete: (id: number) => void;
}

const RepoItem: React.FC<RepoItemProps> = observer(({ repo, onDelete }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState(repo.name);
    const [description, setDescription] = useState(repo.description);

     
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

     
    const handleSave = () => {
        repoStore.editRepo(repo.id, { name, description });  
        setIsModalVisible(false);
    };

     
    const handleDelete = () => {
        onDelete(repo.id);
    };

    return (
        <div className={styles.repoItemContainer}>
            <h3 className={styles.repoTitle}>{repo.name}</h3>
            <p className={styles.repoDescription}>{repo.description}</p>
            <p className={styles.repoStars}>⭐ Stars: {repo.stargazers_count}</p>

            
            <Button type="primary" onClick={showModal} style={{ marginRight: '8px' }}>
                Редактировать
            </Button>

            
            <Button type="primary" danger onClick={handleDelete}>
                Удалить
            </Button>

            
            <Modal
                title="Редактирование репозитория"
                open={isModalVisible}
                onOk={handleSave}  
                onCancel={handleCancel}
                okText="Сохранить"
                cancelText="Отмена"
            >
                <Input
                    placeholder="Название репозитория"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '8px' }}
                />
                <Input.TextArea
                    placeholder="Описание репозитория"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                />
            </Modal>
        </div>
    );
});

export default RepoItem;
