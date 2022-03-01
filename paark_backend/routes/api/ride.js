const router = require("express").Router();
const Ride = require("../../models/ride");

const test = [
  {
    id: 0,
    firstname: "Mila",
    tel: "0624557510",
    dropOffLocation: "1 place du frommage",
    dropOffTime: "16h00",
    status: "Pris en charge",
  },
  {
    id: 1,
    firstname: "Pistache",
    tel: "0624557510",
    dropOffLocation: "5 rue des pistaches",
    dropOffTime: "14h00",
    status: "En chemin",
  },
  {
    id: 2,
    firstname: "Grizou",
    tel: "0624557510",
    dropOffLocation: "24 rue du sommeil",
    dropOffTime: "13h30",
    status: "En chemin",
  },
  {
    id: 3,
    firstname: "Scarlett",
    tel: "0624557510",
    dropOffLocation: "2 rue des relous",
    dropOffTime: "20h40",
    status: "Terminée",
  },
  {
    id: 4,
    firstname: "Django",
    tel: "0624557510",
    dropOffLocation: "place de la boulangerie",
    dropOffTime: "18hh10",
    status: "Enregistré",
  },
  {
    id: 6,
    firstname: "Hermione",
    tel: "0624557510",
    dropOffLocation: "2 rue des relous",
    dropOffTime: "22h00",
    status: "En chemin",
  },
  {
    id: 5,
    firstname: "Guapo",
    tel: "0624557510",
    dropOffLocation: "1 place dou brazil",
    dropOffTime: "8h00",
    status: "Pris en charge",
  },
];

router.get("/rides", async (req, res) => {
  res.status(200).json({ test });
});
router.get("/ride/:id", async (req, res) => {});

module.exports = router;
