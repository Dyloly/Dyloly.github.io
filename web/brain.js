// Kai dokumentas (HTML) yra pilnai įkeltas ir paruoštas
document.addEventListener('DOMContentLoaded', function() {
    // Gauname nuorodą į mygtuką pagal jo ID
    const mygtukas = document.getElementById('pakeistiTekstaMygtukas');
    // Gauname nuorodą į paragrafą pagal jo ID
    const tekstasParagrafas = document.getElementById('tekstas');

    // Pridedame įvykių klausytoją mygtukui.
    // Kai mygtukas paspaudžiamas ('click'), bus vykdoma nurodyta funkcija.
    mygtukas.addEventListener('click', function() {
        // Pakeičiame paragrafo tekstinį turinį
        tekstasParagrafas.textContent = "Tekstas sėkmingai pakeistas JavaScript pagalba!";
    });
});