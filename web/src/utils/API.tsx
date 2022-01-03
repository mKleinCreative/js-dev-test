import axios from 'axios';

const headers = {
  'Content-Type': 'text/plain',
};

export default {
  getRepos: async function () {
    try {
      const repos = await axios.get('/repos', { headers });
      return repos;
    } catch (error) {
      console.error('error in getRepos ::::> \n', error);
    }
  },
  // gets commit from repo name
  getCommits: async function (fullName: string) {
    try {
      const commits: any = await axios.get(
        `https://api.github.com/repos/${fullName}/commits`,
        { headers }
      );
      return commits.data[0].commit;
    } catch (error) {
      console.error('error in getCommits meaning there are none :::> \n', error);
      return {
        author: {
          name: "No commit history",
          date: ""
        },
        message: ""
      }
    }
  },
};
