let videos          = {};
let primaryVideos   = document.getElementById('primary-videos');
let secondaryVideos = document.getElementById('secondary-videos');

let videoData = {
  add:    createVideo,
  attach: attachVideo,
  remove: removeVideo,
};

export default videoData;

function createVideo(peerId, peerInfo, isSelf) {
  if (isSelf && videos._SELF_) { return; };

  let videoData = {
    isSelf,
    peerInfo,
    peerId,
    stream:    null,
    isPrimary: isSelf,
  };

  videoData.element = buildVideo(videoData);
  videos[peerId]    = videoData;
}

function buildSwitchVideoArea(videoData) {
  return switchVideoArea;

  function switchVideoArea() {
    if (videoData.isPrimary) {
      secondaryVideos.appendChild(videoData.element.container);
    } else {
      primaryVideos.appendChild(videoData.element.container);
    }
    videoData.isPrimary = !videoData.isPrimary;
    attachMediaStream(videoData.element.video, videoData.stream);
  }
}

function attachVideo(peerId, stream, isSelf) {
  if (isSelf && peerId !== '_SELF_') { return; };

  let videoData = videos[peerId];
  let videoElt  = videoData.element.video;

  videoData.stream        = stream;
  videoData.element.video = attachMediaStream(videoElt, stream);
}

function removeVideo(peerId, peerInfo, isSelf) {
  let vid                = videos[peerId];
  let vidContainer       = vid.element.container;
  let vidContainerParent = vidContainer.parentNode;

  vidContainerParent.removeChild(vidContainer);
}

function buildVideo(videoData) {
  let videoContainer    = document.createElement('div');
  let controlsLayer     = document.createElement('div');
  let switchLevelButton = document.createElement('button');
  let video             = document.createElement('video');

  videoData.switchArea = buildSwitchVideoArea(videoData);

  videoContainer.className = 'videos__video-container video-container';

  video.autoplay  = true;
  video.muted     = true;
  video.id        = videoData.peerId;
  video.className = 'video-container__video';

  controlsLayer.className = 'video-container__controls';

  switchLevelButton.className = 'video-container__switch-level-button';
  switchLevelButton.addEventListener('mousedown', videoData.switchArea);
  switchLevelButton.addEventListener('touchstart', videoData.switchArea);

  if (videoData.isSelf) {
    primaryVideos.appendChild(videoContainer);
  } else {
    secondaryVideos.appendChild(videoContainer);
  }

  videoContainer.appendChild(video);
  controlsLayer.appendChild(switchLevelButton);
  videoContainer.appendChild(controlsLayer);

  return {
    video:     video,
    container: videoContainer,
  };
}
