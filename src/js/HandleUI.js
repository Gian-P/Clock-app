const RefreshButton = document.querySelector('#refresh')
const Author = document.querySelector('.author')
const Quote = document.querySelector('#quote')
const Background = document.querySelector('.background')
const Icon = document.querySelector('.icon')
const Details = document.querySelector('.details')
const Expand = document.querySelector('.expand')
const TimeNow = document.querySelector('.time-now')
const Period = document.querySelector('.period')
const Region = document.querySelector('.region')
const CurrentlyGreeting = document.querySelector('.currently__greeting')
const CurrentlyLocation = document.querySelector('.currently__location')
const Timezone = document.querySelector('#timezone')
const WeekDay = document.querySelector('#week-day')
const YearDay = document.querySelector('#year-day')
const WeekNumber = document.querySelector('#week-number')

RefreshButton.addEventListener('click', UpdateQuote)
Expand.addEventListener('click', showDetails)
fetch('http://worldtimeapi.org/api/ip')
  .then(response => response.json())
  .then(
    function (response) {
      Region.innerText = response.abbreviation
    },
    function (err) {
      console.log(err)
    }
  )

function HandleTime () {
  const date = new Date()
  let hours = Number(date.getHours())
  const minutes = Number(date.getMinutes())
  let session = 'AM'

  if (hours >= 5 && hours <= 17) {
    Background.classList.add('day')
    Icon.src = './assets/desktop/icon-sun.svg'
    Icon.setAttribute('alt', 'sun icon')
  } else {
    Background.classList.add('night')
    Icon.src = './assets/desktop/icon-moon.svg'
    Icon.setAttribute('alt', 'moon icon')
    Details.style.color = '#fff'
    Details.style.background = 'rgba(0, 0, 0, 0.75)'
  }

  if (hours === 0) {
    hours = 12
  } else if (hours > 12) {
    hours = hours - 12
    session = 'PM'
  }

  const time = (minutes < 10) ? hours + ':' + '0' + minutes : hours + ':' + minutes
  Period.innerText = session
  TimeNow.innerText = time
  setTimeout(function () { HandleTime() }, 1000)
}

function showDetails () {
  document.querySelector('.top-widgets').classList.toggle('transform')
  Details.classList.toggle('transform')

  if (Expand.firstChild.nodeValue === 'More') {
    Expand.firstChild.nodeValue = 'Less'
  } else {
    Expand.firstChild.nodeValue = 'More'
  }

  const arrow = document.querySelector('.arrow')
  arrow.classList.toggle('rotate')
}

function HandleGreeting () {
  const date = new Date()
  const hours = Number(date.getHours())
  if (hours >= 5 && hours <= 12) {
    CurrentlyGreeting.innerText = 'GOOD MORNING'
  } else if (hours >= 12 && hours <= 6) {
    CurrentlyGreeting.innerText = 'GOOD AFTERNOON'
  } else {
    CurrentlyGreeting.innerText = 'GOOD EVENING'
  }
}

async function HandleApiCalls () {
  const DataPromise = await fetch('http://worldtimeapi.org/api/ip')
  const TimeZonePromise = await fetch('https://api.ipbase.com/json/?apikey=aVkMmMlSh5AjylQSmeaoWYGAVMEgLtWc1YRKnKst&ip')

  Promise.all([DataPromise.json(), TimeZonePromise.json()]).then(
    function (ObjArray) {
      HandleLocalization(ObjArray[0], ObjArray[1])
    },
    function (err) {
      console.log(err)
    }
  )
}

function UpdateQuote () {
  fetch('https://programming-quotes-api.herokuapp.com/Quotes/random')
    .then(response => response.json())
    .then(
      function (response) {
        Quote.innerText = response.en
        Author.innerText = response.author
      },
      function (err) {
        console.log(err)
      }
    )
}

function HandleLocalization (DataObj, TimeZoneObj) {
  Timezone.innerText = DataObj.timezone
  WeekDay.innerText = DataObj.day_of_week
  YearDay.innerText = DataObj.day_of_year
  WeekNumber.innerText = DataObj.week_number
  CurrentlyLocation.innerText = TimeZoneObj.city + ', ' + TimeZoneObj.country_code
  Timezone.innerText = TimeZoneObj.time_zone
}

HandleTime()
HandleGreeting()
UpdateQuote()
HandleApiCalls()
