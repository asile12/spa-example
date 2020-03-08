import React from 'react'
import { StyledGraphContainer } from '../style'

import { PrefCode } from '../types/aliases'

interface Props {
   selectedPrefectures: Set<PrefCode>
}

const GraphContainer = ({ selectedPrefectures }: Props) => {
   return (
      <StyledGraphContainer>
         graph:{Array.from(selectedPrefectures).map(pref => pref)}
      </StyledGraphContainer>
   )
}

export default GraphContainer
