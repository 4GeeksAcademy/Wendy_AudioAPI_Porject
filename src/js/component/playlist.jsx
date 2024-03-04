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
	const [getsongU, setGetSongU] = useState({});

    const [songList, setSongList] = useState('');
	// Fetch function 

    const [stepS, setStepS] = useState(0);
	
	//	const[songArr, setSongArr]=useState([0,1,2]);
let interval;
	let delay = 1000;
	let startPress = null;
	let playlistSong = [
		{
			title: "South Park",
			id: "south-park",
			author: "Kyle",
			url:
				" https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
		},
		{
			title: "Thunder Cats",
			id: "thundercats",
			author: "Moonra",
			url:
				"https://assets.breatheco.de/apis/sound/files/cartoons/songs/thundercats.mp3"
		},
		{
			title: "X-Men",
			id: "x-men",
			author: "Profesor",
			url:
				"https://assets.breatheco.de/apis/sound/files/cartoons/songs/x-men.mp3"
		}
	];

	var audioTest=0;
	// useEffect(() => {
	// 	return () => stopCounter(); // when App is unmounted we should stop counter
	//   }, []);

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




  
	function play_function2(id) {
	
             //   setPlayStatus('fa-solid fa-pause fa-2xl');
           
               let test= 'https://playground.4geeks.com/apis/fake/sound/'+songList[id].url;
               console.log(test);
               audioTest.src =test;
               audioTest.play();
              
                }

	function play_function(id) {
	
if(id==null)
{
		if(playT==false){

		setPlayStatus('fa-solid fa-pause fa-2xl');
	   console.log(audioTest);
	   audioTest.src = playlistSong[currentSong].url;
	   audioTest.play();
	   setPlayT(true);
		}

		else{

		 setPlayStatus('fa-solid fa-play fa-2xl');
		  audioTest.pause();
		  setPlayT(false);
	
	
	}
}

	else{

		if(playT==false){

			setPlayStatus('fa-solid fa-pause fa-2xl');
		  setCurrentSong(id);
		   audioTest.src = playlistSong[currentSong].url;
		   audioTest.play();
		   setPlayT(true);
			}
	
			else{
	
			 setPlayStatus('fa-solid fa-play fa-2xl');
			 audioTest.currentTime = 0;
			  audioTest.play();
			  setPlayT(false);
		
		
		}



	}

	}

	function previous_function() {

		setCurrentSong(currentSong - 1);
        
		audioTest.src=playlistSong[currentSong].url;
		audioTest.play();

	}

	function next_function(id) {

		setCurrentSong(currentSong + 1);
		audioTest.src=playlistSong[currentSong].url;
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
		if(Date.now() - startPress > delay)
		{
			setVolumeE('fa-solid fa-volume-xmark fa-xl');
		
			audioTest.muted=true;
		}
		else{
			
			setVolumeT(volumeT-0.1);
			audioTest.volume=volumeT;
		}
	}

	function random_function(){
		
	}


	function volume_up(){
		if(volumeT==0)
		{
			setVolumeT(0.5);
			audioTest.volume=volumeT;
		}
		else{
			setVolumeT(volumeT+0.1);
			audioTest.volume=volumeT;
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

				<div class="track-title">
					<span class="playlist-track" href="#" data-play-track="1" onClick={() => play_function(0)}><h4>{playlistSong[0].title}</h4></span>
					<p>{playlistSong[0].author}</p>
				</div>

				<div class="track-title">
					<span class="playlist-track" href="#" data-play-track="1" onClick={() => play_function(1)}><h4>{playlistSong[1].title}</h4></span>
					<p>{playlistSong[1].author}</p>
				</div>

				<div class="track-title">
					<span class="playlist-track" href="#" data-play-track="1" onClick={() => play_function(2)}><h4>{playlistSong[2].title}</h4></span>
					<p>{playlistSong[2].author}</p>
				</div>

				<audio ref={(e)=>audioTest=e} preload="metadata" id="testTone"/>

			</div>



			<div className="audio_div">


				<div class="ui-controls">
				{/* <input type="range" class="ui-slider" min="1" max="100" value={songP} step="1"/>
					{/* <span onClick={() => previous_function()}><i class="fa-solid fa-backward fa-xl" ></i></span> */}

					<span onClick={() => play_function()}><i className={playStatus} ></i></span>
					<span onClick={() => next_function()}><i class="fa-solid fa-forward fa-xl"></i></span> */}
					<span onClick={() => play_function2(0)}><i class="fas fa-random fa-xl"></i></span>
					{/* <span><i class="fa-solid fa-repeat fa-xl"></i></span>
					<span onMouseDown={()=>counterDown()} onMouseUp={()=>counterUp()}><i className={volumeE}></i></span>
					
					<span onClick={() => volume_up()} ><i class="fa-solid fa-volume-high fa-xl"> </i></span> */}
				</div>

			</div>


		</div>
	);
};