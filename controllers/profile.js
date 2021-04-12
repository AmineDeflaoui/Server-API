const handleProfile = (req, res, DB) => {
  const { id } = req.params;
  DB.select("*")
    .from("users")
    .where("id", id)
    .then((user) => {
      if (user.length) {
        res.status(200).json(user[0]);
      } else {
        res.status(400).json("Not Found !");
      }
    })
    .catch((err) => res.status(400).json("Error getting user"));
};

module.exports = {
  handleProfile,
};
