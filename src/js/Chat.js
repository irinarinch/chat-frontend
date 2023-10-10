import ChatAPI from './api/ChatAPI';
import avatar from '../images/avatar.png';
import getTime from './getTime';

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI();
    this.websocket = null;

    this.connected = false;
  }

  init() {
    document.addEventListener('submit', (e) => {
      this.loginHandler(e);
      this.onEnterChatHandler(e);
    });

    this.loginInput = document.querySelector('.login-input');
    this.errorMessage = document.querySelector('.error-msg');

    this.loginInput.oninput = () => {
      this.errorMessage.textContent = '';
    };
  }

  loginHandler(e) {
    e.preventDefault();

    if (!e.target.closest('.modal')) return;

    const name = this.loginInput.value.trim();

    if (name === '') {
      this.errorMessage.textContent = 'Не может быть пустым';
      return;
    }

    this.api.create({ name }, (data) => {
      if (data.status === 'error') {
        this.errorMessage.textContent = data.message;
        return;
      }

      this.api.getUser(data);

      document.querySelector('.modal').classList.add('hidden');
      document.querySelector('.container').style.display = 'flex';

      this.subscribeOnEvents();
    });
  }

  subscribeOnEvents() {
    this.websocket = new WebSocket('wss://chat-backend-ner9.onrender.com/');

    this.websocket.addEventListener('open', () => {
      this.connected = true;
    });

    this.websocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      if (Array.isArray(data)) {
        this.renderMembers(data);
      } else {
        this.renderMessage(data);
      }
    });

    window.onunload = () => {
      this.sendMessage('exit');
      this.websocket.close();
    };
  }

  onEnterChatHandler(e) {
    if (!e.target.closest('.chat__messages-input')) return;

    e.preventDefault();

    const input = document.querySelector('.form__input');

    if (input.value !== '') {
      this.sendMessage('send', input.value);
    }

    input.value = '';
  }

  sendMessage(type, value) {
    const message = {
      user: this.api.user,
      type,
      message: value,
    };

    this.websocket.send(JSON.stringify(message));
  }

  renderMessage(data) {
    const container = document.querySelector('.chat__messages-container');
    const time = getTime();

    if (data.user.name === this.api.user.name) {
      container.innerHTML += `
        <div class="message__container-yourself">
          <div class="message__header">You, ${time}</div>
          <div class="message">${data.message}</div>
        </div> 
      `;
    } else {
      container.innerHTML += `
        <div class="message__container-interlocutor">
          <div class="message__header">${data.user.name}, ${time}</div>
          <div class="message">${data.message}</div>
        </div> 
      `;
    }

    container.scrollTo(0, container.scrollHeight);
  }

  renderMembers(users) {
    this.connectedMembers = document.querySelector('.chat__connect');

    this.connectedMembers.innerHTML = '';

    users.forEach((user) => {
      this.connectedMembers.innerHTML += `
        <div class="member">
          <img src=${avatar} class="avatar">
          <span class="member-name">${user.name}</span>
        </div>
      `;
    });
  }
}
