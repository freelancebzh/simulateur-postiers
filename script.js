function validerAccueil() {
    document.getElementById('modal-accueil').style.display = 'none';
}

function calculer() {
    let rfr = parseFloat(document.getElementById('rfr').value) || 0;
    let parts = parseFloat(document.getElementById('parts').value) || 0;
    let nbEnfants = parseInt(document.getElementById('enfants').value) || 0;
    let nbJours = parseInt(document.getElementById('nb-jours').value) || 0;
    let montantSaisi = parseFloat(document.getElementById('montant-location').value) || 0;
    
    if(document.getElementById('parent').checked) parts += 0.5;
    if(document.getElementById('handicape').checked) parts += 0.5;
    if(document.getElementById('anciennete').checked) parts += 0.5;

    let qf = parts > 0 ? (rfr / parts) : 0;
    let taux = 0, aideVacances = 0, aideJour = 0, aideSejour = 0, aideLinguistique = 0, aideCesu = 0;

    if (qf <= 7900) { taux = 0.50; aideVacances = 650; aideJour = 9.00; aideSejour = 15.00; aideLinguistique = 24.00; aideCesu = 13.00; }
    else if (qf <= 10100) { taux = 0.45; aideVacances = 600; aideJour = 8.80; aideSejour = 14.50; aideLinguistique = 23.20; aideCesu = 12.00; }
    else if (qf <= 12000) { taux = 0.41; aideVacances = 600; aideJour = 8.60; aideSejour = 14.00; aideLinguistique = 22.40; aideCesu = 11.00; }
    else if (qf <= 13900) { taux = 0.38; aideVacances = 500; aideJour = 8.40; aideSejour = 13.50; aideLinguistique = 21.70; aideCesu = 10.00; }
    else if (qf <= 15500) { taux = 0.35; aideVacances = 500; aideJour = 7.80; aideSejour = 12.50; aideLinguistique = 20.10; aideCesu = 9.00; }
    else if (qf <= 17600) { taux = 0.32; aideVacances = 400; aideJour = 7.50; aideSejour = 11.60; aideLinguistique = 18.70; aideCesu = 8.00; }
    else if (qf <= 19700) { taux = 0.29; aideVacances = 400; aideJour = 7.00; aideSejour = 10.80; aideLinguistique = 17.40; aideCesu = 7.00; }
    else if (qf <= 22500) { taux = 0.26; aideVacances = 300; aideJour = 5.00; aideSejour = 9.00; aideLinguistique = 14.60; aideCesu = 6.50; }
    else if (qf <= 27400) { taux = 0.23; aideVacances = 300; aideJour = 3.50; aideSejour = 7.50; aideLinguistique = 12.20; aideCesu = 6.00; }
    else { taux = 0.20; aideVacances = 200; aideJour = 3.30; aideSejour = 6.30; aideLinguistique = 10.20; aideCesu = 5.00; }

    let baseReduite = Math.min(montantSaisi, 1200);
    let economie = baseReduite * (taux / (1 + taux));
    let coutApresReduction = (baseReduite - economie) + Math.max(0, montantSaisi - 1200);
    
    let exempleCanon = "";
    if (montantSaisi > 0 && nbJours > 0 && nbEnfants > 0) {
        let aideEnfantsTotale = (aideJour * nbEnfants * nbJours);
        let partHorsAbondement = Math.max(0, montantSaisi - 1200);
        let coutFinal = Math.max(0, coutApresReduction - aideVacances - aideEnfantsTotale);
        exempleCanon = `
            <div style="background: #fff9c4; padding: 20px; border-radius: 10px; border: 2px solid #fbc02d; margin-top: 20px;">
                <p>Vous avez indiqué être parti <strong>${nbJours} jours</strong> pour <strong>${montantSaisi.toFixed(2)}€</strong> avec vos <strong>${nbEnfants} enfants</strong> en payant le séjour en chèques vacances, vous avez :</p>
                <ul style="line-height: 1.8;">
                    <li><strong>${((taux / (1 + taux)) * 100).toFixed(0)}%</strong> de réduction sur les ${baseReduite.toFixed(2)}€.</li>
                    <li><strong>${partHorsAbondement.toFixed(2)}€</strong> de reste à charge (la somme au dela des 1200€ que vous ne pouvez pas payer en chèques vacances).</li>
                    <li><strong>${aideVacances.toFixed(2)}€</strong> d'aide vacances virée sur votre compte dès votre retour.</li>
                    <li><strong>${aideEnfantsTotale.toFixed(2)}€</strong> d'aide séjour enfants accompagnés grâce à vos ${nbEnfants} enfants (aide versée via complément sur le bulletin de salaire).</li>
                </ul>
                <div style="background: #fbc02d; padding: 15px; border-radius: 5px; text-align: center; font-weight: bold; font-size: 1.2em; margin-top: 15px;">
                    VOS VACANCES NE VOUS COUTENT PLUS QUE ${coutFinal.toFixed(2)}€ ! <br>
					(et si c'est 0€ c'est que vous gagnez de l'argent)
                </div>
            </div>`;
    }

    let texteEnfant = nbEnfants > 0 
        ? `• Vos <strong>${nbEnfants}</strong> enfants partent ${nbJours} jours au camping avec un proche ? Vous touchez <strong>${(nbEnfants * nbJours * aideJour).toFixed(2)}€</strong>.`
        : `• Le parent d'un enfant mineur dans votre tranche est aidé à hauteur de <strong>${aideJour.toFixed(2)}€/j</strong> facturé.`;
		

    document.getElementById('total-parts').innerHTML = `
        <div style="background: #e7f3ff; padding: 15px; border-radius: 10px; border-left: 5px solid #007bff; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #007bff; margin-bottom: 10px;">🏖️ VACANCES ET SEJOURS</h4>
            <div style="font-weight: bold; margin-bottom: 5px;">💸 Chèques vacances</div>
            <p>
                => Pour vous un abondement de <strong>${(taux * 100).toFixed(0)}%</strong><br>
				➔ Vous épargnez 100€ = Vous disposez de <strong>${(100 * (1 + taux)).toFixed(0)}€ </strong><br>
				(merci La Poste).<br>
                • Budget 30€ (Restaurant) : Vous ne payez plus <strong>QUE</strong> ${(30 * (1 - (taux / (1 + taux)))).toFixed(2)}€.<br>
                ${montantSaisi > 0 ? `• Budget Location indiqué (${montantSaisi}€) :<br>- Base abondée (jusqu'à 1200€) : Vous économisez <strong>${economie.toFixed(2)}€ sur le séjour initialement à (${montantSaisi}€)</strong>.<br>
				(NB : au-delà de 1200€ : pas d' abondement)<br>
				➔ <strong>Coût net après abondement : ${coutApresReduction.toFixed(2)}€</strong>.` : `• Budget Location : <em>Indiquez un montant pour voir votre réduction.</em>`}<br>
                Réduction réelle : - <strong>${((taux / (1 + taux)) * 100).toFixed(2)}%</strong> 
                <br> et cela est valable sur <strong>TOUS</strong> vos achats loisirs (ciné, parcs...), vacances (avions, campings...), la restauration (Mcdo, Buffalo,...) mais <strong>EGALEMENT LE PEAGE</strong> <BR>
				(offre télépéage avec chargement par chèques vacances)
            </p>
            <hr style="border: 0; border-top: 1px solid #cce5ff; margin: 15px 0;">
            <div style="font-weight: bold; margin-bottom: 5px;">💸 Aide aux vacances (Vacances Timbrés)</div>
            <p>• Aide versée : <strong>${aideVacances}€</strong> <br>(c'est un virement effectué 1fois/an/postier après présentation de la facture).</p>
            <hr style="border: 0; border-top: 1px solid #cce5ff; margin: 15px 0;">
            <div style="font-weight: bold; margin-bottom: 5px;">💸 Séjour enfant accompagné</div>
            <p><em>(Limite de 45 nuits par an et par enfant)</em><br>${texteEnfant}</p>
            ${exempleCanon}
        </div>
        
        <div style="background: #f4e7ff; padding: 15px; border-radius: 10px; border-left: 5px solid #9c27b0; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #9c27b0; margin-bottom: 10px;">🎒 Séjours éducatifs (aides par postier salarié)</h4><br>
            <p>• <strong>${aideSejour.toFixed(2)}€</strong> par nuitée de classe découverte et par enfant.<br>
			•  <strong>${aideLinguistique.toFixed(2)}€</strong> par nuitée de séjour linguistique et par enfant.</p>
        </div>

        <div style="background: #e8f5e9; padding: 15px; border-radius: 10px; border-left: 5px solid #4caf50; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #4caf50; margin-bottom: 10px;">🏠 Vie quotidienne (50 chèques/an/postier)</h4><br>
            <p>• Aide : <strong>${aideCesu.toFixed(2)}€ par chèque</strong> (virtuel ou papier) <br>
			(soit <strong>${(aideCesu * 50).toFixed(2)}€</strong> aide/an).<br><br>
            • <strong>Exemple concret :</strong> 1h de ménage à 30€ :<br>
			- Votre aide est de <strong>${(aideCesu * 2).toFixed(2)}€</strong>.<br>
- Vous payez <strong>${(30 - (aideCesu * 2)).toFixed(2)}€</strong> net.<br><br>
➔ Après crédit d'impôt (50%), votre coût réel tombe à <strong>${((30 - (aideCesu * 2)) * 0.5).toFixed(2)}€/heure</strong> pour une maison et/ou un jardin propres.</p>
            <div style="font-size: 0.9em; color: #333; margin-top: 10px; border-top: 1px solid #c8e6c9; padding-top: 5px;"><strong>⚠️ Rappel :</strong> Via les offres partenaires La Poste vous bénéficiez de frais de dossier offerts et n'avez aucune démarche URSSAF.</div>
            <div style="background: #fff3e0; padding: 15px; border-radius: 10px; border-left: 5px solid #ff9800; margin-top: 15px;">
                <h4 style="margin-top: 0; color: #ff9800; margin-bottom: 10px;">👶 Parentalité (Aides complémentaires)</h4><br>
                <p>• 0 à 4 ans : <strong>84 chèques</strong> /an / enfant <br>
				• 4 à 11 ans : <strong>55 chèques</strong> /an / enfant.<br><br>
                ➔ <strong>baby-sitting / centre de loisir le mercredi :</strong> Vous réglez 150€/mois :<br>
- Votre prise en charge est de <strong>${(aideCesu * 10).toFixed(2)}€</strong>.<br>
- Vous ne payez que <strong>${(150 - (aideCesu * 10)).toFixed(2)}€</strong> net.<br>
- si l'enfant a moins de 6 ans, vous bénéficiez du crédit d'impôt (50%), votre coût réel mensuel tombe à <strong>${((150 - (aideCesu * 10)) * 0.5).toFixed(2)}€</strong>.<br><br>
                ➔ Ces chèques sont cumulables avec votre dotation annuelle de vie quotidienne (et dans les fais vous pouvez utiliser ces chèques parent' pour payer le ménage).<br><br>
				➔ Notez que pour les vacances scolaires il y un autre type d'aides pour les stages de sports et le centre aéré</p>
            </div>
        </div>
        
        <div style="background: #fdf2e9; padding: 15px; border-radius: 10px; border-left: 5px solid #e67e22; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #e67e22; margin-bottom: 10px;">💰 Épargne & Avantages Bancaires</h4><br>
            <p>• <strong>Plan d'Épargne Groupe :</strong> Optimisez votre épargne avec les avantages La Poste jusqu'à 1500€/an avec plus de 10 opportunités de déblocage avant les 5 ans.<br><br>
			• <strong>Prêts à la consommation :</strong> Taux préférentiels réservés aux postiers, accessibles même si vous n'êtes pas client de la Banque Postale.<br><br>
			• <strong>Services La Banque Postale :</strong> Disposez d'une formule de compte sécurisée à moins de 17€ par trimestre, du remboursement de la carte bancaire et de frais réduits le tout pour au final ne pas payer plus de <strong>2€/mois</strong>.</p>
        </div>
        
        <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; border-left: 5px solid #9e9e9e; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #616161; margin-bottom: 10px;">ℹ️ AUTRES AIDES DISPONIBLES 🎉</h4><br>
            <p style="font-size: 0.95em;">
			• 🏖️ aide séjours enfants accompagnés pour vos enfants de 18 à 20 ans de ${aideJour.toFixed(2)}€ <strong>s'ils voyagent avec vous</strong>.<br><br>
			• ⚽ Centres de loisirs / stages pendant les vacances scolaires : Financement de 1,50€ à 7€ par jour.(selon votre tranche)<br><br>
			• 🏢 Logement : Partenariats logements étudiants <br>
			Paris ET Province.<br><br>
			• 📖 Primes de rentrée du CP aux études supérieures <br>
			(pour les tranches 1 & 2)<br><br>
			• 🩼 Handicap : Aides spécifiques pour enfants de moins de 20 ans.<br><br>
			• 🐕‍🦺 Aidants : 1.830€ via chèques emploi service universel préfinancés + aide au répit.<br><br>
			• 🧹 Aide à domicile et personnes fragilisées : 6€ à 23€ par heure, jusqu'à 15 heures par mois.<br><br>
			• 🐻 Participation frais de garde (si vous ne prenez pas les CESUs parentalité : Aide de 275€ à 1.092€ par an (selon votre tranche).<br><br>
			• 🧳 Aide aux colonies : Montant maximum pouvant atteindre 1.300€.<br><br>
			• 🏓 Activités sportives et culturelles : aides annuelles de 30€ pour le/la conjointe, 60€ pour les enfants jusqu'à 25 ans et 80€ pour vous.<br><br>
			• 👨🏻‍🏫 Prof Express : Soutien et cours en ligne GRATUIT du CP à la terminale pour vos enfants.</p><br>
        </div>
    `;
    document.getElementById('resultats-zone').style.display = 'block';
}
