export function getDisplayedVideoRect(
  video: HTMLVideoElement,
  container: HTMLElement
) {
  const cw = container.clientWidth;
  const ch = container.clientHeight;

  const vw = video.clientWidth;
  const vh = video.clientHeight;

  const videoAR = vw / vh;
  const containerAR = cw / ch;

  let videoWidth, videoHeight, videoOffsetX, videoOffsetY;

  if (videoAR > containerAR) {
    // letterbox top/bottom
    videoWidth = cw;
    videoHeight = cw / videoAR;
    videoOffsetX = 0;
    videoOffsetY = (ch - vh) / 2;
  } else {
    // letterbox left/right
    videoHeight = ch;
    videoWidth = ch * videoAR;
    videoOffsetX = (cw - vw) / 2;
    videoOffsetY = 0;
  }

  return { videoWidth, videoHeight, videoOffsetX, videoOffsetY };
}