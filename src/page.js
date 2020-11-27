const searchCon = document.createElement('div');
searchCon.classList.add('search-container');
const form = document.createElement('form');
const label = document.createElement('label');
const input = document.createElement('input');

const useRes = (el, pointer, info) => {
  const [key] = info;
  const keys = key[pointer];
  Object.keys(keys).forEach(kee => {
    el.setAttribute(kee, keys[kee]);
  });
};

const setAttributes = ((el, pointer, arr) => {
  const res = arr.filter(obj => obj.hasOwnProperty(pointer));
  useRes(el, pointer, res);
  return el;
});


const ele = [
  {
    label: {
      for: 'search',
      'aria-label': 'Search',
    },
  },
  {
    search: {
      type: 'search',
      id: 'search',
      'aria-labelledby': 'search-button',
    },
  },
  {
    btn: {
      type: 'submit',
      id: 'search-button',
      value: 'Search',
    },
  },
];
setAttributes(label, 'label', ele);
setAttributes(input, 'search', ele);
setAttributes(input, 'btn', ele);

// export default queries;