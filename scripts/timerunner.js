window.onload = () => {
    const timeSpan = document.getElementById('timespan');
    const lastDate = new Date('5/12/2020 00:00:00');
    const currentDate = new Date();

    const diff = lastDate.getTime() - currentDate.getTime();
    timeSpan.innerText = Math.floor(diff / (60000 * 60 * 24));
}