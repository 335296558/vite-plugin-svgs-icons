import { useState, React } from 'react'
import './App.css'
import svgIcon, { svgIconNames } from 'virtual:svg-icon';
console.log(svgIcon, 'svgIcon');
const color = '#f00';
// const svgicons = React.createElement(svgIcon);
const listItems = svgIconNames.map(name =>
    <li key={name}>
        {/* <svg className="svg-style" color={color}>
            <use href={'#icona-'+name}></use>
        </svg> */}
        {/* <svgicons name={name} color={color}></svgicons> */}
    </li>
);
function App() {
  const [count, setCount] = useState(0)

  return (<ul className="ul-box">{listItems}</ul>)
}

export default App
