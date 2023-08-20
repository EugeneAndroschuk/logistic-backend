const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Set code"],
    },
    name: {
      type: String,
      required: [true, "Set name"],
    },
    comments: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: false }
);

const Client = model("client", clientSchema);

module.exports = Client;
