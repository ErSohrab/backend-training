const supabase = require("../config/supabase");

const generateStudentId = () => {
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `student-${randomNumber}`;
};

const createStudent = async (studentData) => {
  const student_id = generateStudentId();

  const { data: newStudent, error: insertError } = await supabase
    .from("students")
    .insert([
      {
        student_id,
        ...studentData,
      },
    ])
    .select()
    .single();

  if (insertError) {
    throw insertError;
  }

  return newStudent;
};

const getAllStudents = async () => {
  const { data: students, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return students;
};

const getStudentById = async (studentId) => {
  const { data: student, error } = await supabase
    .from("students")
    .select("*")
    .eq("student_id", studentId)
    .single();

  if (error || !student) {
    throw new Error("Student not found");
  }

  return student;
};

const updateStudent = async (studentId, updateData) => {
  const { data: updatedStudent, error } = await supabase
    .from("students")
    .update(updateData)
    .eq("student_id", studentId)
    .select()
    .single();

  if (error || !updatedStudent) {
    throw new Error("Student not found or update failed");
  }

  return updatedStudent;
};

const deleteStudent = async (studentId) => {
  const { data: deletedStudent, error } = await supabase
    .from("students")
    .delete()
    .eq("student_id", studentId)
    .select()
    .single();

  if (error || !deletedStudent) {
    throw new Error("Student not found or delete failed");
  }

  return deletedStudent;
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
