let actifSelect = document.getElementById("actif-select")

let actifText  = document.querySelector(".actif-text")

//definition des textes relatifs à l'actif
let actifLotMinimum = document.querySelector(".lot-minimum")
let actifLotRecommande = document.querySelector(".lot-recommande")
let actifRrr = document.querySelector(".rrr")
let actifTypeOrdre = document.querySelector(".type-ordre")

//selectionons le button
let btn = document.getElementById("btn")

//definition des variable de prix
let prixEntreeInput = document.getElementById("prix-entree")
let prixSlInput = document.getElementById("prix-sl")
let prixTpInput = document.getElementById("prix-tp")
let montantPerteInput = document.getElementById("prix-perte")

let inputNumber = document.querySelector('.form .input-form input')

//console.log(prixSlInput)


let selection = actifSelect.value

//ecoutons la fonction onclick sur le button
btn.addEventListener('click', () => {
    let prixEntreeText = "no";
    let prixSlText = "no";
    let prixTpText ="no";
    let montantPerteText = "no";
    let valueActifName = actifSelect.value
    //vérifier les champs et ajouter les bordures bottom red
    //prix entree
    if(prixEntreeInput.value == ""){
        prixEntreeInput.style.borderBottomColor = "red"
        //prixEntreeText = "no"
    }else{
        prixEntreeInput.style.borderBottomColor = "black"
        prixEntreeText = prixEntreeInput.value

    }
    //prix Stop loss
    if(prixSlInput.value == ""){
        prixSlInput.style.borderBottomColor = "red"
        //prixSlInput = "no"
    }else{
        prixSlInput.style.borderBottomColor = "black"
        prixSlText = prixSlInput.value

    }
    //prix take profit
    if(prixTpInput.value == ""){
        prixTpInput.style.borderBottomColor = "red"
        //prixTpText = "no"
    }else{
        prixTpInput.style.borderBottomColor = "black"
        prixTpText = prixTpInput.value
    }
    //montant perte
    if(montantPerteInput.value == ""){
        montantPerteInput.style.borderBottomColor = "red"
       // montantPerteInput = "no"
    }else{
        montantPerteInput.style.borderBottomColor = "black"
        montantPerteText = montantPerteInput.value

    }

    //vérifions nos valeurs de champs input et ajoutons des default texte au cas ou ceux ci sont vide
    if(prixEntreeText == "no" || prixSlText == "no" || prixTpText == "no" || montantPerteText == "no"){
        actifLotRecommande.innerHTML = "0"
        actifRrr.innerHTML = "0"
    }else{
        //calculons le RRR
        let tpPricePercentage = (prixTpText - prixEntreeText) * 10000
        let slPricePercentage = (prixEntreeText - prixSlText) * 10000
        let rrrValue = tpPricePercentage / slPricePercentage

        // calculons le nom de pips
        let nbrePips = Math.abs(prixEntreeText - prixSlText)

        //calculons le lot recommandé
        let lotRecommande = montantPerteText / (prixEntreeText - prixSlText).toFixed(2)
        let lotRecommandeInt = Math.abs(lotRecommande.toFixed(2))
        //vérifions l'actif et affectons le lot minimum en cas de besoin
        //boom300
        if(valueActifName == "boom300" && lotRecommande < 0.1){
            let newLotRecommande = nbrePips * 0.1
            actifLotRecommande.innerHTML =  "votre perte sur cette distance sera de "+newLotRecommande
        }else{
            actifLotRecommande.innerHTML = lotRecommandeInt
        }
        /*
        //boom500
        if(valueActifName == "boom500" && lotRecommande < 0.2){
            let newLotRecommande = nbrePips * 0.2
            actifLotRecommande.innerHTML =  "votre perte sur cette distance sera de "+newLotRecommande
        }else{
            actifLotRecommande.innerHTML = lotRecommandeInt
        }
        //boom1000
        if(valueActifName == "boom1000" && lotRecommande < 0.2){
            let newLotRecommande = nbrePips * 0.2
            actifLotRecommande.innerHTML =  "votre perte sur cette distance sera de "+newLotRecommande
        }else{
            actifLotRecommande.innerHTML = lotRecommandeInt
        }
        //crash300
        if(valueActifName == "crash300" && lotRecommande < 0.05){
            let newLotRecommande = nbrePips * 0.05
            actifLotRecommande.innerHTML =  "votre perte sur cette distance sera de "+newLotRecommande
        }else{
            actifLotRecommande.innerHTML = lotRecommandeInt
        }
        //crash500
        if(valueActifName == "crash300" && lotRecommande < 0.2){
            let newLotRecommande = nbrePips * 0.2
            actifLotRecommande.innerHTML =  "votre perte sur cette distance sera de "+newLotRecommande
        }else{
            actifLotRecommande.innerHTML = lotRecommandeInt
        }
        //crash1000
        if(valueActifName == "crash300" && lotRecommande < 0.2){
            let newLotRecommande = nbrePips * 0.2
            actifLotRecommande.innerHTML =  "votre perte sur cette distance sera de "+newLotRecommande
        }else{
            actifLotRecommande.innerHTML = lotRecommandeInt
        }*/
        //definiton du  type d'ordre
        let typeOrder = buyOrSell(prixEntreeText, prixTpText, prixSlText)
        //actifLotRecommande.innerHTML = Math.abs(lotRecommande.toFixed(2))
        actifRrr.innerHTML = rrrValue.toFixed(2)
        actifTypeOrdre.innerHTML = typeOrder
    }
    console.log(valueActifName)
    console.log(prixEntreeText)
    console.log(prixSlText)
    console.log(prixTpText)
    console.log(montantPerteText)
    
    /*console.log(prixEntreeInput.value)
    console.log(prixSlInput.value)
    console.log(prixTpInput.value)
    console.log(montantPerteInput.value)*/
})

