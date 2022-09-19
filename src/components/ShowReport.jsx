import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from './Loading'

export default function ShowReport() {


  let goto = useNavigate()
  let { reportId } = useParams()
  let { allReports } = useSelector(state => state.quizSlice)
  let [resArr, setResArr] = useState([])
  let [totalQue, setTotalQue] = useState(0)
  let [report, setReport] = useState(null)


  let findResArr = () => {
    let index = allReports.findIndex(report => report._id === reportId)
    setResArr(allReports[index].result)
    setTotalQue(allReports[index].totalQue)
    setReport(allReports[index])
  }

  useEffect(() => {
    findResArr()
    // eslint-disable-next-line
  }, [])

  return report === null ? <div className="MiddlePoint"><Loading /></div> :
    <div className="Home">
      <div className="header">
        <Link to="/home" className="link"><p className="logo">K A H O O T!</p></Link>
        <button onClick={() => goto('/home')} className="signout">Back</button>
      </div>
      <div className="box">
        <p className="text-box">Quiz taken by: {report.teacherId.name}</p>
        <p className="text-box">Total Student: {report.result.length}</p>
        <p className="time">Quiz taken at: { new Date(report.createdAt).toLocaleString() }</p>
      </div>
      <div className="sp-container1">
        <div className="players">
          {resArr.length > 0 &&
            resArr.map((student, index) =>
              <div className="std-card">
                <p className="name">{index + 1}</p>
                <p className="name">{student.name}</p>
                <p className="name">{student.score}/{totalQue}</p>
              </div>)
          }
        </div>
      </div>
    </div>
}
