import React from "react";
import { useState, useEffect, useRef } from "react";




//create your first component
export const Playlist = () => {
    const [currentSong, setCurrentSong] = useState(0);
    const [playStatus, setPlayStatus] = useState('fa-solid fa-play fa-2xl');
    const [playT, setPlayT] = useState(false);
    const [volumeT, setVolumeT] = useState(0.5);
    const [volumeE, setVolumeE] = useState('fa-solid fa-volume-low fa-xl');
    const [songP, setSongP] = useState(0);

    const [songList, setSongList] = useState({});
    // Fetch function 

    const [stepS, setStepS] = useState(0);

    //	const[songArr, setSongArr]=useState([0,1,2]);
    let interval;
    let delay = 1000;
    let startPress = null;
    var audioTest = 0;
  

    // useEffect(() => {
    // 	if(playT==true){

    // 		interval= setInterval(()=>{

    // 			// setSongP(stepS);
    // 			setStepS(Math.floor(audioTest.duration/100));
    // 			setSongP(songP+stepS);
    // 			alert(songP);
    // 			// console.log('this part runs second ' + Math.floor(audioTest.duration/100));



    // 		},3000);		
    // 		return ()=> clearInterval(interval);
    // 	}

    // 	else{
    //  setSongP(0);
    // 	}

    // }, [playT]);

    useEffect(() => {
        fetch('https://playground.4geeks.com/apis/fake/sound/songs')
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();


                // Read the response as JSON
                //   setSongList( response.json());


                //  return response.json();
            })

            .then(responseAsJson => {
                // Do stuff with the JSONified response
                console.log(responseAsJson);
                setSongList(responseAsJson);
            })
            .catch(error => {
                console.log('Looks like there was a problem: \n', error);
            });

    }, []);


    function play_function(id) {

        if (id == null) {
            if (playT == false) {

                setPlayStatus('fa-solid fa-pause fa-2xl');
                let test = 'https://playground.4geeks.com/apis/fake/sound/' + songList[currentSong].url;
                audioTest.src = test;
                audioTest.play();
                setPlayT(true);
            }

            else {

                setPlayStatus('fa-solid fa-play fa-2xl');
                audioTest.pause();
                setPlayT(false);


            }
        }

        else {

            if (playT == false) {

                setPlayStatus('fa-solid fa-pause fa-2xl');
                setCurrentSong(id);
                let test = 'https://playground.4geeks.com/apis/fake/sound/' + songList[currentSong].url;
                audioTest.src = test
                audioTest.play();
                setPlayT(true);
            }

            else {

                setPlayStatus('fa-solid fa-play fa-2xl');
                audioTest.currentTime = 0;
                audioTest.play();
                setPlayT(false);


            }



        }

    }

    function previous_function() {

        setCurrentSong(currentSong - 1);
        let test = 'https://playground.4geeks.com/apis/fake/sound/' + songList[currentSong].url;


        audioTest.src = test;
        audioTest.play();

    }

    function next_function(id) {

        setCurrentSong(currentSong + 1);
        let test = 'https://playground.4geeks.com/apis/fake/sound/' + songList[currentSong].url;
        audioTest.src = test;
        audioTest.play();
    }


    // function sendDuration () {
    // 	setStepS(Math.floor(audioTest.duration/100));
    // 	alert('this song is'+stepS+'long');

    // }


    function counterDown() {
        startPress = Date.now();
    }

    function counterUp() {
        if (Date.now() - startPress > delay) {
            setVolumeE('fa-solid fa-volume-xmark fa-xl');

            audioTest.muted = true;
        }
        else {

            setVolumeT(volumeT - 0.1);
            audioTest.volume = volumeT;
        }
    }

   


    function volume_up() {
        if (volumeT == 0) {
            setVolumeT(0.5);
            audioTest.volume = volumeT;
        }
        else {
            setVolumeT(volumeT + 0.1);
            audioTest.volume = volumeT;
            setVolumeE('fa-solid fa-volume-low fa-xl');
        }

    }


    return (
        <div className="container">

            <div className="head_div">
                <h1>My Playlist</h1>
                <hr />
            </div>

            <div className="playlist_div">
            {songList.map((element, index) => 


<div class="track-title">
    <span class="playlist-track" href="#" data-play-track="1" onClick={() => play_function(index)}><h4>{songList[index].name}</h4></span>
    <p>{songList[index].category}</p>
</div>
)}


                <audio ref={(e) => audioTest = e} preload="metadata" id="testTone" />

            </div>



            <div className="audio_div">


                <div class="ui-controls">
                    <input type="range" class="ui-slider" min="1" max="100" value={songP} step="1" />
                    <span onClick={() => previous_function()}><i class="fa-solid fa-backward fa-xl" ></i></span>

                    <span onClick={() => play_function()}><i className={playStatus} ></i></span>
                    <span onClick={() => next_function()}><i class="fa-solid fa-forward fa-xl"></i></span> */}
                    <span onClick={() => play_function2(0)}><i class="fas fa-random fa-xl"></i></span>
                    <span><i class="fa-solid fa-repeat fa-xl"></i></span>
                    <span onMouseDown={() => counterDown()} onMouseUp={() => counterUp()}><i className={volumeE}></i></span>

                    <span onClick={() => volume_up()} ><i class="fa-solid fa-volume-high fa-xl"> </i></span> */}
                </div>

            </div>


        </div>
    );
};