


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
    subjectList:eduBaseUrl+'/edu/subject/list',
    //course
    addCourse:eduBaseUrl+'/edu/course/addCourse',
    getCourse:eduBaseUrl+'/edu/course/getCourse/',
    updateCourse:eduBaseUrl+'/edu/course/update',
    getCourseList:eduBaseUrl+'/edu/course/getCourseList/',
    deleteCourse:eduBaseUrl+'/edu/course/deleteCourse/',
    //publish
    getCourseInfo:eduBaseUrl + '/edu/course/getCourseInfo/',
    updateCoursePublish:eduBaseUrl+ '/edu/course/updateStatus/',
    //chapter
    getChapterListUrl: eduBaseUrl+'/edu/chapter/getChapterAndVideo/',
    addChapter:eduBaseUrl+'/edu/chapter/saveChapter',
    getChapter:eduBaseUrl+'/edu/chapter/getChapter/',
    updateChapter:eduBaseUrl+'/edu/chapter/updateChapter',
    deleteChapter:eduBaseUrl+'/edu/chapter/deleteChapter/',
    //video
    getVideoUrl:eduBaseUrl+'/edu/video/getVideo/',
    saveVideoUrl:eduBaseUrl+'/edu/video/saveVideo',
    updateVideoUrl:eduBaseUrl+'/edu/video/updateVideo',
    deleteVideoUrl:eduBaseUrl+'/edu/video/deleteVideo/',

} 
export default config

