const isFullscreen = () => document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    return document.exitFullscreen;
  }
  else if (document.mozCancelFullScreen) {
    return document.mozCancelFullScreen;
  }
  else if (document.webkitExitFullscreen) {
    return document.webkitExitFullscreen;
  }
  else if (document.msExitFullscreen) {
    return document.msExitFullscreen;
  }
  else {
    return null;
  }
};
const fullscreen = (element) => {
  if (element.requestFullscreen) {
      element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};