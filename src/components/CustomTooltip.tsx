import React from 'react'
import { TooltipProps } from 'recharts'

interface Props extends TooltipProps {}

const CustomTooltip = ({ payload, active }: Props) => {
   if (active) {
      return (
         <div className="custom-tooltip">
            {payload !== null && payload !== undefined
               ? payload.map((elem, index) => (
                    <p key={index} className="label">
                       {elem.value.toLocaleString()}
                    </p>
                 ))
               : null}
         </div>
      )
   }

   return null
}
export default CustomTooltip
