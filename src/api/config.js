const eduBaseUrl = "http://localhost:8001";
const ossBaseUrl = "http://localhost:8002";
const config ={
    //edu
    loginUrl :eduBaseUrl+"/edu/teacher/user/login",
    infoUrl :  eduBaseUrl+"/edu/teacher/user/info",
    teacherList: eduBaseUrl+"/edu/teacher/query",
    deleteTeacher: eduBaseUrl+"/edu/teacher/delete",
    addTeacher: eduBaseUrl+" /edu/teacher/addTeacher",
    updateTeacher: eduBaseUrl+"/edu/teacher/updateTeacher",
    getTeacher: eduBaseUrl+"/edu/teacher/getTeacher",
    getTeacherList: eduBaseUrl+"/edu/teacher/list",
    //oss
    ossUpload:ossBaseUrl+"/oss/upload",
    
    //subject
    subjectList:eduBaseUrl+'/edu/subject/list'

} 
export default config

