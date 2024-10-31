import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RepoItem from '../components/RepoItem';
import repoStore from '../store/RepoStore';

jest.mock('../store/RepoStore', () => ({
    ...jest.requireActual('../store/RepoStore'),
    editRepo: jest.fn(),
}));

describe('RepoItem', () => {
    const mockRepo = { id: 1, name: 'Repo1', description: 'A description', stargazers_count: 5 };
    const mockOnDelete = jest.fn();

    test('renders repository details', () => {
        render(<RepoItem repo={mockRepo} onDelete={mockOnDelete} />);
        
        expect(screen.getByText('Repo1')).toBeInTheDocument();
        expect(screen.getByText('A description')).toBeInTheDocument();
        expect(screen.getByText('⭐ Stars: 5')).toBeInTheDocument();
    });

    test('calls editRepo and closes modal on save', () => {
        render(<RepoItem repo={mockRepo} onDelete={mockOnDelete} />);

        fireEvent.click(screen.getByText('Редактировать'));
        fireEvent.change(screen.getByPlaceholderText('Название репозитория'), { target: { value: 'Updated Repo' } });
        fireEvent.change(screen.getByPlaceholderText('Описание репозитория'), { target: { value: 'Updated description' } });
        fireEvent.click(screen.getByText('Сохранить'));

        expect(repoStore.editRepo).toHaveBeenCalledWith(1, { name: 'Updated Repo', description: 'Updated description' });
    });

    test('calls onDelete when delete button is clicked', () => {
        render(<RepoItem repo={mockRepo} onDelete={mockOnDelete} />);
        fireEvent.click(screen.getByText('Удалить'));

        expect(mockOnDelete).toHaveBeenCalledWith(mockRepo.id);
    });
});
