'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabPar = document.querySelector('.tabheader__items');

  function hideElements() {
    tabContent.forEach( i => {
      i.classList.remove('show');
      i.classList.add('hide');
    });
    tabs.forEach( i => {
      i.classList.remove('tabheader__item_active');
    });
  }    
  function showTab(i = 0) {
    tabContent[i].classList.remove('hide');
    tabContent[i].classList.add('show');
    tabs[i].classList.add('tabheader__item_active');
  }  

  function checkPosition() {
    tabPar.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.matches('.tabheader__item')) {
        tabs.forEach( (element, i) => {
          if (element == target) {
            hideElements();
            showTab(i);
          }
        });
      }
    });
  }

  hideElements();
  showTab();
  checkPosition();
  


  const endData = '2021-06-25';

  function getTimeValue(endTime) {
    const time = Date.parse(endData) - Date.parse(new Date()),
          days = Math.floor(time / (1000 * 60 * 60 * 24)),
          hours = Math.floor((time / (1000 * 60 * 60)) % 24),
          minutes = Math.floor((time / (1000 * 60)) % 60),
          seconds = Math.floor((time / 1000) % 60);
    
          console.log({
            'total': time,
            days,
            hours,
            minutes,
            seconds,
          })
    return {
      'total': time,
      days,
      hours,
      minutes,
      seconds,
    }

    
  }

  function setClock(element, endTime) {
    const timer = document.querySelector(element),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateValue, 1000);
    function updateValue(endTime) {
      const timerDelta = getTimeValue();
            days.innerHTML = timerDelta.days,
            hours.innerHTML = timerDelta.hours,
            minutes.innerHTML = timerDelta.minutes,
            seconds.innerHTML = timerDelta.seconds;
      if (timerDelta.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', endData);
});