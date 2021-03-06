import { call } from 'redux-saga/effects';

/**
 * origin post: https://codepen.io/Jacqueline34/pen/pyVoWr
 * @param args
 * @returns {*}
 */
function convertArrayOfObjectsToCSV(data) {
  let result = '';
  let ctr;

  const columnDelimiter = ',';
  const lineDelimiter = '\n';

  const keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(item => {
    ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) {
        result += columnDelimiter;
      }
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });
  return Promise.resolve(result);
}

// function transform(data) {
//   const result = [];
//   Object.entries(data).forEach(item => {
//     result.push(item[1].address);
//   });
//   return Promise.resolve(result);
// }

export function* exportCSVFileSaga(data) {
  // const transforming = yield call(transform, data);
  const csv = yield call(convertArrayOfObjectsToCSV, data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const fileName = `addresses-${new Date().getTime()}.csv`;
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, fileName);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
