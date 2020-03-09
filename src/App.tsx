import React, { useState, useEffect } from 'react'
import CheckboxContainer from './components/CheckboxContainer'
import GraphContainer from './components/GraphContainer'
import { StyledBody } from './style'
import Prefecture from './types/Prefecture'
import Spinner from './components/Spinner'
import getPrefectures from './api/getPrefectures'

const App = () => {
   const [selectedPrefectures, setSelectedPrefectures] = useState([] as Prefecture[])
   const [loading, setLoading] = useState(true)
   const [prefectures, setPrefectures] = useState([] as Prefecture[])

   useEffect(() => {
      getPrefectures()
         .then(data => {
            setPrefectures(data)
            setLoading(false)
         })
         .catch(() => {
            throw new Error('都道府県を取得できませんでした。')
         })
   }, [])

   return (
      <StyledBody>
         {loading ? (
            <Spinner />
         ) : (
            <>
               <CheckboxContainer
                  prefectures={prefectures}
                  selectedPrefectures={selectedPrefectures}
                  setSelectedPrefectures={setSelectedPrefectures}
               />
               <GraphContainer selectedPrefectures={selectedPrefectures} />
            </>
         )}
      </StyledBody>
   )
}

export default App
