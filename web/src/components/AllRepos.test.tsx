import React from 'react';
import AllRepos from './AllRepos';
import { fireEvent, render, waitFor } from '@testing-library/react';
import API from '../utils/API';

describe('it should filter out by language when the button in the navbar is pressed', () => {
    test('gets repositories', async () => {
        const mockData: any = {
            data: {
                allRepos: [
                    {
                        language: "Typescript"
                    },
                    {
                        language: "PHP"
                    },
                    {
                        language: "PHP"
                    }
                ]
            }
        }
        jest.spyOn(API, 'getRepos').mockResolvedValue(mockData)
        let cont;

        const { container, getAllByText } = render(<AllRepos />)
        cont = container
        await waitFor(() => {
            // expect(container).toBeNull()
            expect(getAllByText(/Typescript/i).length).toBe(3);
        });
    })


    test('gets repositories detail', async () => {
        const mockData: any = {
            data: {
                allRepos: [
                    {
                        language: "Typescript",
                        full_name: "typescript-fullname"
                    },
                    {
                        language: "PHP",
                        full_name: "php-fullname"
                    }
                ]
            }
        }
        jest.spyOn(API, 'getRepos').mockResolvedValue(mockData)

        const { container, getAllByText, getByText, queryAllByText} = render(<AllRepos />)
        let link = getAllByText(/none/i)[0];
        await waitFor(() => {
            // expect(container).toBeNull()
            link = container.querySelector(".Typescript-toggle") as HTMLElement;
            expect(link).not.toBeNull();

            expect(queryAllByText(/php-fullname/i).length).toBe(2);
            // expect(getAllByText(/typescript-fullname/i).length).toBe(0);
            fireEvent.click(link);
        });
        await waitFor(() => {
            expect(queryAllByText(/php-fullname/i).length).toBe(0);
        })
    })
})