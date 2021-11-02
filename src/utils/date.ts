import zeroPad from './zeroPad'

export default function getFmtTime(timestamp: number) {
  const date = new Date(timestamp)
  const time = parseInt([date.getFullYear(), zeroPad(date.getMonth() + 1), zeroPad(date.getDate())].join(''), 10)
  return time
}

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function getMonthCount(year: number, m: number, notAdd?: boolean) {
  const month = !notAdd ? m + 1 : m
  switch (month) {
    case 2:
      return isLeapYear(year) ? 29 : 28

    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31

    default:
      return 30
  }
}

const getMonthWeekDay = (year: number, month: number) => {
  let m = month + 1
  let y = year
  const d = 1

  if (m <= 2) {
    m += 12
    y -= 1
  }
  return (
    (d + 2 * m + Math.floor((3 * (m + 1)) / 5) + y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400)) % 7
  )
}

const getDayList = (year: number, month: number) => {
  const monthLength = getMonthCount(year, month)
  const lastMonthLength = getMonthCount(year, month - 1)
  const weekDay = getMonthWeekDay(year, month)

  const dayList = []
  for (let i = 1; i <= monthLength; i++) {
    dayList.push({
      out: false,
      day: i,
      sign: false,
      date: year * 10000 + (month + 1) * 100 + i
    })
  }

  // 补齐上个月的
  for (let i = 0; i < weekDay; i++) {
    dayList.unshift({
      out: true,
      day: lastMonthLength - i,
      sign: false,
      date: year * 10000 + month * 100 + (lastMonthLength - i)
    })
  }

  // 补齐下个月的
  let loopCount = dayList.length % 7

  if (loopCount !== 0) {
    loopCount = 7 - loopCount
  }

  for (let i = 0; i < loopCount; i++) {
    dayList.push({
      out: true,
      day: i + 1,
      sign: false,
      date: year * 10000 + (month + 2) * 100 + (i + 1)
    })
  }
  return dayList
}

function isLess15Minutes(time: string) {
  const endTime = new Date(time).getTime()
  return Math.floor((endTime - Date.now()) / 1000 / 60) > 1
}

function isZeroToFour() {
  const date = new Date()
  const h = date.getHours()
  return h >= 0 && h < 4
}

export { isLeapYear, getMonthCount, isLess15Minutes, getMonthWeekDay, getDayList, isZeroToFour }
