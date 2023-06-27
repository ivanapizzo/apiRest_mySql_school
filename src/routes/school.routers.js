const {Router} = require('express');
const router = Router();
const schoolCtrl = require ('../controller/school.controller')

router.get("/student", schoolCtrl.getStudent); 
router.get("/students", schoolCtrl.getStudents); 
router.post("/students", schoolCtrl.postStudents); 
router.put("/students", schoolCtrl.putStudent); 
router.delete("/students", schoolCtrl.deleteStudent); 

router.get("/media", schoolCtrl.getMedia); 
router.get("/subject", schoolCtrl.getSubjectById); 
router.get("/subjects", schoolCtrl.getSubjects);
router.get("/teacher", schoolCtrl.getSubjectOfTeacher); 
router.get("/teachers", schoolCtrl.getTeachers); 

module.exports = router;
