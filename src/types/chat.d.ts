export type SendChatMsg = {
  from: string
  to: string
  msgType: number
  msg: {
    content: string
    picture: {
      id: string
      url: string
    }
  }
}

export type ReceiveChatMsg = {
  id: string
  from: string
  fromAvatar: string
  to: string
  toAvatar: string
  msgType: number
  createTime: string
  msg: {
    consultRecord: {
      id: string
      orderNo: string
      type: number
      createTime: string
      illnessDesc: string
      illnessTime: number
      consultFlag: number
      liverFunction: number
      renalFunction: number
      allergicHistory: number
      fertilityStatus: number
      pictures: [
        {
          id: string
          url: string
        }
      ]
      patientInfo: {
        id: string
        name: string
        idCard: string
        gender: number
        genderValue: string
        age: string
      }
      medicines: [
        {
          id: string
          name: string
          specs: string
          usageDosag: string
          quantity: number
        }
      ]
    }
    prescription: {
      id: string
      createTime: string
      name: string
      recordId: string
      gender: number
      genderValue: string
      age: number
      diagnosis: string
      status: 1
      medicines: [
        {
          id: string
          name: string
          amount: string
          avatar: string
          specs: string
          usageDosag: string
          prescriptionFlag: number
          quantity: number
        }
      ]
      orderId: string
    }
    content: string
    picture: {
      id: string
      url: string
    }
    evaluateDoc: {
      id: string
      score: number
      content: string
      createTime: string
      creator: string
    }
  }
}
