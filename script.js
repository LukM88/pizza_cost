// Funkcja do wczytywania pliku data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const resultsList = document.getElementById('results-list');
        
        // Przeiteruj przez każdy element w pliku JSON i dodaj go do listy wyników
        data.forEach(item => {
            // Tworzenie elementów listy
            const listItem = document.createElement('li');
            const titleDiv = document.createElement('div');
            const detailsDiv = document.createElement('div');
            
            // Ustawienia dla tytułu i szczegółów
            titleDiv.classList.add('result-title');
            titleDiv.textContent = item.title;
            titleDiv.onclick = function() { toggleDetails(this); };

            detailsDiv.classList.add('result-details');
            detailsDiv.textContent = item.details;

            // Dodanie elementów do listy
            listItem.appendChild(titleDiv);
            listItem.appendChild(detailsDiv);
            resultsList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Błąd przy wczytywaniu danych:', error));

// Funkcja do rozwijania szczegółów
function toggleDetails(element) {
    var details = element.nextElementSibling;
    if (details.style.display === "block") {
        details.style.display = "none";
    } else {
        details.style.display = "block";
    }
}
