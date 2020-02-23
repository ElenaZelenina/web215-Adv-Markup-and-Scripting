const containerId = 'page_content';
const loadPage = (pageName) => {
    const container = document.getElementById(containerId);
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            container.innerHTML = this.responseText;
        }
    }
    request.open('GET', pageName);
    request.send();
    return false;
}

document.addEventListener('DOMContentLoaded', () => loadPage('includes/home.html'));
