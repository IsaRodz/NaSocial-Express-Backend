const notesController = {};
const Notes = require("../models/Note");

notesController.getNotes = async (req, res) => {
    const notes = await Notes.find();
    res.json(notes);
};

notesController.getNote = async (req, res) => {
    const note = await Notes.findById(req.params.id);
    res.json(note);
};

notesController.createNote = async (req, res) => {
    const { title, content, author } = req.body;
    const newNote = Notes({ title, content, author });
    await newNote.save();

    res.json({
        message: "Note created successfully",
        note: newNote,
    });
};

notesController.updateNote = async (req, res) => {
    const note = await Notes.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.json({ message: "Note updated", note });
};

notesController.deleteNote = async (req, res) => {
    await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
};

module.exports = notesController;
