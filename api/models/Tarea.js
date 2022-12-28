const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creo el schema para la db
const TareaSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

//Creo modelo
const Tarea = mongoose.model("Tarea", TareaSchema);

//Exporto el modelo
module.exports = Tarea;
