const Student = require("../models/studentModel");


// GET STUDENT PROFILE
exports.getStudentProfile = async (req, res) => {

  try {

    const student = await Student.findOne({
      username: req.params.username
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Error loading profile" });

  }

};



// UPDATE STUDENT PROFILE
exports.updateStudentProfile = async (req, res) => {

  try {

    const updatedStudent = await Student.findOneAndUpdate(

      { username: req.params.username },

      req.body,

      { new: true }

    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Error updating profile" });

  }

};