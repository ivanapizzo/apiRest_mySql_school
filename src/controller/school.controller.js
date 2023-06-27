const {pool} = require("../database");


// Endpoint Alumnos

async function getStudent (req, res) {

    let sql = `SELECT * FROM students WHERE students_id = ${req.query.students_id};`


    try {

        const [result] = await pool.query(sql);
        res.send(result)

    } 
    catch(err){
        res.send(err);
    }
}


const getStudents = async (req, res) => {


        let sql = "SELECT * FROM students"

        try {
            const [result] = await pool.query(sql)
            res.send(result)
        }

    catch(err) {
        res.send(err);
    }
}

const postStudents = async (req, res) => {

    try 
    {
        console.log(req.body);
        let sql = "INSERT INTO students (first_name, last_name)" +
        "VALUES ('"   + req.body.first_name + "', '" +
                        req.body.last_name + "')";
        console.log(sql);
        let [result] = await pool.query(sql);
        console.log(result);

        if(result.insertId)
            response.send(String(result.insertId));
        else 
            response.send("+1");
        
    }
    catch(err) {
        console.log(err)
    }


}


async function putStudent (req, res) {

    const sql = `UPDATE students
                SET first_name = COALESCE(?, first_name),
                    last_name = COALESCE(?, last_name)
                WHERE students_id`

        const {first_name, last_name, students_id} = req.body;
    
        const params = [
            first_name?     first_name: null,
            last_name?      last_name: null,
            students_id
        ]

    try
    {
        const [result] = await pool.query(sql, params)
        res.send(result);
    }
    catch(err) {
        res.send(err)
    }
}


async function deleteStudent(req, res) {

    let sql = 'DELETE FROM students WHERE students_id = ?;'

    const {students_id} = req.body

    const params = [students_id]

    try
    {
        const [result] = await pool.query(sql, params)
        res.send(result);
    }
    catch(err) {
        res.send(err)
    }
}


// Endpoint asignaturas y notas 

const getMedia = async (req, res) =>{

    let sql = `SELECT AVG(mark) FROM marks
                WHERE students_id=?`;

    const {students_id, mark} = req.body

    const params = [students_id, mark]

                try
                {
                    const [result] = await pool.query(sql, params)
                    res.send(result);
                }
                catch(err) {
                    res.send(err)
                }
} 

const getSubjectById = async (req, res)  => {

    let sql = `SELECT first_name, last_name, 
                title 
                FROM students INNER JOIN courses
                ON (students.course_id = courses.course_id) 
                INNER JOIN subject_teacher ON
                (courses.course_id = subject_teacher.course_id)
                INNER JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)`
            
    const {students_id, course_id, subject_id, title} = req.body

    const params = [students_id, course_id, subject_id, title]

                try
                {
                    const [result] = await pool.query(sql, params)
                    res.send(result);
                }
                catch(err) {
                    res.send(err)
                }
}

const getSubjects = async (req, res) => {

    let sql = `SELECT first_name, last_name, 
                title FROM students INNER JOIN courses ON
                (students.course_id = courses.course_id) 
                INNER JOIN subject_teacher ON
                (courses.course_id = subject_teacher.course_id)
                INNER JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id) `

    const {students_id, course_id, subject_id, title} = req.body

    const params = [students_id, course_id, subject_id, title]
            
                try
                {
                const [result] = await pool.query(sql, params)
                res.send(result);
                }
                catch(err) {
                    res.send(err)
                }
}


const getSubjectOfTeacher = async (req, res) => {

    let sql = `SELECT first_name, last_name, 
                title FROM students 
                INNER JOIN subjects ON
                (students.course_id = subjects.subject_id)
                WHERE students_id=?;`

    const {teacher_id, subject_id, title} = req.body

    const params = [teacher_id, subject_id, title]
            
                try
                {
                const [result] = await pool.query(sql, params)
                res.send(result);
                }
                catch(err) {
                    res.send(err)
                }
}


const getTeachers = async (req, res) => {

    let sql = `SELECT teachers.first_name, teachers.last_name, 
                subjects.title FROM teachers INNER JOIN subject_teacher ON
                (teachers.teacher_id = subject_teacher.teacher_id)
                INNER JOIN subjects ON (subject_teacher.subject_id = 
                subjects.subject_id)`
    
    const {teacher_id, subject_id, title} = req.body

    const params = [teacher_id, subject_id, title]
                        
                try
                {
                const [result] = await pool.query(sql, params)
                res.send(result);
                }
                catch(err) {
                res.send(err)
                }
}




module.exports = {getStudent, getStudents, postStudents, putStudent, deleteStudent, getMedia, getSubjectById, getSubjects, getSubjectOfTeacher, getTeachers}


