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
      })
      watchlist.classList.toggle('true');
      watchlist.classList.toggle('false');
      }catch(err) {
      console.log(err);
    }
}

watchlist.addEventListener('click', addToWatchlist);

// (e) => {
//   e.preventDefault();
//   var selected_id = this.id;

//   $.ajax({
//     url: '/tv/84773-the-lord-of-the-rings-the-rings-of-power/toggle-list-item?translate=false&language=en-US',
//     type: 'PUT',
//     data: {
//       type: selected_id
//     }
//   }).fail(function() {
//     showError('There was a problem toggling this item.');
//   }).done(function(response) {
//     if (response.failure) {
//       showError('There was a problem toggling this item.');
//     }

//     if (response.success) {
//       $('#' + selected_id + ' span').toggleClass('true');
//       $('#' + selected_id + ' span').find('span.text').html(response.button_text).hide(0).fadeIn("fast");
//     }
//   });
// }