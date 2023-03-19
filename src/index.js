import _ from 'lodash';
import './style.css';
import Cloudy from './cloudy.jpg';



function component() {
   const element = document.createElement('div');

  // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');

   const cloudyBackground = new Image();
   cloudyBackground.src = Cloudy;

   element.appendChild(cloudyBackground);

   return element;
}

 document.body.appendChild(component());