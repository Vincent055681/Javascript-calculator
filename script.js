const calculator = document.querySelector('.calculator');
const allTouches = [...document.querySelectorAll('.button')]; // Tout mes boutons sont dans une nodelist -> tableau
const screen = document.querySelector('.place-for-numbers')  // Cible le screen
const myTextNode = document.createElement('p');
const listKeyCode = allTouches.map(el => el.dataset.key);  // Je crée un nouveau tableau ou chaque valeur est le data key du tableau original, dans le même ordre

document.addEventListener('keydown', (e) => { 
    if (screen.textContent == 0) { // Par défaut, on laisse toujours '0' sur la calculette. On l'enlève quand on 
        screen.textContent = ''
    }
    // Quand on appuie sur une touche du pavé numérique, ça fait l'action d'appuyer sur la touche de la calculette
    for (let i = 0; i < 19; i++) { 
        if (e.key == allTouches[i].id) {
            allTouches[i].classList.add("active-keydown"); 
            setTimeout(() => {
                allTouches[i].classList.remove("active-keydown"); 
                }, 50);            
        }
    }
    // Quand j'appuie sur une touche du clavier, je recupère son  keycode et le transfome en string. C'est cette string qui va rentrer dans le calcul
    let valueKeydowned = e.keyCode.toString();
    doCalcul(valueKeydowned);
})

document.addEventListener('click', (e) => {   // Par défaut, on laisse toujours '0' sur la calculette. On l'enlève quand on commence à écrire
    if (screen.textContent == 0) {
        screen.textContent = ''
    }
    let valueCliqued = e.target.dataset.key;  // je récupère le dataset.key dans le html
    doCalcul(valueCliqued);
})

function doCalcul(value) {
    if (listKeyCode.includes(value)) {  // value = le keycode récupéré. Si ce keycode est présent dans la value, on lui fait passer des test. Si c'est 8 (touche supperimé) l'écran se vide. Si c'est 13, on fait le calcul grace a eval
    switch (value) {
        case '8':
            screen.textContent = '0';
            myTextNode.textContent = '';
            screen.style.fontSize = '50px';
            break
            case '13':
                screen.textContent = eval(screen.textContent);
                break
                default: 
            const indexKeycode = listKeyCode.indexOf(value); // Recupère le numéro d'index de la valeur(keycode) dans le tableau qui liste les keycode
            const touche = allTouches[indexKeycode]; // Récupère la touche se trouvant a l'endroit de l'index
            screen.textContent += touche.innerHTML;
        }
        
        if (screen.textContent.length > 7) {
            screen.style.fontSize = '40px'
        }
        if (screen.textContent.length > 11) {
            screen.style.fontSize = '30px'
        }
        if (screen.textContent.length > 16) {
            screen.style.fontSize = '25px'
        }
        if (screen.textContent.length > 20) {
            screen.style.fontSize = '20px'
        }
        if (screen.textContent.length > 25) {
            screen.style.fontSize = '17px'
        }
        if (screen.textContent.length == 31) {
            
            screen.textContent = '';
            alert('Votre nombre est trop long !')
            screen.style.fontSize = '40px'
        }
    }
}

// Gestion de l'erreur de calcul
window.addEventListener('error', () => {
    alert('Il y a une erreur dans votre calcul.')    
})
