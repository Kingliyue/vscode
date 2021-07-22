import baseUrl from './config'
import http from './http'

export const getChapterList=()=>{
    
    return http.get(baseUrl.getChapterUrl)
}
export const saveChapter= (chapter)=>{
    return http.post(baseUrl.saveChapter,chapter)
}
export const getChapter = (chapterId)=>{
     let url = baseUrl.getChapter+`${chapterId}`
    return http.get(url)
}
export const updateChapter = chapter =>{
    return http.put(baseUrl.updateChapter,chapter)
}