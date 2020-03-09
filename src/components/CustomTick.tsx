import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RechartsNotTyped = any

interface Props {
   payload?: RechartsNotTyped
   verticalAnchor?: 'start' | 'middle' | 'end'
   visibleTicksCount?: RechartsNotTyped
}

// filter out props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomTick = ({ payload, verticalAnchor, visibleTicksCount, ...props }: Props) => {
   return (
      <text {...props} className="bar-chart-tick" dy={12}>
         {payload.value}
      </text>
   )
}

export default CustomTick
