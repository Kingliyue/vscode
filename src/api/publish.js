import http from './http'
import baseUrl  from  './config'

export const getCourseInfo = courseId =>{
    let url = baseUrl.getCourseInfo+`${courseId}`
    return http.get(url)
}
export const updateCoursePublish = courseId =>{
    let url = baseUrl.updateCoursePublish+`${courseId}`
    return http.put(url)
}