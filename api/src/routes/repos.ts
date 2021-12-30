import express from 'express';
import axios from 'axios'
import { readFile } from 'fs'

export const repos = express.Router();

interface repoJson {
  fork: boolean;
}

repos.get('/', async (req, res) => {
  res.header('Content-Type', 'application/json');
  let local = readFile('../data/repos.json', 'utf8', (err, data) => {
    if (err) throw err;
    JSON.parse(data)
  });
  let dataResponse = await axios.get('https://api.github.com/users/silverorange/repos')
  dataResponse = dataResponse.data.filter((repo: repoJson) => {
    return repo.fork === false
  })

  console.log(local)
  res.status(200);
  res.send({dataResponse});
});
