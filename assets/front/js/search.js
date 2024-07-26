document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.querySelector('#search-btn');
    const searchContainer = document.querySelector('#search-form-container');
  
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
});
