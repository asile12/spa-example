import React from 'react'
import Prefecture from '../types/Prefecture'
import { StyledLegendMarker } from '../style'
import { LegendProps } from 'recharts'

interface Props extends LegendProps {
   selectedPrefectures: Prefecture[]
   lineColors: string[]
}

const CustomLegend = ({ payload, selectedPrefectures, lineColors }: Props) => {
   return (
      <ul style={{ listStyle: 'none' }}>
         {payload !== null && payload !== undefined
            ? payload.map((_entry, index) => (
                 <li key={`item-${index}`}>
                    <StyledLegendMarker color={lineColors[index % lineColors.length]} />
                    {selectedPrefectures[index].prefName}
                 </li>
              ))
            : ''}
      </ul>
   )
}
export default CustomLegend
