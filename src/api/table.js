import baseURL from './config'
import http from './http'
export const getList=(params,)=> {
  
  return http.get(teacherList,baseURL,params)
}
