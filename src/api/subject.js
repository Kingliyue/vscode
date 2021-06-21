import  http from './http'
import baseURL from './config'

export const getSubject=()=>{

    return http.get(baseURL.subjectList)

}    