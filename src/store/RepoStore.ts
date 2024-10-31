import { makeAutoObservable } from 'mobx';
import axios from 'axios';

type SortField = 'name' | 'stargazers_count' | 'description';
type SortOrder = 'asc' | 'desc';

class RepoStore {
    repos: any[] = [];
    loading = false;
    page = 1;
    hasMore = true;
    sortField: SortField = 'name';
    sortOrder: 'asc' | 'desc' = 'asc';

    constructor() {
        makeAutoObservable(this);
    }

    async fetchRepos() {
        if (this.loading || !this.hasMore) return;
        this.loading = true;
        try {
            const response = await axios.get(`https://api.github.com/search/repositories`, {
                params: {
                    q: 'javascript',
                    sort: 'stars',
                    order: 'asc',
                    page: this.page,
                },
            });
            const newRepos = response.data.items;
            this.repos = [...this.repos, ...newRepos];
            this.page += 1;
            if (newRepos.length === 0) this.hasMore = false;
        } catch (error) {
            console.error('Error fetching repositories:', error);
        } finally {
            this.loading = false;
            this.sortRepos();
        }
    }

    editRepo(id: number, updatedRepo: { name: string; description: string }) {
        const index = this.repos.findIndex(repo => repo.id === id);
        if (index !== -1) {
            this.repos[index] = { ...this.repos[index], ...updatedRepo };
        }
    }

    deleteRepo(id: number) {
        this.repos = this.repos.filter(repo => repo.id !== id);
    }

    setSortField(field: SortField) {
        this.sortField = field;
        this.sortRepos();
    }

    setSortOrder(order: 'asc' | 'desc') {
        this.sortOrder = order;
        this.sortRepos();
    }

    sortRepos() {
        const direction = this.sortOrder === 'asc' ? 1 : -1;
    
        this.repos = this.repos.slice().sort((a, b) => {
            if (this.sortField === 'stargazers_count') {
                return direction * (a.stargazers_count - b.stargazers_count);
            }
            
            const fieldA = a[this.sortField] || '';
            const fieldB = b[this.sortField] || '';
    
            return direction * fieldA.localeCompare(fieldB);
        });
    }
}

const repoStore = new RepoStore();
export default repoStore;
