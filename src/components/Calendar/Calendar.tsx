import { useEffect } from 'react'

const Calendar = () => {
  useEffect(() => {
    console.log('Flowing', window, _)
  })

  return (
    <div>
      <canvas />
    </div>
  )
}

export default Calendar
