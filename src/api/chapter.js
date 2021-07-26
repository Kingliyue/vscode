import baseUrl from './config'
import http from './http'

export const getChapterList=(courseId)=>{
    let url = baseUrl.getChapterListUrl+`${courseId}`
    return http.get(url)
}
export const saveChapter= (chapter)=>{
    return http.post(baseUrl.addChapter,chapter)
}
export const getChapter = (chapterId)=>{
     let url = baseUrl.getChapter+`${chapterId}`
    return http.get(url)
}
export const updateChapter = chapter =>{
    return http.put(baseUrl.updateChapter,chapter)
}

export const deleteChapter = courseId =>{
    let url = baseUrl.deleteChapter+`${courseId}`
    return http.delete(url)
}