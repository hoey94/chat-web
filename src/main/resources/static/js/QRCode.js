function initQrcode() {
// JavaScript
    const rewardWrapper = document.querySelector('.reward-wrapper');
    const rewardLogo = document.querySelector('.reward-logo');
    const rewardInfo = document.querySelector('.reward-info');
    const rewardCode = document.querySelector('.reward-code');

    rewardLogo.addEventListener('mousemove', (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const w = rewardWrapper.offsetWidth;
        const h = rewardWrapper.offsetHeight;
        const translateX = (x - w / 2) * 0.1;
        // const translateX = "-75px";
        const translateY = (y - h / 2) * 0.1;
        // const translateY = "-85px";
        rewardCode.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.2)`;
    });

    rewardLogo.addEventListener('mouseenter', () => {
        rewardInfo.style.visibility = 'visible';
        rewardInfo.style.opacity = '1';
    });

    rewardLogo.addEventListener('mouseleave', () => {
        rewardInfo.style.visibility = 'hidden';
        rewardInfo.style.opacity = '0';
        rewardCode.style.transform = 'translate(0) scale(1)';
    });
}