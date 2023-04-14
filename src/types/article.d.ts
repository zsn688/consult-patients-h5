export type ArticleList = {
  pageTotal: number //总页数
  total: number //总条数
  rows: [
    {
      title: string //文章标题
      id: string //文章id
      coverUrl: array[string] //封面地址
      topics: array[string] //百科关联的话题
      collectionNumber: number //收藏数量
      commentNumber: number //评论数量
      creatorName: string //创建人姓名
      creatorAvatar: string //创建人头像
      creatorHospatalName: string //创建人医院
      creatorDep: string //创建人科室
      creatorTitles: string //创建人职称
      likeFlag: number //是否关注0未关注1关注
      content: string //内容详情
      creatorId: string //创建人id
    }
  ]
}
