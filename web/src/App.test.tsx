import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import RepoContainer from './components/RepoContainer';
import renderer from 'react-test-renderer';
import App from './App';
import AllRepos from './components/AllRepos';
import API from './utils/API';

afterEach(cleanup)

it('whole app renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('A repo container renders correctly', () => {
  const tree = renderer
    .create(<RepoContainer 
      fullName={"full_name"}
      id={5}
      description={"description"}
      language={"language"}
      forks={20}
      key={6}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('should grab commits when the description button is pressed', () => {
  it('should only show one repo when typescript is clicked', () => {
    const { getByText } = render(
      <RepoContainer fullName={"full_name"}
        id={5}
        description={"description"}
        language={"typescript"}
        forks={20}
        key={6}
      />
    )

    expect(getByText(/typescript/)).toBeInTheDocument();
  })

  test("Test desciption icon present ", () => {
    const mockAPiRes =
    {
      message: "This is a commit",
      author: {
        name: "Michael",
        date: "2018-10-24T21:09:50Z"
      }
    };

    jest.spyOn(API, 'getCommits').mockImplementation(async () => {
      try {
        return Promise.resolve(mockAPiRes);
      }
      catch (ex) {
        return Promise.resolve(mockAPiRes);
      }
    });

    const { queryByText } = render(
      <RepoContainer fullName={"full_name"}
        id={5}
        description={"This is information section"}
        language={"typescript"}
        forks={20}
        key={6}
      />
    )

    const icon = queryByText("description") as HTMLElement;

    expect(icon).toBeInTheDocument();
    fireEvent.click(icon);
  });
})

test('renders Navbar', () => {
  render(<AllRepos />);
  const linkElement = screen.getByText(/Filter by language/i);
  expect(linkElement).toBeInTheDocument();
});