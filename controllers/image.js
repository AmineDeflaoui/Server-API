const handleImage = (req, res, DB) => {
  const { id } = req.body;
  DB("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.status(200).json(entries[0]))
    .catch((err) => res.status(400).json("unable to get entries !"));
};

module.exports = {
  handleImage,
};
