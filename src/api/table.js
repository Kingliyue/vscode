import baseURL from './config'
import http from './http'
export const getList=(params,)=> {

  let url
  
  return http.get(teacherList,baseURL,params)
}
