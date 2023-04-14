import { request } from '@/utils/request'
import type { AddressList, Address, AddressDetail, LogisticsInfo, PayInfo } from '@/types/order'

//查询收货地址列表
export const queryAddressListAPI = () => request<AddressList>('/patient/order/address', 'get')

//修改收货地址
export const changeAddressAPI = (id: string, data: Address) =>
  request<{ id: string }>(`/patient/order/address/${id}`, 'put', data)

// 删除收货地址信息
export const delAddressAPI = (id: string) =>
  request<{ id: string }>(`/patient/order/address/${id}`, 'DELETE')

// 取消订单
export const cancelOrderAPI = (id: string) => request<{}>(`/patient/order/cancel/${id}`, 'put')

//删除订单
export const delOrderAPI = (id: string) => request<undefined>(`/patient/order/${id}`, 'delete')

// 查询收货地址详情
export const queryAddressAPI = (id: string) =>
  request<AddressDetail>(`/patient/order/address/${id}`, 'get')

// 查询物流信息
export const queryLogisticsInfoAPI = (id: string) =>
  request<LogisticsInfo>(`/patient/order/${id}/logistics`, 'get')

//添加收货地址
export const addAddressAPI = (data: Address) =>
  request<{ id: string }>(`/patient/order/address`, 'post', data)

//模拟发货信息-生成物流信息
export const mockConsignmentAPI = (id: string) =>
  request<{ id: string }>(`/patient/mockConsignment/${id}`, 'get')

// 支付
export const payAPI = (data: PayInfo) =>
  request<{ payUrl: string }>(`/patient/consult/pay`, 'post', data)
