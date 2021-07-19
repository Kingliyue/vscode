import http from '@/utils/request'
import baseUrl from '@/api/config'

//保存课程基本信息
export const saveCourse = (CourseInfo)=>{ 
    return http.post(baseUrl.addCourse,CourseInfo)
}
//根据课程ID获取
export const getCourse =(CourseId)=>{
    let  url = baseUrl.getCourse+`${CourseId}`
    return http.get(url)
}
//根据courseID更新课程信息
export const  updateCourse = (CourseVo)=>{
    return http.update(baseUrl.updateCourse,CourseVo)
}