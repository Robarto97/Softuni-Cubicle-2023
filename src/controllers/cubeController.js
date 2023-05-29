const router = require("express").Router();

const cubeManager = require("../managers/cubeManager");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: +difficultyLevel,
  });

  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const cubeId = req.params.cubeId;
  const currCube = await cubeManager.getOne(cubeId).lean();

  if (!currCube) {
    return res.redirect("/404");
  }

  res.render("details", { ...currCube });
});

module.exports = router;
