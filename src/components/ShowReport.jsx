import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function ShowReport() {


  let goto = useNavigate()
  let { reportId } = useParams()
  let { allReports } = useSelector(state => state.quizSlice)
  let [resArr, setResArr] = useState([])
  let [totalQue, setTotalQue] = useState(0)


  let findResArr = () => {
    let index = allReports.findIndex(report => report._id === reportId)
    setResArr(allReports[index].result)
    setTotalQue(allReports[index].totalQue)
  }

  useEffect(() => {
    findResArr()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="Home">

      <div className="header">
        <Link to="/home" className="link"><p className="logo">K A H O O T!</p></Link>
        <button onClick={() => goto('/home')} className="signout">Back</button>
      </div>

      <div className="sp-container">
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
  )
}
