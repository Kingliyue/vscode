import http from '@/utils/request'
import baseUrl from '@/api/config'
export const saveCourse = (CourseInfo)=>{ 
    return http.post(baseUrl.addCourse,CourseInfo)
}