const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../services/student.service");

const create = async (req, res) => {
  try {
    const student = await createStudent(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    console.error("Create student error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const students = await getAllStudents();

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Get all students error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await getStudentById(id);

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Get student by id error:", error);

    if (error.message === "Student not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await updateStudent(id, req.body);

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    console.error("Update student error:", error);

    if (error.message === "Student not found or update failed") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await deleteStudent(id);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (error) {
    console.error("Delete student error:", error);

    if (error.message === "Student not found or delete failed") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
