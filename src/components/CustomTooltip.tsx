import React from 'react'

interface Props {
   payload?: any[] | null
   label?: any
   active?: any
}

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
