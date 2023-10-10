let method;
let url;
let data;
let callback;

const createRequest = async (options = {
  method, url, data, callback,
}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onload = () => {
    options.callback(xhr.response);
  };

  xhr.onerror = () => {
    options.callback(xhr.error);
  };

  xhr.open(options.method, options.url);
  xhr.send(JSON.stringify(options.data));
};

export default createRequest;
