const leverSwitch = document.querySelector('.lever-switch');

leverSwitch.addEventListener('click', () => {
  leverSwitch.classList.toggle('on');
});

function online(){
  const interlockSwitch = document.querySelector('#ioff');
  interlockSwitch.classList.toggle('on');
}