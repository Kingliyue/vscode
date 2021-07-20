import baseUrl from './config'
import http from './http'

export const getChapter=()=>{
    
    return http.get(baseUrl.getChapterUrl)
}
export const saveChapter= (chapter)=>{
    return http.post(baseUrl.saveChapter,chapter)
}