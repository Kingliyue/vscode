import baseUrl from './config'
import http from './http'

export const getChapter=()=>{
    
    return http.get(baseUrl.getChapterUrl)
}