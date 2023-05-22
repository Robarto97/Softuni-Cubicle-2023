const uniqid = require("uniqid");
const cubes = [];

exports.getAll = (search, from, to) => {
  let result = cubes.slice();

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

exports.create = (cubeData) => {
  const newCube = {
    id: uniqid(),
    ...cubeData,
  };

  cubes.push(newCube);

  return newCube;
};

exports.getOne = (cubeId) => cubes.find((c) => c.id === cubeId);
