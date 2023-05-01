import { request } from '@/utils/request'
import type { PatientInfo, PatientList } from '@/types/paitent'

// 获取患者信息列表
export const getPatientListAPI = () => {
  return request<PatientList>('/patient/mylist')
}

//添加患者信息
export const addPatientAPI = (patient: PatientInfo) => request('/patient/add', 'POST', patient)

// 编辑患者信息
export const editPatientAPI = (patient: PatientInfo) => request('/patient/update', 'PUT', patient)

// 删除患者信息
export const delPatientAPI = (id: string) => request(`/patient/del/${id}`, 'DELETE')
