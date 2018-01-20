import skylink from './_lampib-room.js';

const messagePayloads = [];
const TEST_ELT = document.createElement('div');

export default {
  init: initTextChat,
}

function initTextChat() {
  skylink.on('incomingMessage', function(message, peerID, peerInfo, isSelf) {
    var viewingEnd = chat_board.scrollTop === chat_board.scrollHeight - chat_board.getBoundingClientRect().height;
    messagePayloads.push({
      message  : message,
      peerID   : peerID,
      peerInfo : peerInfo,
      isSelf   : isSelf,
    });
    chat_board.innerHTML = buildChat();
    if (viewingEnd) {
      chat_board.scrollTop = chat_board.scrollHeight;
    }
  })

  chat_form.onsubmit = function(e) {
    e.preventDefault();
    skylink.sendP2PMessage(chat_input.value);
    chat_input.value = '';
  }

  chat_form.style.display = 'block';
  chat_input.focus();
}

function sanitiseText(str) {
  TEST_ELT.innerText = str;
  return TEST_ELT.innerHTML;
}

function buildChat() {
  return messagePayloads.map((messagePayload, index, arr) => {
    var previousPayload = arr[index - 1] || {};
    var messageHTML = '<span>' + sanitiseText(messagePayload.message.content) + '</span>';
    if (messagePayload.peerID !== previousPayload.peerID) {
      var name = messagePayload.isSelf
        ? 'You'
        : messagePayload.peerInfo.userData.name || messagePayload.peerId;
      messageHTML = '<p class="' + (messagePayload.isSelf ? 'you' : 'them') + '"><strong>' + name + '</strong>' + messageHTML;
      if (previousPayload.peerID) {
        messageHTML = '</p>' + messageHTML;
      }
    }
    return messageHTML;
  }).join('') + '</p>';
}
