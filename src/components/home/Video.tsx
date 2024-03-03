
function Video() {
  return (
    <div>
      <video autoPlay={true} muted={true} loop={true} poster="/assets/poster.png">
        <source src="/assets/nikevid.mp4" type="video/mp4"></source>
      </video>
    </div>
  );
}

export default Video;
