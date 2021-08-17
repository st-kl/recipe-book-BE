// undefined path
exports.handleInvalidPath = (req, res) => {
  res.status(404).send({ msg: 'path does not exist' });
};
