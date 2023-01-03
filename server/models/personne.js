const mongoose = require("mongoose");
const Joi = require("joi");
const { string } = require("joi");

// Define the schema for the Personne collection
const personneSchema = new mongoose.Schema({
  num_identifiant_national: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  sexe: { type: String, required: true },
  date_naissance: { type: Date, required: true },
  heure_naissance: { type: String, required: true },
  vile_naissance: { type: String, required: true },
  pays_naissance: { type: String, required: true },
  etat_matrimonial: { type: String, required: true },
  conjoint: { type: String },
  commune_residence: { type: String, required: true },
  num_pere: { type: String },
  num_mere: { type: String },
  profession: { type: String, required: false },
});
// NIN : starts from 100000000000000000

// Create the model for the Personne collection
const Personne = mongoose.model("Personne", personneSchema);

function validatePersonne(personne) {
  const schema = Joi.object({
    num_identifiant_national: string().min(5).max(255).required(),
    nom: string().min(3).max(255).required(),
    prenom: string().min(3).max(255).required(),
    sexe: string().min(3).max(10).required(),
    date_naissance: date().required(),
    heure_naissance: string().min(5).max(255).required(),
    vile_naissance: string().min(5).max(255).required(),
    pays_naissance: string().min(5).max(255).required(),
    etat_matrimonial: string().min(5).max(255).required(),
    conjoint: string().min(3).max(255),
    commune_residence: string().min(3).max(255).required(),
    num_pere: string().min(5).max(255).required(),
    num_mere: string().min(5).max(255).required(),
    profession: string().min(5).max(255).required(),
  });

  return schema.validate(personne);
}

exports.Personne = Personne;
exports.personneSchema = personneSchema;
exports.validatePersonne = validatePersonne;
