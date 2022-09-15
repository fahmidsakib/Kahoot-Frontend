import React from 'react'
import { QRCodeCanvas } from "qrcode.react";
import { useParams } from 'react-router-dom';
const BASE_URL = 'http://localhost:3000'

export default function PlayQuiz() {

  let {quizId, roomId} = useParams()

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={`${BASE_URL}/play-quiz/${quizId}/${roomId}`}
      size={300}
      bgColor={"#ffffff"}
      level={"L"}
    />
  );

  return (
    <div className="PlayQuiz">
      <div>{qrcode}</div>
    </div>
  )
}
