import React from 'react'

interface Props {
   payload?: any
   verticalAnchor?: any
   visibleTicksCount?: any
}

const CustomTick = ({ payload, verticalAnchor, visibleTicksCount, ...props }: Props) => {
   return (
      <text {...props} className="bar-chart-tick" dy={12}>
         {payload.value}
      </text>
   )
}

export default CustomTick
