//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: String,
    ocupation: String,
    catchPhrase: String,
    movies: [{ type: Schema.Types.ObjectId, ref: "Movies" }]
  },
  {
    timestamps: true
  }
);

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
