import axios from 'axios';

export const fetchRepositories = async (page: number) => {
    const response = await axios.get(`https://api.github.com/search/repositories`, {
        params: {
            q: 'javascript',
            sort: 'stars',
            order: 'asc',
            page,
        },
    });
    return response.data.items;
};
