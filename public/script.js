const socket = io('/')
// var socket = io();
const videoGrid = document.querySelector("#video-div")
// const entryvideo = document.querySelector("#entryvideo")
const myPeer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '443'
})
let myVideoStream;
const myVideo = document.createElement('video')
myVideo.muted = true;
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, stream)
  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
  
document.querySelector("#typing-div button")
        .addEventListener("click", function(){
          var data=document.querySelector("textarea").value;
          if(data.trim().length>=1){
            // socket.emit("msg",data);
          socket.emit("msg", { message: data, name: username });
          }
          document.querySelector("textarea").value="";
        })

        socket.on("msg", function(data){
          var div= document.createElement("div");
          div.classList.add("msg");
          // div.textContent=data;
          div.textContent=data.name + " : " + data.msg;

          document.querySelector("#chatting").appendChild(div);
        })


        username = document.querySelector('#name').value;
    
        var div = document.createElement("div");
        div.classList.add("setName");
        div.textContent = username;
        document.querySelector("#chatting").appendChild(div);
        socket.emit('nameset', username)
      
      
        //  username = document.querySelector('#name').value;
        var count=document.querySelector("#people-logo h2");
        
        
          socket.on('online',(data)=>{
            count.textContent= data.length;
        
            var clutter = ``;
            data.forEach((elem)=>{
              clutter += `<div class="peoples">
              <i class="ri-user-3-line"></i>
              <h2>${elem}</h2>
            </div>`;
            })
        
            document.querySelector('#participants-div').innerHTML= clutter ;
          })
        

})
document.querySelector("#cb").addEventListener("click", function(){
  document.querySelector("#cb").style.backgroundColor="#3483ed"
  document.querySelector("#cp").style.backgroundColor="transparent"
  document.querySelector("#msg-div").style.display="initial";
  document.querySelector("#participants-div").style.display="none";
  document.getElementById("rightPart").style.transition = "all 1.3s";
  document.getElementById("middlePart").style.transition = "all 1.3s";
})
document.querySelector("#closechat").addEventListener("click", function(){
  // document.querySelector("#rightPart").style.width="0";
  document.querySelector("#rightPart").style.display="none";
  document.getElementById("rightPart").style.transition = "all 1.3s";
  document.getElementById("middlePart").style.transition = "all 1.3s";
  document.querySelector("#middlePart").style.width="100vw";

})
document.querySelector("#vd").addEventListener("click", function(){
  // document.querySelector("#rightPart").style.width="0";
  document.querySelector("#rightPart").style.display="none";
  document.getElementById("rightPart").style.transition = "all 1.3s";
  document.getElementById("middlePart").style.transition = "all 1.3s";
  document.querySelector("#middlePart").style.width="100vw";
})

document.querySelector("#msgs").addEventListener("click", function(){
  document.getElementById("msgs").style.transition = "all 2s";
  document.getElementById("middlePart").style.transition = "all 1.3s";
  document.getElementById("rightPart").style.transition = "all 1.3s";
  document.querySelector("#rightPart").style.display="flex";
  document.querySelector("#msg-div").style.display="initial";
  document.querySelector("#participants-div").style.display="none";
  document.querySelector("#middlePart").style.width="68vw";
  document.querySelector("#cb").style.backgroundColor="#3483ed"
  document.querySelector("#cp").style.backgroundColor="transparent"
})

document.querySelector("#ppl").addEventListener("click", function(){
  document.querySelector("#rightPart").style.display="flex";
  document.querySelector("#cb").style.backgroundColor="transparent"
  document.querySelector("#cp").style.backgroundColor="#3483ed"
  document.querySelector("#msg-div").style.display="none";
  document.querySelector("#middlePart").style.width="68vw";
  document.getElementById("middlePart").style.transition = "all 1.3s";
  document.getElementById("rightPart").style.transition = "all 1.3s";
  document.querySelector("#participants-div").style.display="initial";
})
document.querySelector("#cp").addEventListener("click", function(){
  document.querySelector("#cp").style.backgroundColor="#3483ed"
  document.querySelector("#cb").style.backgroundColor="transparent"
  document.querySelector("#msg-div").style.display="none";
  document.querySelector("#participants-div").style.display="initial";
  document.getElementById("rightPart").style.transition = "all 1.3s";
  document.getElementById("middlePart").style.transition = "all 1.3s";
})
document.querySelector("#people-logo").addEventListener("click", function(){
  document.querySelector("#rightPart").style.display="flex";
  document.querySelector("#cb").style.backgroundColor="transparent"
  document.querySelector("#cp").style.backgroundColor="#3483ed"
  document.querySelector("#msg-div").style.display="none";
  document.querySelector("#middlePart").style.width="68vw";
  document.getElementById("middlePart").style.transition = "all 1.3s";
  document.getElementById("rightPart").style.transition = "all 1.3s";
  document.querySelector("#participants-div").style.display="initial";
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})


// document.querySelector("#bgc-div").addEventListener("click",function(){
// //  peers[userId].close();
//   window.close();
//  })

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })
 
  // call.on("cut", ()=>{
  //   video.remove()
  // })
  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}



const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
}

const playStop = () => {
  console.log('object')
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo()
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}

const setMuteButton = () => {
  const html = `
  <i class="fa-solid fa-microphone"></i>
  `
  document.querySelector('#mic-div').innerHTML = html;
}

const setUnmuteButton = () => {
  const html = `
  <i class="fa-solid fa-microphone-slash"></i>
  `
  document.querySelector('#mic-div').innerHTML = html;
  document.querySelector('#mic-div').innerHTML.style.fontSize = "small";
}

const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
  `
  document.querySelector('#vdo-div').innerHTML = html;
}

const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>

  `
  document.querySelector('#vdo-div').innerHTML = html;
}


let username;
document.querySelector('#roomdets').addEventListener('click', function(){
      //  roomname = document.querySelector('#room').value;
      username = document.querySelector('#name').value;
      if(username.trim().length > 2){
        document.querySelector('.nameuser').textContent = username;
        document.querySelector('.overlay').style.display = 'none';
        // document.querySelector('#main').style.display = 'initial';
        socket.emit('name', username);
        document.querySelector(".peoples h2").textContent=username;
    //  var name=document.querySelector('#name').value;
    //     document.querySelector("#people-logo").textContent = name.length;
      }
   }
   )

  //  $('.button-effect').on('click', function(){
  //   $(this).addClass('button--click')
  //   setTimeout(
  //           function() {
  //               $('.button-effect').removeClass('button--click');
  //           },
  //           500);
  //   })



  var screenSharing = false
function startScreenShare() {
  if (screenSharing) {
      stopScreenSharing()
  }
  navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
      screenStream = stream;
      let videoTrack = screenStream.getVideoTracks()[0];
      videoTrack.onended = () => {
          stopScreenSharing()
      }
      if (peer) {
          let sender = currentPeer.peerConnection.getSenders().find(function (s) {
              return s.track.kind == videoTrack.kind;
          })
          sender.replaceTrack(videoTrack)
          screenSharing = true
      }
      console.log(screenStream)
  })
}

function stopScreenSharing() {
  if (!screenSharing) return;
  let videoTrack = local_stream.getVideoTracks()[0];
  if (peer) {
      let sender = currentPeer.peerConnection.getSenders().find(function (s) {
          return s.track.kind == videoTrack.kind;
      })
      sender.replaceTrack(videoTrack)
  }
  screenStream.getTracks().forEach(function (track) {
      track.stop();
  });
  screenSharing = false
}