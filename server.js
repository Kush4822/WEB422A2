/*********************************************************************************
 *  WEB422 – Assignment 1
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: KUSH VINODBHAI PATEL Student ID: 121535215 Date: 03 FEBRUARY 2023
 *  Cyclic Link: _______________________________________________________________
 *
 ********************************************************************************/

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

const app = express();
const port = 5000;

dotenv.config();

app.use(cors());

app.use(express.json());

app.get("/api/movies", async (req, res) => {
  try {
    // const page = req.query.page ? req.query.page : 1;
    // const perPage = req.query.perPage ? req.query.perPage : 5;
    const title = req.query.title & req.query.title;

    const movies = await db.getAllMovies(
      req.query.page,
      req.query.perPage,
      title
    );
    res.status(200).send(movies);
  } catch (error) {
    res
      .status(400)
      .send("You should pass page number and perpage query parameter too!");
  }
});

app.get("/api/movies/:id", async (req, res) => {
  try {
    const movie = await db.getMovieById(req.params.id);
    res.status(200).send(movie);
  } catch (error) {
    res.status(404).send("Movie not found!");
  }
});

app.post("/api/movies", async (req, res) => {
  try {
    // const movie = {
    //   title: 'Attack on Titan',
    //   genres: ['Action', ' Action', 'Award Winning', 'Drama', 'Suspense'],
    //   languages: ['English', 'Japanese']
    // }
    const newMovie = await db.addNewMovie(req.body);
    res.status(201).send(newMovie);
  } catch (error) {
    res.status(304).send("Could not create new movie!");
  }
});

app.patch("/api/movies/:id", async (req, res) => {
  try {
    await db.updateMovieById(req.body, req.params.id);
    res.status(200).send("Movie updated successfully!");
  } catch (error) {
    res.status(304).send("Could not update movie!");
  }
});

app.delete("/api/movies/:id", async (req, res) => {
  try {
    await db.deleteMovieById(req.params.id);
    res.status(200).send("Movie deleted successfully!");
  } catch (error) {
    res.status(304).send("Could not delete movie!");
  }
});

db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(port, () => {
      console.log(`server listening on: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
