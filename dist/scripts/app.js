'use strict';

var LAMPIB_ROOM = new Skylink();

var config = {
  TEMASYS_WEB_SDK_API: '7b02872b-7253-48eb-9868-fc9c894c204b'
};

LAMPIB_ROOM.on('peerJoined', function (peerId, peerInfo, isSelf) {
  if (isSelf) {
    return;
  }

  var vid = document.createElement('video');

  vid.autoplay = true;
  vid.muted = true;
  vid.id = peerId;

  document.body.appendChild(vid);
});

LAMPIB_ROOM.on('incomingStream', function (peerId, stream, isSelf) {
  if (isSelf) {
    return;
  }

  var vid = document.getElementById(peerId);

  attachMediaStream(vid, stream);
});

LAMPIB_ROOM.on('peerLeft', function (peerId, peerInfo, isSelf) {
  var vid = document.getElementById(peerId);

  document.body.removeChild(vid);
});

LAMPIB_ROOM.on('mediaAccessSuccess', function (stream) {
  var vid = document.getElementById('myvideo');

  attachMediaStream(vid, stream);
});

LAMPIB_ROOM.init({
  apiKey: config.TEMASYS_WEB_SDK_API,
  defaultRoom: 'Ready'
}, function () {
  LAMPIB_ROOM.joinRoom({
    audio: true,
    video: true
  }, function (data) {
    
  });
});

//# sourceMappingURL=app.js.map
