import { request } from '@/utils/request'
import type { PatientList } from '@/types/paitent'

export const getPatientListAPI = () => {
  return request<PatientList>('/patient/mylist')
}
