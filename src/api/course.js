import http from '@/utils/request'
import baseUrl from '@/api/config'
//保存课程基本信息
export const saveCourse = (CourseInfo)=>{ 
    return http.post(baseUrl.addCourse,CourseInfo)
}
//根据课程ID获取
export const getCourse =(CourseId)=>{
    return http.get(baseUrl.getCourse,CourseId)
}