import React, { useState, useEffect } from 'react'
import getPopulation from './api/getPopulation'
import CheckboxContainer from './components/CheckboxContainer'
import GraphContainer from './components/GraphContainer'
import { StyledBody } from './style'

const App = () => {
   const [selectedPrefectures, setSelectedPrefectures] = useState(new Set<number>())

   useEffect(() => {
      getPopulation(11)
         .then(data => {
            console.log(data)
         })
         .catch(() => {
            throw new Error('人口数を取得できませんでした。')
         })
   }, [])

   return (
      <StyledBody>
         <CheckboxContainer
            selectedPrefectures={selectedPrefectures}
            setSelectedPrefectures={setSelectedPrefectures}
         />
         <GraphContainer selectedPrefectures={selectedPrefectures} />
      </StyledBody>
   )
}

export default App
