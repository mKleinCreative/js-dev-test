import axios from 'axios'


const headers = {
    "Content-Type": "text/plain",
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
            const commits:any = await axios.get(
                `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${fullName}/commits`,
                {headers}
                );
                
            return commits.data[0].commit
        } catch (error) {;
            console.error('error in getCommits :::> \n', error);
        }
    }
}