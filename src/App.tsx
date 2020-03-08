import React, { useState, useEffect } from 'react'
import './App.css'
import Prefecture from './types/Prefecture'
import getPrefectures from './api/getPrefectures'

const App = () => {
   const [prefectures, setPrefectures] = useState([] as Prefecture[])

   useEffect(() => {
      getPrefectures()
         .then(data => {
            setPrefectures(data.result)
         })
         .catch(e => {
            throw new Error('都道府県を取得できませんでした。')
         })
   }, [])

   return <div>app</div>
}

export default App
