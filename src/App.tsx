import React, { useState } from 'react'
import CheckboxContainer from './components/CheckboxContainer'
import GraphContainer from './components/GraphContainer'
import { StyledBody } from './style'
import Prefecture from './types/Prefecture'

const App = () => {
   const [selectedPrefectures, setSelectedPrefectures] = useState([] as Prefecture[])

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
