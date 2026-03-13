document.addEventListener('DOMContentLoaded', () => {
    
    // Récupération des éléments du formulaire et du message
    const form = document.getElementById('interest-form');
    const successMessage = document.getElementById('success-message');

    // NOUVEAU : Ton lien Formspree exact est inséré ici
    const endpoint = "https://formspree.io/f/xojkleye";

    // Quand quelqu'un clique sur le bouton de soumission
    form.addEventListener('submit', async (event) => {
        // Empêche le rechargement par défaut de la page
        event.preventDefault();

        // Récupération des données du formulaire
        const formData = new FormData(form);

        try {
            // Envoie les données vers ton endpoint Formspree
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    // C'est très important de préciser qu'on s'attend à du JSON
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Si la soumission est réussie :
                
                // Cache le formulaire
                form.classList.add('hidden');
                // Montre le message de succès
                successMessage.classList.remove('hidden');
            } else {
                // Si le serveur Formspree renvoie une erreur
                alert("Aïe, il y a eu une erreur avec le formulaire. Réessaie.");
            }
        } catch (error) {
            // Si le problème vient de la connexion réseau (pas d'internet, etc.)
            console.error('Erreur Réseau:', error);
            alert("Aïe, une erreur s'est produite. Vérifie ta connexion internet.");
        }
    });
});
