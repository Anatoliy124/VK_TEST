import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Select, Button } from 'antd';
import repoStore from '../store/RepoStore';
import RepoItem from './RepoItem';
import Loader from './Loader';

const { Option } = Select;

const RepoList: React.FC = observer(() => {
    useEffect(() => {
        repoStore.fetchRepos();
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight) {
                repoStore.fetchRepos();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSortFieldChange = (value: 'name' | 'stargazers_count' | 'description') => {
        repoStore.setSortField(value);
    };

    const toggleSortOrder = () => {
        const newOrder = repoStore.sortOrder === 'asc' ? 'desc' : 'asc';
        repoStore.setSortOrder(newOrder);
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <Select
                    defaultValue="name"
                    style={{ width: 200 }}
                    onChange={handleSortFieldChange}
                >
                    <Option value="name">По названию</Option>
                    <Option value="stargazers_count">По звездам</Option>
                    <Option value="description">По описанию</Option>
                </Select>

                {/* Кнопка сортировки с data-testid для тестов */}
                <Button data-testid="sort-order-button" onClick={toggleSortOrder}>
                    <span data-testid="sort-order-text">
                        {repoStore.sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
                    </span>
                </Button>
            </div>

            {repoStore.repos.map((repo) => (
                <RepoItem key={repo.id} repo={repo} onDelete={() => repoStore.deleteRepo(repo.id)} />
            ))}
            {repoStore.loading && <Loader />}
        </div>
    );
});

export default RepoList;
