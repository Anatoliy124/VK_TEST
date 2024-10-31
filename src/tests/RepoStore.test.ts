import repoStore from '../store/RepoStore';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RepoStore', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        repoStore.repos = [];
        repoStore.page = 1;
        repoStore.hasMore = true;
        repoStore.sortField = 'name';
        repoStore.sortOrder = 'asc';
    });

    test('fetchRepos should fetch data and update repos', async () => {
        const mockData = { data: { items: [{ id: 1, name: 'Repo1' }, { id: 2, name: 'Repo2' }] } };
        mockedAxios.get.mockResolvedValue(mockData);

        await repoStore.fetchRepos();

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(repoStore.repos.length).toBe(2);
        expect(repoStore.repos[0].name).toBe('Repo1');
    });

    test('editRepo should update repository details', () => {
        repoStore.repos = [{ id: 1, name: 'Repo1', description: 'Old description' }];
        repoStore.editRepo(1, { name: 'Repo1 Updated', description: 'New description' });

        expect(repoStore.repos[0].name).toBe('Repo1 Updated');
        expect(repoStore.repos[0].description).toBe('New description');
    });

    test('deleteRepo should remove repository by id', () => {
        repoStore.repos = [{ id: 1, name: 'Repo1' }, { id: 2, name: 'Repo2' }];
        repoStore.deleteRepo(1);

        expect(repoStore.repos.length).toBe(1);
        expect(repoStore.repos[0].id).toBe(2);
    });

    test('sortRepos should sort repositories by specified field and order', () => {
        repoStore.repos = [
            { id: 1, name: 'C', stargazers_count: 5, description: '' },
            { id: 2, name: 'A', stargazers_count: 15, description: '' },
            { id: 3, name: 'B', stargazers_count: 10, description: '' },
        ];
        repoStore.setSortField('name');
        repoStore.sortRepos();

        expect(repoStore.repos[0].name).toBe('A'); 
        repoStore.setSortOrder('desc');
        repoStore.sortRepos();
        expect(repoStore.repos[0].name).toBe('C'); 
    });
});
