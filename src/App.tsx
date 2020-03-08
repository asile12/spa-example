import React, { useState, useEffect } from 'react'
import Prefecture from './types/Prefecture'
import getPrefectures from './api/getPrefectures'
import getPopulation from './api/getPopulation'

const App = () => {
   const [prefectures, setPrefectures] = useState([] as Prefecture[])

   useEffect(() => {
      getPrefectures()
         .then(data => {
            setPrefectures(data)
         })
         .catch(() => {
            throw new Error('都道府県を取得できませんでした。')
         })
   }, [])

   useEffect(() => {
      getPopulation(11)
         .then(data => {
            console.log(data)
         })
         .catch(() => {
            throw new Error('人口数を取得できませんでした。')
         })
   }, [])

   return <div>app</div>
}

export default App
