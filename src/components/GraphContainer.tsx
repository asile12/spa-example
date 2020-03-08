import React from 'react'
import { StyledGraphContainer } from '../style'

import { PrefCode } from '../types/aliases'

interface Props {
   selectedPrefectures: PrefCode[]
}

const GraphContainer = ({ selectedPrefectures }: Props) => {
   return (
      <StyledGraphContainer>
         graph:{selectedPrefectures.map(pref => pref)}
      </StyledGraphContainer>
   )
}

export default GraphContainer
