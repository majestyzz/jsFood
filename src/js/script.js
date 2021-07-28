'use strict';

document.addEventListener('DOMContentLoaded', () => {

  //tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabContent = document.querySelectorAll('.tabcontent'),
    tabPar = document.querySelector('.tabheader__items');

  function hideElements() {
    tabContent.forEach(i => {
      i.classList.remove('show');
      i.classList.add('hide');
    });
    tabs.forEach(i => {
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
        tabs.forEach((element, i) => {
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

  // timer


  //end-time
  let now = new Date();
      let monthCurrent = now.getMonth() + 1;
      let dayCurrent = now.getDate() + 1;
  const endData = `2021-${monthCurrent}-${dayCurrent}`;

  //time-selection
  function getTimeValue(endTime) {
    const time = Date.parse(endData) - new Date(),
      days = Math.floor(time / (1000 * 60 * 60 * 24)),
      hours = Math.floor((time / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((time / (1000 * 60)) % 60),
      seconds = Math.floor((time / 1000) % 60);
    return {
      'total': time,
      days,
      hours,
      minutes,
      seconds,
    };


  }

  //delay and start timer
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

  // modal


  function clickModal(openData, modalData, closeData) {
    const modal = document.querySelector(modalData),
          open = document.querySelectorAll(openData);
    let condition = false;

    function openModal() {
      modal.classList.remove('hide');
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
    open.forEach((element) => {
      element.addEventListener('click', () => {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        // clearInterval(modalTimer);
      });
    });

    function closeModal() {
      modal.classList.remove('show');
      modal.classList.add('hide');
      document.body.style.overflow = '';
    }
    modal.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.matches('.modal') || target.matches(closeData)) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        closeModal();
      }
    });
  
    // let modalTimer = setTimeout(openModal, 6000);
    
    let documentBody = document.documentElement;

    
    function showModalByScroll() {
      if (documentBody.scrollTop + documentBody.clientHeight >= documentBody.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
      }
     }
    window.addEventListener('scroll', showModalByScroll);
  }



  clickModal('[data-open]', '[data-modal]', '[data-close]');
});