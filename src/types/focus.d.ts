export type FocusAndRecommend = {
  pageTotal: number
  total: number
  rows: [
    {
      id: string
      name: string
      avatar: string
      hospitalName: string
      gradeName: string
      depName: string
      positionalTitles: string
      likeFlag: number
      serviceFee: number
      consultationNum: number
      score: number
      major: string
    }
  ]
}
