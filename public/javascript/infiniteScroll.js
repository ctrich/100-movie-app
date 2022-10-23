
// let options = {
//     rootMargin: '0px',
//     threshold: 1.0,
// };

// const loadMore = async () => {
//     const page = (function() {
//         let page;
//         return function() {
//             return page++
//         }
//     })();
//     try {
//         const response = await fetch("/search?" + new URLSearchParams({
//             query: 'road',
//             page: 2,
//         }));
//         // await response.json();
//         console.log('This is the response',await response.json())
//     } catch(err) {
//         console.log("im an error", err);
//     }
// }

// let observer = new IntersectionObserver(loadMore, options);
// observer.observe(document.querySelector('.footer-logo'))