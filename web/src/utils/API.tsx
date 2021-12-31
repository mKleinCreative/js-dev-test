import axios from 'axios'
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const headers = {
    "Content-Type": "text/plain"
};



export default {
    getRepos: async function() {
        try {
            const repos = await axios.get(
                'http://localhost:4000/repos',
                {headers}
                );
            return repos;
        } catch (error) {
            console.error('error in getRepos ::::> \n', error);
        }
    },
    // gets commit from repo name
    getCommits: async function( fullName:string ) {
        try {
            const commits = await axios.get(
                `https://api.github.com/repos/${fullName}/commits`,
                {headers}
                );
            return commits
        } catch (error) {;
            console.error('error in getCommits :::> \n', error);
        }
    }
}