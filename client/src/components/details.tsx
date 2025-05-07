import { useEffect, useState } from "react";
import PlaylistDetails from "./playlistDetails";
import ArtistDetails from "./artistDetails";
import TrackDetails from "./trackDetails";
import { trackProps } from "../utils/dataProps";

const DetailsPage = () => {
    const [allTracks, setAllTracks] = useState<trackProps[]>([]);
    const [itemName, setItemName] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [artistPopularity, setArtistPopularity] = useState("");
    const [artistGenres, setArtistGenres] = useState("");
    const [dataType, setDataType] = useState("");
    const [previewURL, setPreviewURL] = useState("");
    const accessToken = sessionStorage.getItem("accessToken");
    
    useEffect(()=>{
        const itemName = new URLSearchParams(window.location.search).get('itemName') || "";
        const coverImage = new URLSearchParams(window.location.search).get('imageLink') || "";
        const itemLink = new URLSearchParams(window.location.search).get('itemLink') || "";
        const type = new URLSearchParams(window.location.search).get('type') || "";
        const popularity = new URLSearchParams(window.location.search).get('popularity') || "";
        const genres = new URLSearchParams(window.location.search).get('genres') || "";
        const preview = new URLSearchParams(window.location.search).get('preview') || "";
        let sanitizedPreview = "";
        try {
            const url = new URL(preview);
            if (url.protocol === "http:" || url.protocol === "https:") {
                sanitizedPreview = url.href;
            }
        } catch (e) {
            console.warn("Invalid preview URL:", preview);
        }
        
        setDataType(type);
        setArtistPopularity(popularity);
        setArtistGenres(genres);
        setPreviewURL(sanitizedPreview);

        if(accessToken && itemLink){ fetchData(itemLink);  }

        if (itemName && coverImage){
            setItemName(itemName)
            setCoverImage(coverImage);
            //window.history.pushState({}, "" , "/details")
        }
        
    },[])

    const fetchData = async(itemLink:string) => {
        try{
            const response = await fetch (`http://localhost:5000/getTracksFromPlaylist?accessToken=${accessToken}&playlistLink=${itemLink}`);
            if(response.ok){
                const data = await response.json()
                setAllTracks(data) 
            }
        }catch(error){
            console.log("Details couldn't be accessed")
        }
    }

    if(dataType === "playlist"){
        return <PlaylistDetails itemName={itemName} coverImage={coverImage} allTracks={allTracks} />
    } else if(dataType === "artist"){
        return <ArtistDetails data ={{name: itemName, coverImage:coverImage, popularity:artistPopularity, genres:artistGenres}}  />
    } else{
        return <TrackDetails data ={{name: itemName, coverImage:coverImage, preview:previewURL}}  />
    }

}

export default DetailsPage;