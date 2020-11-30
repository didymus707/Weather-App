const { body } = document;
const searchCon = document.createElement('div');
searchCon.classList.add('search-container');
const mainCon = document.createElement('div');
mainCon.classList.add('main-con');
const headerCon = document.createElement('div');
headerCon.classList.add('header-con');
const topHeader = document.createElement('h1');
topHeader.classList.add('head');
topHeader.textContent = 'Weather Forecast';
const main = document.createElement('main');
main.classList.add('main');
const header = document.createElement('h2');
header.classList.add('header');
const btn = document.createElement('button');
btn.textContent = 'Change Unit';
const para = document.createElement('p');
const figure = document.createElement('figure');
figure.classList.add('icon');
const ul = document.createElement('ul');
ul.classList.add('details');
const form = document.createElement('form');
const input = document.createElement('input');
const btnInput = document.createElement('input');
const list = [
  {
    fg: ['img', 'figcaption'],
  },
  {
    li: ['time', 'desc'],
  },
];
const ele = [
  {
    form: {
      action: '/',
      method: 'get',
    },
  },
  {
    search: {
      type: 'search',
      id: 'search',
      'aria-labelledby': 'search-button',
      placeholder: 'Search for a city',
    },
  },
  {
    btn: {
      type: 'submit',
      id: 'search-button',
      value: 'Submit',
    },
  },
];

const page = (() => {
  const createList = ((arr, pointer, par) => {
    const fil = arr.filter(obj => obj.hasOwnProperty(pointer)); //eslint-disable-line
    const cur = fil[0];
    let elem;
    cur[pointer].forEach(el => {
      if (pointer === 'fg') elem = document.createElement(el);
      else elem = document.createElement(pointer);
      elem.setAttribute('class', el);
      par.appendChild(elem);
    });
    return par;
  });

  const useRes = (el, pointer, info) => {
    const [key] = info;
    const keys = key[pointer];
    Object.keys(keys).forEach(kee => {
      el.setAttribute(kee, keys[kee]);
    });
  };

  const setAttributes = ((el, pointer, arr) => {
    const res = arr.filter(obj => obj.hasOwnProperty(pointer)); //eslint-disable-line
    useRes(el, pointer, res);
    return el;
  });

  const appendElements = () => {
    const figs = createList(list, 'fg', figure);
    const uls = createList(list, 'li', ul);
    const fom = setAttributes(form, 'form', ele);
    const sach = setAttributes(input, 'search', ele);
    const butn = setAttributes(btnInput, 'btn', ele);
    main.append(header, btn, para);
    headerCon.append(topHeader, main);
    fom.append(sach, butn);
    searchCon.appendChild(fom);
    mainCon.append(headerCon, figs, uls, searchCon);
    body.appendChild(mainCon);
    return body;
  };

  const setContent = ((el, val) => {
    el.textContent = val;
  });

  return {
    appendElements,
    setContent,
  };
})();

export default page;