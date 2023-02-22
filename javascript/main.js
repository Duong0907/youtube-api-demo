var playerModal = document.getElementById('player-container');
var html = document.getElementsByTagName('html')[0];
var videoPlayer = document.getElementById('video-player');
var videoPlayerTitle = document.getElementById('video-player-title');
var searchInput = document.getElementById('search-input');
var searchBtn = document.getElementById('search-btn');
var videoList = document.getElementById('videos-list')


function getVideos(search) {
    const apiKey = 'AIzaSyAbx0aRZRzIhsDZ4M3aLYPIvEamA2GMze8';
    var maxResults = 10;
    var query = `?key=${apiKey}&part=snippet&type=video&maxResults=${maxResults}&q=${search}`;

    return fetch('https://www.googleapis.com/youtube/v3/search' + query)
        .then(res => res.json())
        .then(res => {
            var videos = res['items'].map(item => {
                return {
                    id: item['id']['videoId'],
                    title: item['snippet']['title'],
                    thumbnail: item['snippet']['thumbnails']['high']['url'],
                    channelId: item['snippet']['channelId'],
                    channelTitle: item['snippet']['channelTitle']
                }
            });
            return videos;
        })
        .catch(err => err)
}

function makeVideoCard(video) {
    var template = document.getElementById('video-card-template');
    var newCard = template.cloneNode(true);

    newCard.classList.remove('hidden');
    newCard.getElementsByClassName('video-thumbnail')[0].src = video.thumbnail;
    newCard.getElementsByClassName('video-title')[0].innerHTML = video.title;
    newCard.getElementsByClassName('channel-title')[0].innerHTML = video.channelTitle;
    newCard.id = video.id;
    videoList.appendChild(newCard);

    return newCard;
}

function setVideoClickEvent(videoCard) {
    videoCard.addEventListener('click', e => {
        videoPlayerTitle.innerHTML = 'Video'
        videoId = e.target.closest('.video-card').id;
        var newIframe = `<iframe id="youtube-iframe" width="420" height="315"  allowfullscreen = true src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1">  </iframe>`;
        videoPlayer.innerHTML = newIframe;
    });
}
// width="420" height="315"

function render(videos) {
    videos.forEach(video => {
        var videoCard = makeVideoCard(video);
        setVideoClickEvent(videoCard)
    });
}

searchBtn.addEventListener('click', e => {
    var search = searchInput.value;
    console.log(search);

    getVideos(search)
        .then(videos => {
            videoList.innerHTML = '';
            render(videos);
        })
        .catch(err => console.log(err))
})




// var videos = [
//     {
//         id: 'CizhwA-u8nE',
//         title: 'THIS CARD IS GAME-BREAKING! The NEW DARK MAGICIAN FUSION Deck Is GOD TIER In Yu-Gi-Oh Master Duel!',
//         thumbnail: 'https://i.ytimg.com/vi/CizhwA-u8nE/hqdefault.jpg',
//         channelId: 'UCJEPf8YzOQVDDkw1f886jXg',
//         channelTitle: 'TeamSamuraiX1'
//     },
//     {

//         id: '5HdAPeX_-VM',
//         title: 'YuGiOh! Anime Collection',
//         thumbnail: 'https://i.ytimg.com/vi/5HdAPeX_-VM/hqdefault.jpg',
//         channelId: 'UCCn62cYVpl0e_GN-yo1H9yQ',
//         channelTitle: 'mashed'
//     },
//     {
//         id: 'Sg8t8IseD6A', title: 'ABYSS ACTOR - Ten Minute Testing',
//         thumbnail: 'https://i.ytimg.com/vi/Sg8t8IseD6A/hqdefault.jpg',
//         channelId: 'UCUkuW81Ny_nfZdo9YYULoQQ',
//         channelTitle: 'MBT Yu-Gi-Oh!'
//     },
//     {
//         id: 'UiLXuLhP1VQ',
//         title: 'SEARCH For Yugioh&#39;s RAREST Collector Rares EVER MADE!',
//         thumbnail: 'https://i.ytimg.com/vi/UiLXuLhP1VQ/hqdefault.jpg',
//         channelId: 'UCGv5B6UkLMVYHb5SR48ZqFg',
//         channelTitle: 'Ruxin34'
//     },
//     {
//         id: '2Tgvbethafc',
//         title: 'Yugioh Board Breakers Tier List for February 2023! | Post Beware of Traptrix',
//         thumbnail: 'https://i.ytimg.com/vi/2Tgvbethafc/hqdefault.jpg',
//         channelId: 'UCPTztVQoVtBCge9fFp7d1HA',
//         channelTitle: 'TheCaliEffect [King Of Games]'
//     }
// ]


// videoList.innerHTML = '';
//             render(videos);