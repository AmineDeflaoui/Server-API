const handleSignIn = (req, res, DB, bcrypt) => {
  const respondArraySignIn = [];
  req.body.email === "" || !req.body.email.includes("@")
    ? (respondArraySignIn[0] = true)
    : (respondArraySignIn[0] = false);
  req.body.password === ""
    ? (respondArraySignIn[1] = true)
    : (respondArraySignIn[1] = false);

  if (respondArraySignIn[0] === false && respondArraySignIn[1] === false) {
    DB.select("*")
      .from("login")
      .where({ email: req.body.email })
      .returning("*")
      .then((user) =>
        !user.length
          ? res
              .status(400)
              .json(" email : The Combinaison email/password is Wrong !")
          : bcrypt.compare(
              req.body.password,
              user[0].hash,
              function (err, result) {
                // console.log(user[0], req.body.password, err, result);
                result === false
                  ? res
                      .status(400)
                      .json(
                        " password : The Combinaison email/password is Wrong !"
                      )
                  : DB.select("*")
                      .from("users")
                      .where("email", req.body.email)
                      .returning("*")
                      .then((user) => res.status(200).json(user))
                      .catch((err) =>
                        res.status(400).json("Something Wrong Happend !")
                      );
              }
            )
      )
      .catch((err) => res.status(400).json("Something Wrong happend !"));
  } else {
    res.json(respondArraySignIn);
  }
};

module.exports = {
  handleSignIn,
};
