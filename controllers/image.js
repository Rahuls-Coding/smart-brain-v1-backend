const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "c86133ebdbf34ed7b39b8275595c2056"
  })

  const handleAPICall = (req, res) => {
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {res.json(data)})
        .catch(err => {res.status(400).json("unable to get data")})
  }


const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
         res.json(entries[0].entries)
      })
      .catch(err => {res.status(400).json("unable to get entries")})
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
} 