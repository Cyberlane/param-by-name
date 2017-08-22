import getQueryString from './get-query-string';

const paramByName = (name) => {
  if (!Boolean(name)) {
    return '';
  }
  const query = getQueryString();
  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .filter(param => {
      const [key] = param.split('=');
      return key === name;
    })
    .reduce((_, param) => {
      const [key, value] = param.split('=');
      return value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
    }, '');
};

export default paramByName;
