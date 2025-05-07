import "../utils/audioPlayer.css"
const AudioPreview = ({previewURL} : {previewURL:string}) => {
    return (
        <div className="row">
            <audio controls autoPlay muted loop>
                {previewURL ? (
                    <source src={previewURL} type="audio/mpeg" />
                ) : (
                    <p>Audio preview not available.</p>
                )}
                    Your browser does not support the audio element.
            </audio>
        </div>
    )
}

export default AudioPreview;