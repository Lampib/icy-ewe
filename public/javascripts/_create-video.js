let videos          = {};
let ownVideo        = document.getElementById('own_cam');
let primaryVideos   = document.getElementById('primary-videos');
let secondaryVideos = document.getElementById('secondary-videos');

let videoFunctions = {
  add    : createVideo,
  attach : attachVideo,
  remove : removeVideo,
};

export default videoFunctions;

function createVideo(peerId, peerInfo, isSelf) {
  if (isSelf && videos._SELF_) { return; };

  let videoData = {
    isSelf,
    peerInfo,
    peerId,
    stream    : null,
  };

  videoData.element = buildVideo(videoData);
  videos[peerId]    = videoData;
}

function buildSwitchVideoArea(videoData) {
  return switchVideoArea;

  function switchVideoArea() {
    if (videoData.isPrimary) {
      secondaryVideos.appendChild(videoData.element.container);
      videoData.element.video.muted = true;
    } else {
      primaryVideos.appendChild(videoData.element.container);
      videoData.element.video.muted = false;
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
  let video             = document.createElement('video');

  videoData.switchArea = buildSwitchVideoArea(videoData);

  videoContainer.className = 'videos__video-container video-container';

  video.autoplay  = true;
  video.id        = videoData.peerId;
  video.className = 'video-container__video';

  controlsLayer.className = 'video-container__controls';

  videoContainer.appendChild(video);
  videoContainer.appendChild(controlsLayer);

  if (videoData.isSelf) {
    video.muted = true;
    ownVideo.appendChild(videoContainer);
  } else {
    let switchLevelButton = document.createElement('button');
    switchLevelButton.className = 'video-container__switch-level-button';
    switchLevelButton.addEventListener('mousedown', videoData.switchArea);
    switchLevelButton.addEventListener('touchstart', videoData.switchArea);
    controlsLayer.appendChild(switchLevelButton);

    if (primaryVideos.querySelector('.video-container')) {
      secondaryVideos.appendChild(videoContainer);
      videoData.isPrimary = false;
      video.muted = true;
    } else {
      primaryVideos.appendChild(videoContainer);
      videoData.isPrimary = true;
    }
  }

  return {
    video     : video,
    container : videoContainer,
  };
}
