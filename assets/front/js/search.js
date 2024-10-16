document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.querySelector('#search-btn');
    const searchContainer = document.querySelector('#search-form-container');
    const searchInput = document.querySelector('#search-form-container input[type="text"]');
    const searchSuggestions = [
        "web sitesi arka plan krem",
        "web sitesi arka plan kozmetik",
        "AI",
        "dfghhj",
        "wefsdrgfgdfgh"
    ];

    // Toggle search container visibility
    searchToggle.addEventListener('click', function() {
        searchContainer.classList.toggle('active');
    });

    // Close the search container if clicking outside of it
    document.addEventListener('click', function(event) {
        if (!searchContainer.contains(event.target) && event.target !== searchToggle) {
            searchContainer.classList.remove('active');
        }
    });

    // Search input event listener
    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();
        let suggestionBox = document.querySelector('.suggestion-box');

        // Create a suggestion box if not exist
        if (!suggestionBox) {
            suggestionBox = document.createElement('ul');
            suggestionBox.classList.add('suggestion-box');
            suggestionBox.style.position = 'absolute';
            suggestionBox.style.top = '100%';
            suggestionBox.style.left = '0';
            suggestionBox.style.width = '100%';
            suggestionBox.style.background = '#333';
            suggestionBox.style.color = '#fff';
            suggestionBox.style.padding = '10px';
            suggestionBox.style.borderRadius = '5px';
            suggestionBox.style.listStyle = 'none';
            suggestionBox.style.zIndex = '10';
            searchContainer.appendChild(suggestionBox);
        }

        suggestionBox.innerHTML = '';

        if (value) {
            const suggestions = searchSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(value)
            );

            suggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('li');
                suggestionItem.textContent = suggestion;
                suggestionItem.style.cursor = 'pointer';
                suggestionItem.style.padding = '5px 0';

                suggestionItem.addEventListener('click', () => {
                    searchInput.value = suggestion;
                    suggestionBox.innerHTML = '';
                });

                suggestionBox.appendChild(suggestionItem);
            });
        } else {
            suggestionBox.innerHTML = '';
        }
    });
});
