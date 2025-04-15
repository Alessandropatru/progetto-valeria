function loadPage(event) {
    event.preventDefault();
    const page = event.target.getAttribute('data-page');
    const content = document.getElementById('dynamic-content');

    if (page === 'index.html') {
        fetch('index.html')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');

                // Estrai solo il contenuto principale (escludendo navbar e footer)
                const mainContent = doc.querySelector('#dynamic-content').innerHTML;
                content.innerHTML = mainContent;
            })
            .catch(error => console.error('Errore nel caricamento della pagina:', error));
    } else if (page === 'curriculum.html') {
        fetch('curriculum.html')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');

                // Estrai il contenuto del body
                const bodyContent = doc.body.innerHTML;
                content.innerHTML = bodyContent;
            })
            .catch(error => console.error('Errore nel caricamento della pagina:', error));
    } else if (page === 'contatti.html') {
        fetch('contatti.html')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');

                // Rimuovi la navbar e il footer dal contenuto caricato
                const navbar = doc.querySelector('nav');
                const footer = doc.querySelector('footer');
                if (navbar) navbar.remove();
                if (footer) footer.remove();

                // Estrai il contenuto del body senza navbar e footer
                const bodyContent = doc.body.innerHTML;
                content.innerHTML = bodyContent;
            })
            .catch(error => console.error('Errore nel caricamento della pagina:', error));
    }
}
function loadPage(event) {
    event.preventDefault();
    const page = event.target.getAttribute('data-page');
    const content = document.getElementById('dynamic-content');
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');

    fetch(page)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Estrai solo il contenuto principale
            const mainContent = doc.querySelector('#dynamic-content');
            if (mainContent) {
                content.innerHTML = mainContent.innerHTML;

                // Carica dinamicamente il foglio di stile per contatti.html
                const existingStyle = document.getElementById('dynamic-style');
                if (existingStyle) existingStyle.remove(); // Rimuovi il foglio di stile precedente

                const style = document.createElement('link');
                style.rel = 'stylesheet';
                style.id = 'dynamic-style';

                if (page === 'contatti.html') {
                    style.href = 'new.css';
                    if (navbar) navbar.style.display = 'none';
                    if (footer) footer.style.display = 'none';
                } else {
                    style.href = 'style.css'; // Foglio di stile principale
                    if (navbar) navbar.style.display = '';
                    if (footer) footer.style.display = '';
                }

                document.head.appendChild(style);
            } else {
                console.error('Errore: #dynamic-content non trovato nella pagina caricata.');
            }
        })
        .catch(error => console.error('Errore nel caricamento della pagina:', error));
}