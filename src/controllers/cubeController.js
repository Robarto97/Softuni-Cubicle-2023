const router = require("express").Router();

const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");

router.get("/create", (req, res) => {
  res.render("cube/create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: +difficultyLevel,
    owner: req.user._id,
  });

  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const cubeId = req.params.cubeId;
  const currCube = await cubeManager.getOne(cubeId).lean();

  if (!currCube) {
    return res.redirect("/404");
  }

  res.render("cube/details", { currCube });
});

router.get("/:cubeId/attach-accessory", async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  const accessories = await accessoryManager.getOthers(cube.accessories).lean();

  const hasAccessories = accessories.length > 0;

  res.render("accessory/attach", { ...cube, accessories, hasAccessories });
});

router.post("/:cubeId/attach-accessory", async (req, res) => {
  const { accessory } = req.body;
  const cubeId = req.params.cubeId;

  await cubeManager.attachAccessory(cubeId, accessory);

  res.redirect(`/cubes/${cubeId}/details`);
});

router.get("/:cubeId/delete", async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  res.render("cube/delete", { cube });
});

router.post("/:cubeId/delete", async (req, res) => {
  await cubeManager.delete(req.params.cubeId);

  res.redirect("/");
});

router.get("/:cubeId/edit", async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();

  res.render("cube/edit", { cube });
});

router.post("/:cubeId/edit", async (req, res) => {
  const cubeData = req.body;

  await cubeManager.update(req.params.cubeId, cubeData);

  res.redirect(`/cubes/${req.params.cubeId}/details`);
});

module.exports = router;
