let videos          = {};
let primaryVideos   = document.getElementById('primary-videos');
let secondaryVideos = document.getElementById('secondary-videos');

export default {
  add:    createVideo,
  attach: attachVideo,
  remove: removeVideo,
};

function createVideo(peerId, peerInfo, isSelf) {
  if (isSelf) { return; };

  let videoContainer = document.createElement('div');
  let video          = document.createElement('video');

  videoContainer.className = 'videos__video-container';

  video.autoplay = true;
  video.muted    = true;
  video.id       = peerId;

  videoContainer.appendChild(video);
  secondaryVideos.appendChild(videoContainer);

  videos[peerId] = {
    video: {
      element:   video,
      container: videoContainer,
    },
  };
}

function attachVideo(peerId, stream, isSelf) {
  if (isSelf) { return; };

  let vid = videos[peerId].video.element;

  videos[peerId].video.element = attachMediaStream(vid, stream);
}

function removeVideo(peerId, peerInfo, isSelf) {
  let vid                = videos[peerId];
  let vidContainer       = vid.video.container;
  let vidContainerParent = vidContainer.parentNode;

  vidContainerParent.removeChild(vidContainer);
}
