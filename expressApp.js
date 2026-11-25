
const express = require('express');
const app = express();

app.use(express.json());

let patients = [
    { id: 1, name: "Amit Kumar", age: 35, disease: "Fever", doctorName: "Dr. Sharma" },
    { id: 2, name: "Riya", age: 25, disease: "Cold", doctorName: "Dr. Verma" },
    { id: 3, name: "Rahul", age: 40, disease: "Diabetes", doctorName: "Dr. Singh" }
];

// GET - All patients
app.get('/patients', (req, res) => {
    res.json(patients);
});

// GET - Patient by ID
app.get('/patients/:id', (req, res) => {
    const patient = patients.find(p => p.id == req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
});

// POST - Add patient
app.post('/patients', (req, res) => {
    const patient = req.body;
    patients.push(patient);
    res.status(201).json({
        message: "Patient added successfully",
        patient
    });
});

// PUT - Update patient
app.put('/patients/:id', (req, res) => {
    const patient = patients.find(p => p.id == req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    Object.assign(patient, req.body);
    res.json({ message: "Patient updated successfully", patient });
});

// DELETE - Delete patient
app.delete('/patients/:id', (req, res) => {
    const index = patients.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: "Patient not found" });

    patients.splice(index, 1);
    res.json({ message: "Patient deleted successfully" });
});

app.listen(4000, () => {
    console.log("Express Server running at http://localhost:4000");
});
