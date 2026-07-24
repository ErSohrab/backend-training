import supabase from "../config/supabase";

interface Student {
  student_id: string;
  name: string;
  email: string;
  age?: number;
  grade?: string;
  created_at: string;
  updated_at: string;
}

interface StudentData {
  name: string;
  email: string;
  age?: number;
  grade?: string;
}

const generateStudentId = (): string => {
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `STU${randomNumber}`
};

const createStudent = async (studentData: StudentData): Promise<Student> => {
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

  return newStudent as Student;
};

const getAllStudents = async (): Promise<Student[]> => {
  const { data: students, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return students as Student[];
};

const getStudentById = async (studentId: string): Promise<Student> => {
  const { data: student, error } = await supabase
    .from("students")
    .select("*")
    .eq("student_id", studentId)
    .single();

  if (error || !student) {
    throw new Error("Student not found");
  }

  return student as Student;
};

const updateStudent = async (
  studentId: string,
  updateData: Partial<StudentData>
): Promise<Student> => {
  const { data: updatedStudent, error } = await supabase
    .from("students")
    .update(updateData)
    .eq("student_id", studentId)
    .select()
    .single();

  if (error || !updatedStudent) {
    throw new Error("Student not found or update failed");
  }

  return updatedStudent as Student;
};

const deleteStudent = async (studentId: string): Promise<Student> => {
  const { data: deletedStudent, error } = await supabase
    .from("students")
    .delete()
    .eq("student_id", studentId)
    .select()
    .single();

  if (error || !deletedStudent) {
    throw new Error("Student not found or delete failed");
  }

  return deletedStudent as Student;
};

export {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
