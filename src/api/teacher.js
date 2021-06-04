import http from "./http";
import baseURL from "./config";

export const getList = (current, size, queryTeacher) => {
  let url = baseURL.teacherList + `/${current}/${size}`;
  console.log(queryTeacher);
  return http.post(url, queryTeacher);
};
export const deleteTeacher = id => {
  let url = baseURL.deleteTeacher + `/${id}`;

  return http.delete(url);
};
export const addTeacher = addTeacher => {
  return http.post(baseURL.addTeacher, addTeacher);
};
export const getTeacher = id => {
  let url = baseURL.getTeacher + `/${id}`;
  return http.get(url);
};
export const updateTeacher = updateTeacher => {
      console.log(updateTeacher);
  return http.put(baseURL.updateTeacher, updateTeacher);
};
