// Block ads, pop-ups and redirects

// Block ads
function blockAds() {
    const adsContainer = document.getElementById('ads');
    if (adsContainer) {
        const adElements = adsContainer.getElementsByTagName('iframe');
        for (let i = 0; i < adElements.length; i++) {
            adElements[i].remove();
        }
    }
}

// Block pop-ups
function blockPopUps() {
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.noPopup) {
            event.preventDefault();
            return;
        }
    });
    window.history.pushState({ noPopup: true }, null, window.location.href);
}

// Block redirects
function blockRedirects() {
    const originalLocation = window.location;
    const redirectLocation = (url) => {
        if (url !== originalLocation.pathname) {
            originalLocation.assign(url);
        }
    };
    window.location = originalLocation; // Ensure we're on the desired page
    window.addEventListener('popstate', (event) => {
        redirectLocation(event.target.location.href);
    });
}

blockAds();
blockPopUps();
blockRedirects();