//detectons si il s'agit d'un buy ou d'un sell

function buyOrSell(entryPrice, tpPrice, slPrice){
    if(entryPrice > slPrice && entryPrice < tpPrice){
        return "buy"
    }

    if(entryPrice < slPrice && entryPrice > tpPrice){
        return "sell"
    }
}

//vérifier si les champs sont vides

function isEmpty(inputValue){
    if(inputValue == ""){
        return "no"
    }
    return inputValue
}



//Definition de l'object Actif
function Actif(nomActif, lotMinimum){
    this.nomActif = nomActif,
    this.lotMinimum = lotMinimum

    /*this.getNomActif = function(){
        return nomActif
    }
    this.getLotMinimum = function(){
        return lotMinimum
    }*/
}

/*let boom = new Actif("boom300", 0.05)

console.log(boom.nomActif, boom.lotMinimum)*/


actifSelect.addEventListener('change', () => {
    /*console.log(actifSelect.value, actifSelect.options[actifSelect.selectedIndex].text)
    let actifSelected = new Actif("boom300", 0.20)
    actifText.innerHTML = actifSelect.options[actifSelect.selectedIndex].text
    actifLotMinimum.innerHTML = actifSelected.lotMinimum*/

    //let actifSelectedText = actifSelect.options[actifSelect.selectedIndex].text
    actifText.innerHTML = actifSelect.options[actifSelect.selectedIndex].text
    let actifSelected = actifSelect.value

    switch(actifSelect.value) {
        case "boom300":
            let boom300 = new Actif(actifSelected, 0.10)
            actifLotMinimum.innerHTML = boom300.lotMinimum
            console.log(boom300.nomActif)
            break;
        case "boom500":
            let boom500 = new Actif(actifSelected, 0.20)
            actifLotMinimum.innerHTML = boom500.lotMinimum
            console.log(boom500.nomActif)
            break;
        case "boom1000":
            let boom1000 = new Actif(actifSelected, 0.20)
            actifLotMinimum.innerHTML = boom1000.lotMinimum
            console.log(boom1000.nomActif)
            break;
        case "crash300":
            let crash300 = new Actif(actifSelected, 0.05)
            actifLotMinimum.innerHTML = crash300.lotMinimum
            console.log(crash300.nomActif)
            break;
        case "crash500":
            let crash500 = new Actif(actifSelected, 0.20)
            actifLotMinimum.innerHTML = crash500.lotMinimum
            console.log(crash500.nomActif)
            break;
        case "crash1000":
            let crash1000 = new Actif(actifSelected, 0.20)
            actifLotMinimum.innerHTML = crash1000.lotMinimum
            actifText.innerHTML = ""
            console.log(crash1000.nomActif)
            break;
        default:
            actifLotMinimum.innerHTML = 0
            console.log("selectionnez un actif")
      }
    
})


