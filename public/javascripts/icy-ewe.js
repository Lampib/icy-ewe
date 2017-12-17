import skylink from './_lampib-room.js';
import config  from './_env.js';
import videos  from './_create-video.js';

const myVideoContainer = document.getElementById('my-video-container');

videos.add('_SELF_', {}, true);

skylink.on('peerJoined', videos.add);
skylink.on('incomingStream', videos.attach);
skylink.on('peerLeft', videos.remove);

skylink.on('mediaAccessSuccess', stream => {
  videos.attach('_SELF_', stream, true);
});

AdapterJS.webRTCReady(initialiseRoom);

function initialiseRoom(isUsingPlugin) {
  skylink.init(
    {
      apiKey:      config.TEMASYS_WEB_SDK_API,
      defaultRoom: 'Ready',
    },
    () =>
      skylink.joinRoom(
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
