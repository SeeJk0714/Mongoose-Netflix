const express = require("express");
const router = express.Router();

// import model into router
const tvshow = require("../models/tvshow");

/* list all the movies */
router.get("/", async (req,res) => {
    const { premiere_year, genre, rating } = req.query;
    let filter = {};
    if (premiere_year || genre || rating ) {
    if (premiere_year) {
        filter.premiere_year = { $gt: premiere_year }; 
      }
      if (genre) {
        filter.genre = genre; 
      }
      if (rating) {
        filter.rating = { $gt: rating }; 
      }
    }

    res.send(await tvshow.find(filter));
});

/* get specifix movies by id*/
router.get("/:id", async (req,res) => {
    const onetvshow = await tvshow.findOne({_id: req.params.id})
    res.send(onetvshow);
});

module.exports = router;