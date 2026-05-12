const container = document.querySelector('[data-stack-carousel]');
const btnPrev = document.querySelector('[data-stack-prev]');
const btnNext = document.querySelector('[data-stack-next]');

if (container) {
	const scrollBy = () => container.clientWidth * 0.6;
	btnPrev?.addEventListener('click', () => {
		container.scrollBy({ left: -scrollBy(), behavior: 'smooth' });
	});
	btnNext?.addEventListener('click', () => {
		container.scrollBy({ left: scrollBy(), behavior: 'smooth' });
	});

	// optional auto-play on desktop
	let autoplayId: number | undefined;
	const startAuto = () => {
		if (window.matchMedia('(min-width: 640px)').matches) {
			autoplayId = window.setInterval(() => {
				container.scrollBy({ left: scrollBy(), behavior: 'smooth' });
			}, 4000);
		}
	};
	const stopAuto = () => {
		if (autoplayId) {
			clearInterval(autoplayId);
			autoplayId = undefined;
		}
	};

	container.addEventListener('mouseenter', stopAuto);
	container.addEventListener('mouseleave', startAuto);

	startAuto();
}
