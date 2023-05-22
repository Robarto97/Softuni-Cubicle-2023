const uniqid = require("uniqid");
const cubes = [];

exports.getAll = () => cubes.slice();

exports.create = (cubeData) => {
  const newCube = {
    id: uniqid(),
    ...cubeData,
  };

  cubes.push(newCube);

  return newCube;
};

exports.getOne = (cubeId) => cubes.find((c) => c.id === cubeId);
