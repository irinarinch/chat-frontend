import Entity from './Entity';

export default class ChatAPI extends Entity {
  getUser(data) {
    this.user = data.user;
  }
}
