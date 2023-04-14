export type OrderInfo = {
  paidNumber: number
  receivedNumber: number
  shippedNumber: number
  finishedNumber: number
}

export type AddressList = [
  {
    id: string
    receiver: string
    addressDetail: string
    isDefault: 0 | 1
    mobile: string
    province: string
    city: string
    county: string
  }
]

export type Address = {
  receiver: '测试' | string
  mobile: string
  provinceCode: string
  cityCode: string
  countyCode: string
  addressDetail: string
  isDefault: 0 | 1
}

export type AddressDetail = {
  id: string
  receiver: string
  provinceCode: string
  cityCode: string
  countyCode: string
  addressDetail: string
  isDefault: 0 | 1
  mobile: string
  province: string
  city: string
  county: string
}

export type LogisticsInfo = {
  estimatedTime: string
  name: integer
  awbNo: string
  status: string
  statusValue: string
  currentLocationInfo: {
    latitude: string
    longitude: string
  }
  logisticsInfo: [
    {
      latitude: string
      longitude: string
    }
  ]
  list: [
    {
      id: string
      content: string
      createTime: string
      status: string
      statusValue: string
    }
  ]
}

export type PayInfo = {
  paymentMethod: string
  orderId: string
  payCallback: string
}
