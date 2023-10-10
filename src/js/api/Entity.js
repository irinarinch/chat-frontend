import createRequest from './createRequest';

export default class Entity {
  constructor() {
    this.url = 'https://chat-backend-ner9.onrender.com/new-user';
  }

  create(data, callback) {
    createRequest({
      method: 'POST',
      url: this.url,
      data,
      callback,
    });
  }
}
