let videos          = {};
let primaryVideos   = document.getElementById('primary-videos');
let secondaryVideos = document.getElementById('secondary-videos');

let videoData = {
  add:    createVideo,
  attach: attachVideo,
  remove: removeVideo,
  ownID:  null,
};

export default videoData;

function createVideo(peerId, peerInfo, isSelf) {
  if (isSelf && videos._SELF_) { return; };

  let videoContainer = document.createElement('div');
  let video          = document.createElement('video');
  let videoData      = {
    isSelf,
    isPrimary: isSelf,
    peerInfo,
    video: {
      element:   video,
      container: videoContainer,
      stream:    null,
    },
  };
  videoData.switchArea = buildSwitchVideoArea(videoData);

  videoContainer.className = 'videos__video-container';
  videoContainer.addEventListener('dblclick', videoData.switchArea);
  videoContainer.addEventListener('touchstart', switchOnSecondTap);

  video.autoplay = true;
  video.muted    = true;
  video.id       = peerId;

  videoContainer.appendChild(video);
  if (isSelf) {
    videoContainer.style.filter = 'grayscale(1)';
    videoContainer.style.transform = 'scaleX(-1)';
    primaryVideos.appendChild(videoContainer);
  } else {
    secondaryVideos.appendChild(videoContainer);
  }

  videos[peerId] = videoData;

  function switchOnSecondTap() {
    videoContainer.removeEventListener('touchstart', switchOnSecondTap);
    videoContainer.addEventListener('touchstart', videoData.switchArea);

    let TO = setTimeout(() => {
      videoContainer.removeEventListener('touchstart', videoData.switchArea);
      videoContainer.addEventListener('touchstart', switchOnSecondTap);
    }, 300);
  }
}

function buildSwitchVideoArea(videoData) {
  return switchVideoArea;

  function switchVideoArea() {
    if (videoData.isPrimary) {
      secondaryVideos.appendChild(videoData.video.container);
    } else {
      primaryVideos.appendChild(videoData.video.container);
    }
    videoData.isPrimary = !videoData.isPrimary;
    attachMediaStream(videoData.video.element, videoData.video.stream);
  }
}

function attachVideo(peerId, stream, isSelf) {
  if (isSelf && peerId !== '_SELF_') { return; };

  let vid = videos[peerId].video.element;

  videos[peerId].video.stream  = stream;
  videos[peerId].video.element = attachMediaStream(vid, stream);
}

function removeVideo(peerId, peerInfo, isSelf) {
  let vid                = videos[peerId];
  let vidContainer       = vid.video.container;
  let vidContainerParent = vidContainer.parentNode;

  vidContainerParent.removeChild(vidContainer);
}
