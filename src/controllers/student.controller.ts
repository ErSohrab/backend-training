import { Request, Response } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../services/student.service";

const create = async (req: Request, res: Response): Promise<void> => {
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
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

const getAll = async (req: Request, res: Response): Promise<void> => {
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
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const studentId = Array.isArray(id) ? id[0] : id;
    const student = await getStudentById(studentId);

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Get student by id error:", error);

    if (error instanceof Error && error.message === "Student not found") {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const studentId = Array.isArray(id) ? id[0] : id;
    const student = await updateStudent(studentId, req.body);

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    console.error("Update student error:", error);

    if (error instanceof Error && error.message === "Student not found or update failed") {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const studentId = Array.isArray(id) ? id[0] : id;
    const student = await deleteStudent(studentId);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (error) {
    console.error("Delete student error:", error);

    if (error instanceof Error && error.message === "Student not found or delete failed") {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export {
  create,
  getAll,
  getById,
  update,
  remove,
};
