import express from 'express';
import axios from 'axios';
import { readFile } from 'fs';
import util from 'util';

export const repos = express.Router();

interface RepoJson {
  fork: boolean;
}

//Allowing readFile to be used a promise
const open = util.promisify(readFile);

// function to get the data from the local data JSON file
const getLocal = open('../data/repos.json', 'utf8').then((data) => {
  const returned = JSON.parse(data);
  return returned.filter((repo: RepoJson) => repo.fork === false);
});

repos.get('/', async (req, res) => {
  res.header('Content-Type', 'application/json');
  const local = await getLocal;

  let dataResponse = await axios.get(
    'https://api.github.com/users/silverorange/repos'
  );

  dataResponse = dataResponse.data.filter((repo: RepoJson) => {
    return repo.fork === false;
  });
  const allRepos = { ...dataResponse, local };
  res.status(200);
  res.send({ allRepos });
});
