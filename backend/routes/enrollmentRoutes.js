const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { getEnrollments, createEnrollment, getEnrollment, updateEnrollment, deleteEnrollment } = require('../controllers/enrollmentController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: List of enrollments
 */
router.get('/', getEnrollments);

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - courseId
 *             properties:
 *               studentId:
 *                 type: string
 *               courseId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Enrollment created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', [
  auth,
  check('studentId', 'Student ID is required').not().isEmpty(),
  check('courseId', 'Course ID is required').not().isEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  createEnrollment(req, res);
});

/**
 * @swagger
 * /api/enrollments/{id}:
 *   get:
 *     summary: Get an enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment details
 *       404:
 *         description: Enrollment not found
 */
router.get('/:id', getEnrollment);

/**
 * @swagger
 * /api/enrollments/{id}:
 *   put:
 *     summary: Update an enrollment
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enrollment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - courseId
 *             properties:
 *               studentId:
 *                 type: string
 *               courseId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Enrollment updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Enrollment not found
 */
router.put('/:id', [
  auth,
  check('studentId', 'Student ID is required').not().isEmpty(),
  check('courseId', 'Course ID is required').not().isEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  updateEnrollment(req, res);
});

/**
 * @swagger
 * /api/enrollments/{id}:
 *   delete:
 *     summary: Delete an enrollment
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 *       404:
 *         description: Enrollment not found
 */
router.delete('/:id', auth, deleteEnrollment);

module.exports = router;
