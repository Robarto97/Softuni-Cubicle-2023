const router = require("express").Router();

const cubeManager = require("../managers/cubeManager");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: +difficultyLevel,
  });

  res.redirect("/");
});

router.get("/:cubeId/details", (req, res) => {
  const cubeId = req.params.cubeId;
  const currCube = cubeManager.getOne(cubeId);
  res.render("details", { ...currCube });
});

module.exports = router;
