import React from 'react'

interface Props {
   payload?: any | null
   label?: any
   active?: any
}

const CustomTooltip = ({ payload, label, active }: Props) => {
   if (active) {
      return (
         <div className="custom-tooltip">
            <p className="label">{payload !== null ? payload[0].value.toLocaleString() : ''}</p>
         </div>
      )
   }

   return null
}
export default CustomTooltip
