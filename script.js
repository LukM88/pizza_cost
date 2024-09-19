const searchInput = document.querySelector('.input')
const resultsList = document.getElementById('results-list');
const clearButton = document.getElementById('clear')

searchInput.addEventListener("input", (e) => {
    let value = e.target.value

    if (value && value.trim().length > 0){
        // Funkcja do wczytywania pliku data.json
        fetch('data.json')
        .then(response => response.json())
        .then(data => {
            setList(data.filter(record => {
                return record.street.includes(value)
            }))
        })
        .catch(error => console.error('Błąd przy wczytywaniu danych:', error));
    }
})

clearButton.addEventListener("click", () => {
    clearList()
})

// Funkcja do rozwijania szczegółów
function toggleDetails(element) {
    var details = element.nextElementSibling;
    if (details.style.display === "block") {
        details.style.display = "none";
    } else {
        details.style.display = "block";
    }
}

function clearList(){
    while (resultsList.firstChild){
        resultsList.removeChild(resultsList.firstChild)
    }
}

function setList(results){
    clearList()
    // Przeiteruj przez każdy element w pliku JSON i dodaj go do listy wyników
    results.forEach(item => {
        // Tworzenie elementów listy
        let listItem = document.createElement('li');
        let titleDiv = document.createElement('div');
        let detailsDiv = document.createElement('div');
        let cityLabel = document.createElement('div')
        let streetLabel = document.createElement('div')
        let costLabel = document.createElement('div')
        let regionLabel = document.createElement('div')
        
        // Ustawienia dla tytułu i szczegółów
        titleDiv.classList.add('result-title');
        titleDiv.textContent = item.street;
        titleDiv.onclick = function() { toggleDetails(this); };
        detailsDiv.classList.add('result-details');
        
        costLabel.textContent = "Koszt dostawy:".concat(' ', item.cost, 'zł')
        cityLabel.textContent = "Miejscowość:".concat(' ', item.city)
        streetLabel.textContent = "Ulica:".concat(' ', item.street)
        regionLabel.textContent = "Region dostawy:".concat(' ', item.region)
        // Dodanie elementów do listy
        listItem.appendChild(titleDiv);
        listItem.appendChild(detailsDiv);
        detailsDiv.appendChild(cityLabel)
        detailsDiv.appendChild(regionLabel)
        detailsDiv.appendChild(streetLabel)
        detailsDiv.appendChild(costLabel)
        resultsList.appendChild(listItem);
    });
}
