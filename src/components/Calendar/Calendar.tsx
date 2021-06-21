import { useEffect } from 'react'

/* eslint-disable-next-line @typescript-eslint/naming-convention */

const Calendar = () => {
  useEffect(() => {
    console.log('Flowing', window, window._)
  })

  return (
    <div>
      <canvas />
    </div>
  )
}

export default Calendar
