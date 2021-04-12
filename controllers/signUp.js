const handleSignUp = (req, res, DB, bcrypt, saltRounds) => {
  const respondArraySignUp = [];
  req.body.username === ""
    ? (respondArraySignUp[0] = true)
    : (respondArraySignUp[0] = false);
  req.body.email === "" || !req.body.email.includes("@")
    ? (respondArraySignUp[1] = true)
    : (respondArraySignUp[1] = false);
  req.body.password === ""
    ? (respondArraySignUp[2] = true)
    : (respondArraySignUp[2] = false);

  if (
    respondArraySignUp[0] === false &&
    respondArraySignUp[1] === false &&
    respondArraySignUp[2] === false
  ) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      err
        ? alert("Error Occured : ", err)
        : DB.transaction((trx) => {
            trx
              .insert({ email: req.body.email, hash: hash })
              .into("login")
              .returning("email")
              .then((loginEmail) => {
                trx("users")
                  .insert({
                    email: loginEmail[0],
                    name: req.body.username,
                    joined: new Date(),
                  })
                  .returning("*")
                  .then((user) => res.status(200).json(user))
                  .catch((err) => res.status(400).json("unable to register !"));
              })
              .then(trx.commit)
              .catch((err) => {
                trx.rollback();
                res
                  .status(400)
                  .json("You can't register, this user already exists");
              });
          });
    });
  } else {
    res.json(respondArraySignUp);
  }
};

module.exports = {
  handleSignUp,
};
