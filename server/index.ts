import cors from 'cors'
import express from 'express'

const app = express()

// 使用 cors 中间件
app.use(cors())

app.get('/data', function (req, res) {
  res.send([
    { name: '小红', sex: '男', birthday: new Date('1994-07-07').getTime() },
    { name: '小黄', sex: '男', birthday: new Date('1995-06-06').getTime() },
    { name: '小蓝', sex: '女', birthday: new Date('1996-08-08').getTime() },
  ])
})

app.listen(3000)
