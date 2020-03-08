import React from 'react'
import { StyledGraphContainer } from '../style'

interface Props {
   selectedPrefectures: Set<number>
}

const GraphContainer = ({ selectedPrefectures }: Props) => {
   return (
      <StyledGraphContainer>
         graph:{Array.from(selectedPrefectures).map(pref => pref)}
      </StyledGraphContainer>
   )
}

export default GraphContainer
