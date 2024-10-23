let enjoySection = document.getElementById('enjoy');

let video = document.createElement('video');
video.muted = true;
video.setAttribute('loop', 'loop');
video.setAttribute('autoplay', 'autoplay');
video.setAttribute('id', 'enjoyVideo');

let source = document.createElement('source');
source.setAttribute('src', '../../assets/video/video (720p).mp4');
source.setAttribute('type', 'video/mp4');

video.append(source);

enjoySection.insertAdjacentElement('afterbegin', video);
video.play();