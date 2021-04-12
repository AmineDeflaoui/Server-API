const deepai = require("deepai");

const handleDeepAi = async (req, res) => {
  deepai.setApiKey("3c46a7b1-8121-4941-863a-3c2b1c4e857a");
  let resp = await deepai.callStandardApi("facial-recognition", {
    image: req.body.url,
  });
  res.status(200).json(resp);
};

module.exports = {
  handleDeepAi,
};
