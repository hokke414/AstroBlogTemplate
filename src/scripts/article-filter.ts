const normalize = (value) => String(value ?? '').toLowerCase().normalize('NFKC').trim();

const searchInput = document.querySelector('[data-search-input]');
const clearButton = document.querySelector('[data-clear-search]');
const tagButtons = [...document.querySelectorAll('[data-tag]')];
const cards = [...document.querySelectorAll('[data-search]')];
const resultCount = document.querySelector('[data-result-count]');
const emptyState = document.querySelector('[data-empty-state]');
const activeTags = new Set();

const updateResults = () => {
	const query = normalize(searchInput?.value);
	let visibleCount = 0;

	cards.forEach((card) => {
		const searchableText = normalize(card.getAttribute('data-search'));
		const cardTags = String(card.getAttribute('data-tags') ?? '')
			.split('||')
			.map((tag) => normalize(tag))
			.filter(Boolean);
		const matchesQuery = query.length === 0 || searchableText.includes(query);
		const matchesTags = activeTags.size === 0 || cardTags.some((tag) => activeTags.has(tag));
		const shouldShow = matchesQuery && matchesTags;

		card.classList.toggle('is-hidden', !shouldShow);
		card.toggleAttribute('hidden', !shouldShow);

		if (shouldShow) {
			visibleCount += 1;
		}
	});

	if (resultCount) {
		resultCount.textContent = String(visibleCount);
	}

	if (emptyState) {
		emptyState.hidden = visibleCount !== 0;
	}
};

tagButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const tag = normalize(button.getAttribute('data-tag'));

		if (activeTags.has(tag)) {
			activeTags.delete(tag);
			button.classList.remove('is-active');
			button.setAttribute('aria-pressed', 'false');
		} else {
			activeTags.add(tag);
			button.classList.add('is-active');
			button.setAttribute('aria-pressed', 'true');
		}

		updateResults();
	});
});

searchInput?.addEventListener('input', updateResults);

clearButton?.addEventListener('click', () => {
	if (searchInput) {
		searchInput.value = '';
	}

	activeTags.clear();
	tagButtons.forEach((button) => {
		button.classList.remove('is-active');
		button.setAttribute('aria-pressed', 'false');
	});

	updateResults();
});

updateResults();