const watchlist = document.querySelector('.watchlist-add');

//add media to watchlist
const addToWatchlist = async (e) => {
    e.preventDefault()
    const title = document.querySelector('.media-title').textContent;
    const image = '/' + document.querySelector('.details-poster').getAttribute('src').split('/')[6].split(' ')[0];
    const id = document.querySelector('.media-id').getAttribute('data-id');
    const type = document.querySelector('.media-type').getAttribute('data-type');
    
    try {
      await fetch('/watchlist/update', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          title: title,
          type: type,
          image: image,
        })
      });
      watchlist.classList.toggle('true');
      watchlist.classList.toggle('false');
      }catch(err) {
      console.log(err);
    }
}

watchlist.addEventListener('click', addToWatchlist);