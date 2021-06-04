import http from './http' 
import baseURL from './config'

export const login=(username,password) =>{
    let user ={username,password}

return http.post(baseURL.loginUrl,user)
}

export const getInfo=(token) =>{

  let url =baseURL.infoUrl+`/${token}`
  return http.get(url,null,null)

}

export const logout=()=> {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
