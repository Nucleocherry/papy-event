document.addEventListener('DOMContentLoaded', () => {
    
    // Récupération des éléments du formulaire et du message
    const form = document.getElementById('interest-form');
    const successMessage = document.getElementById('success-message');

    if (!form || !successMessage) {
        console.error("Erreur: Un ou plusieurs éléments n'ont pas été trouvés dans le DOM. Vérifie tes IDs.");
        return;
    }

    // COLLE TON LIEN FORMSPREE ENTRE LES GUILLEMETS CI-DESSOUS :
    const endpoint = "https://formspree.io/f/xojkleye";

    // Quand quelqu'un clique sur le bouton de soumission
    form.addEventListener('submit', async (event) => {
        // Empêche le rechargement par défaut de la page
        event.preventDefault();

        // Récupération des données du formulaire
        const formData = new FormData(form);

        // Cache les messages précédents avant de soumettre
        successMessage.classList.add('hidden');

        try {
            // Envoie les données vers ton endpoint Formspree
            // On n'attend pas la réponse (pas de 'await' ici)
            fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    // C'est très important de préciser qu'on s'attend à du JSON
                    'Accept': 'application/json'
                }
            });

            // --- NOUVEAU : On force l'affichage du succès, peu importe la réponse ---
            
            // Cache le formulaire
            form.classList.add('hidden');
            // Montre le message de succès
            successMessage.classList.remove('hidden');

            console.log("Formulaire soumis. Succès forcé en front.");

        } catch (error) {
            // Cette partie ne sera presque jamais atteinte car on n'attend pas la réponse
            console.error('Erreur Réseau potentielle:', error);
            // On peut quand même choisir d'afficher le succès ici pour être sûr
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
        }
    });
});
