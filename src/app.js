const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");
const { query } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0
  }
  
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id );

  if(repoIndex < 0){
    return response.status(400).json({error:"not found"})
  }

  const {title,url,techs} = request.body;

  const repoLikes = repositories[repoIndex] ['likes'];

  const updatedRepo = {
    id,
    title,
    url,
    techs,
    likes: repoLikes
  }

  repositories[repoIndex] = updatedRepo;

  return response.json(updatedRepo);
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0){
    return response.status(400).send();
  }

  repositories.splice(repoIndex,1);
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const { id } = request.params;

  const repository = repositories.find(repo => repo.id === id);

  if (!repository) {
    return response.status(400).send();
  }
  
  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
