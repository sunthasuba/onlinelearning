const { validationResult } = require('express-validator');
const Enrollment = require('../models/Enrollment');

exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('studentId courseId');
    res.json(enrollments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createEnrollment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { studentId, courseId } = req.body;

  try {
    const newEnrollment = new Enrollment({ studentId, courseId });
    await newEnrollment.save();
    res.json(newEnrollment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Additional CRUD operations...

exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('studentId courseId');
    if (!enrollment) {
      return res.status(404).json({ msg: 'Enrollment not found' });
    }
    res.json(enrollment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateEnrollment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { studentId, courseId } = req.body;

  try {
    let enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ msg: 'Enrollment not found' });
    }

    enrollment.studentId = studentId;
    enrollment.courseId = courseId;

    await enrollment.save();
    res.json(enrollment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ msg: 'Enrollment not found' });
    }
    await enrollment.remove();
    res.json({ msg: 'Enrollment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
