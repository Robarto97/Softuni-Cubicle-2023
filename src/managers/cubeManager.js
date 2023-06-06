const Cube = require("../models/Cube");

exports.getAll = async (search, from, to) => {
  let result = await Cube.find().lean();

  if (search) {
    result = result.filter((cube) =>
      cube.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (from) {
    result = result.filter((cube) => cube.difficultyLevel >= +from);
  }

  if (to) {
    result = result.filter((cube) => cube.difficultyLevel <= +to);
  }

  return result;
};

exports.create = async (cubeData) => {
  const cube = new Cube(cubeData);

  await cube.save();

  return cube;
};

exports.getOne = (cubeId) => Cube.findById(cubeId).populate("accessories");

exports.attachAccessory = async (cubeId, accessoryId) => {
  return Cube.findByIdAndUpdate(cubeId, {
    $push: { accessories: accessoryId },
  });
};

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);

exports.update = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData);
