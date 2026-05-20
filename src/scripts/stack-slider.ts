const container = document.querySelector('[data-stack-carousel]') as HTMLElement | null;
const btnPrev = document.querySelector('[data-stack-prev]') as HTMLElement | null;
const btnNext = document.querySelector('[data-stack-next]') as HTMLElement | null;

if (container) {
	// ホバーでアニメーション一時停止
	container.addEventListener('mouseenter', () => {
		container.classList.add('paused');
	});

	container.addEventListener('mouseleave', () => {
		container.classList.remove('paused');
	});

	// スクロール中のフラグ
	let isScrolling = false;

	// ボタンクリック時もアニメーション一時停止（スクロール可能）
	const handleButtonClick = (direction: 'prev' | 'next') => {
		if (isScrolling) return; // スクロール中は処理を無視
		
		isScrolling = true;
		container.classList.add('paused');
		
		const cardWidth = 140;
		const gap = 24;
		const scrollDistance = cardWidth + gap;

		if (direction === 'next') {
			container.scrollBy({ left: scrollDistance, behavior: 'smooth' });
		} else {
			container.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
		}

		// スクロール完了後にアニメーション再開
		setTimeout(() => {
			isScrolling = false;
			// アニメーションをリセットして再スタート
			container.classList.remove('paused');
			if (container) {
				// CSSアニメーションを強制的に再スタート
				container.style.animation = 'none';
				// リフローを強制
				void container.offsetWidth;
				// アニメーション再度適用
				container.style.animation = '';
			}
		}, 700);
	};

	btnPrev?.addEventListener('click', () => handleButtonClick('prev'));
	btnNext?.addEventListener('click', () => handleButtonClick('next'));
}
