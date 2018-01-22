import skylink from './_lampib-room.js';
import config  from './_env.js';
import videos  from './_create-video.js';
import textChat from './_text-chat.js';

const myVideoContainer = document.getElementById('my-video-container');
const LOGGED_ON        = ICY_EWE.USER_LOGGED_IN;

videos.add('_SELF_', {}, true);

skylink.setUserData({
  name: ICY_EWE.USER_CHAT_NAME
});
skylink.on('peerJoined', videos.add);
skylink.on('incomingStream', videos.attach);
skylink.on('peerLeft', videos.remove);
skylink.on('mediaAccessSuccess', stream => {
  videos.attach('_SELF_', stream, true);
});

AdapterJS.webRTCReady(initialiseRoom);

function initialiseRoom(isUsingPlugin) {
  let queryParams = new URL(location.href).searchParams;
  let defaultRoom = queryParams.get('room') || 'Preco Lobby';
  ICY_EWE.DEBUG_MODE && (defaultRoom += '__DEBUG');

  skylink.init(
    {
      apiKey      : config.TEMASYS_WEB_SDK_API,
      defaultRoom : defaultRoom
    },
    function() {
      return skylink.joinRoom(
        {
          audio : true,
          video : true,
        },
        data => {
          let { error, errorCode, room } = data || {};
          if (error) {  }
          textChat.init();
        }
      );
    }
  );
}
