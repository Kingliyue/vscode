import http from './http'
import baseUrl from './config'

export const getVideo = videoId =>{
    let url = baseUrl.getVideoUrl+`${videoId}`
    return http.get(url)
}
export const updateVideo = video =>{

    return http.put(baseUrl.updateVideoUrl,video)
} 
export const saveVideo = video =>{
    return http.post(baseUrl.saveVideoUrl,video)
}

export const deleteVideo = videoId =>{
    let url = baseUrl.deleteVideoUrl+`${videoId}`
    return http.delete(url)
} 
export const deleteVod = videoSourceId=>{
    let url =baseUrl.deleteVod+`${videoSourceId}`
    return http.delete(url)
}