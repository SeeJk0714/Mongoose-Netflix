const express = require("express");
const router = express.Router();

// import model into router
const Tvshow = require("../models/tvshow");

/* list all the movies */
router.get("/", async (req,res) => {
    const { premiere_year, genre, rating } = req.query;
    let filter = {};
    if (premiere_year || genre || rating ) {
    if (premiere_year) {
        filter.premiere_year = { $gt: premiere_year }; 
      }
      if (genre) {
        filter.genre = { $in: genre.split(",") }; 
      }
      if (rating) {
        filter.rating = { $gt: rating }; 
      }
    }

    res.send(await Tvshow.find(filter));
});

/* get specifix movies by id*/
router.get("/:id", async (req,res) => {
    const onetvshow = await Tvshow.findOne({_id: req.params.id})
    res.send(onetvshow);
});

router.post("/", async (req, res) => {
  const newTvshow = new Tvshow({
    title: req.body.title,
    creator:  req.body.creator,
    premiere_year:  req.body.premiere_year,
    end_year:  req.body.end_year,
    seasons:  req.body.seasons,
    genre:  req.body.genre,
    rating:  req.body.rating,
  });
  await newTvshow.save();
  res.send(newTvshow);
});

router.put("/:id", async (req,res) => {
  const tvshow_id = req.params.id;
  const updatedTvshow = await Tvshow.findByIdAndUpdate(tvshow_id, req.body, {
    new: true, 
  });
  res.send(updatedTvshow);
});

router.delete("/:id", async(req,res) => {
  const tvshow_id = req.params.id;
  const deletedTvshow = await Tvshow.findByIdAndDelete(tvshow_id);
  res.send(deletedTvshow);
 });

module.exports = router;