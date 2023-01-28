const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Personne collection
const personneSchema = new mongoose.Schema({
  num_identifiant_national: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  sexe: { type: String, required: true },
  date_naissance: { type: Date, required: true },
  heure_naissance: { type: String, required: true },
  lieu_naissance: { type: String, required: true },
  commune_naissance: { type: String, required: true },
  wilaya_naissance: { type: String, required: true },
  pays_naissance: { type: String, default: "Algerie", required: true },
  etat_matrimonial: { type: String, default: " " },
  commune_residence: { type: String, required: true },
  num_pere: { type: String, required: true },
  num_mere: { type: String, required: true },
  profession: { type: String, default: " " },
});
// NIN : starts from 100000000000000000

// Create the model for the Personne collection
const Personne = mongoose.model("Personne", personneSchema);

function validatePersonne(personne) {
  const schema = Joi.object({
    num_identifiant_national: Joi.string().min(5).max(255).required(),
    nom: Joi.string()
      .min(3)
      .max(255)
      .regex(/^[a-zA-Z]+$/)
      .required(),
    prenom: Joi.string()
      .min(3)
      .max(255)
      .regex(/^[a-zA-Z]+$/)
      .required(),
    sexe: Joi.string().min(3).max(10).required(),
    date_naissance: Joi.date().required(),
    heure_naissance: Joi.string().max(255).required(),
    lieu_naissance: Joi.string().min(5).max(255).required(),
    commune_naissance: Joi.string().min(5).max(255).required(),
    wilaya_naissance: Joi.string().min(5).max(255).required(),
    pays_naissance: Joi.string().min(5).max(255).required(),
    etat_matrimonial: Joi.string().max(255),
    commune_residence: Joi.string().min(3).max(255).required(),
    num_pere: Joi.string().min(1).max(255).required(),
    num_mere: Joi.string().min(1).max(255).required(),
    profession: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .max(255),
  });

  return schema.validate(personne);
}

exports.Personne = Personne;
exports.validatePersonne = validatePersonne;
