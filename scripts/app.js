import room   from './_lampib-room.js';
import config from './_env.js';
import videos from './_create-video.js';

const myVideoContainer = document.getElementById('my-video-container');

videos.add('_SELF_', {}, true);

room.on('peerJoined', videos.add);
room.on('incomingStream', videos.attach);
room.on('peerLeft', videos.remove);

room.on('mediaAccessSuccess', stream => {
  videos.attach('_SELF_', stream, true);
});

AdapterJS.webRTCReady(initialiseRoom);

function initialiseRoom(isUsingPlugin) {
  room.init(
    {
      apiKey: config.TEMASYS_WEB_SDK_API,
      defaultRoom: 'Ready'
    },
    () =>
      room.joinRoom(
        {
          audio: true,
          video: true
        },
        data => {
          let { error, errorCode, room } = data || {};
          if (error) {  }
        }
      )
  );
}
