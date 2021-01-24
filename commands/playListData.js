let playListData = [];

let setPlayListData = function(guild, song, queueContruct, queue) {
  playListData[0] = guild;
  playListData[1] = song;
  playListData[2] = queueContruct;
  playListData[3] = queue; 
}

let getPlayListData =  function() {
  return playListData;
}

module.exports = {
  playListData: playListData,
  setPlayListData: setPlayListData,
  getPlayListData: getPlayListData,
};