Hippo Education TypeScript Developer Assessment
===============================================

This exercise is designed to assess how you approach tasks required in your
position as a full-stack developer at Hippo Education. We are interested to see how you
work, as well as what your final results are; include useful Git commit
messages and comments where you think your code may be unclear.

Tasks
------

Using the provided `express` server in `/api`:
- Implement the `/repos` API endpoint
- It should aggregate data from the following sources:
  - https://api.github.com/users/silverorange/repos
  - the provided JSON file (in `data/repos.json`). Assume this file can change
    while the service is running.
- The API endpoint should only return repositories where `repository.fork` is `false`.

Using the provided `create-react-app` base:
- Fetch repo data from the Express endpoint created above.
- Using mobile-first responsive styling, display a list of repositories.
- Each list item should include the repository name, description, language, and forks count.
- Add buttons for each language type which filter the list by language when clicked on.
- Clicking a repo in the list should display the most recent commit date, author, and message.
  - The last 30 commits for a repository can be loaded via this endpoint: `https://api.github.com/repos/${repo.full_name}/commits`.
- Implement tests using `jest` for your components.
  - Jest is installed by create-react-app and can be run from the `web/` folder with `yarn test`.
  - We are most interested in your overall approach to testing -- e.g. what you choose to test -- not the exact implementation of your tests. If you're new to testing or are having trouble, we'd prefer to see a full suite of dummy tests that outline a good testing strategy than 1 or 2 working tests that don't really test anything of substance.

Coding Standard
---------------
Please use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
for your code. The project is set up to lint your code using:
```sh
yarn lint
```

If your editor is not already configured to use Prettier, you can format code
in the project using:
```sh
yarn prettier-write
```

Dependencies
------------
You can use any 3rd-party libraries as necessary or as desired in
order to achieve the tasks. The project is currently set up to use Yarn but
you may update it to use NPM if that is your preference.

Getting Started With the Express Backend (/api)
-----------------------------------------------
For this exercise a pre-built Express application is provided. The application
runs by default on `localhost:4000` and has the following endpoints:

 - `http://localhost:4000/repos` - returns a JSON-encoded array of github repositories.

### Running the Express Application

```sh
cd api/
yarn install
yarn start
```

You can verify the API is working by visiting http://localhost:4000/repos in
your browser or another HTTP client.

Getting Started with the React Frontend (/web)
----------------------------------------------
The React frontend is a bare create-react-app.

### Running the React Application

```sh
cd web/
yarn install
yarn start
```
