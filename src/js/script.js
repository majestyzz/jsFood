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
  

});