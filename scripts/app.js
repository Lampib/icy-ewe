import room   from './_lampib-room.js';
import config from './_config.js';

room.on('peerJoined', (peerId, peerInfo, isSelf) => {
  if (isSelf) { return; };

  let vid = document.createElement('video');

  vid.autoplay = true;
  vid.muted    = true;
  vid.id       = peerId;

  document.body.appendChild(vid);
});

room.on('incomingStream', (peerId, stream, isSelf) => {
  if (isSelf) { return; };

  let vid = document.getElementById(peerId);

  attachMediaStream(vid, stream);
});

room.on('peerLeft', (peerId, peerInfo, isSelf) => {
  let vid = document.getElementById(peerId);

  document.body.removeChild(vid);
});

room.on('mediaAccessSuccess', stream => {
  let vid = document.getElementById('myvideo');

  attachMediaStream(vid, stream);
});

room.init({
  apiKey: config.TEMASYS_WEB_SDK_API,
  defaultRoom: 'Ready'
}, () => {
  room.joinRoom(
    {
      audio: true,
      video: true
    },
    data => {
      let { error, errorCode, room } = data || {};
      if (error) {  }
    }
  );
});
