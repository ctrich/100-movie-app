let options = {
    rootMargin: '0px',
    threshold: 1.0,
};

const loadMore = async () => {
    console.log('its working')
    const page = (function() {
        let page;
        return function() {
            return page++
        }
    })();
    try {
        const response = await fetch("/search", {
            body: JSON.stringify({
                page: page,
            })
        })
    } catch(err) {
        console.log(err);
    }
}

let observer = new IntersectionObserver(loadMore, options);
observer.observe(document.querySelector('.footer-logo'))