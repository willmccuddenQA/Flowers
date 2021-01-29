'use strict'

const createColour = document.querySelector("#createColour");
const createHeight = document.querySelector("#createHeight");
const createPoisonous = document.querySelector("#createPoisonous");
const createPrice = document.querySelector("#createPrice");
const createType = document.querySelector("#createType");



const printFlowerToScreen = (username) => {
    let user = document.createElement("p"); // <p> </p>
    let text = document.createTextNode(`${username}`); // username
    user.appendChild(text); // <p> username </p>
    peeps.appendChild(user);
}

const retrieveData = () => {
    fetch("http://localhost:8082/swagger-ui.html")
    .then((response) => {
        // check that the response is OK (i.e. 200)
        if(response.status !== 200){
            throw new Error("I don't have a status of 200");
        }else{
            console.log(response);
            console.log(`response is OK (200)`);
            //json-ify it (which returns a promise)
            response.json().then((infofromserver) =>{
                console.log(infofromserver);
                console.log(infofromserver.data); // key - return array(6)
                for(let flowers of infofromserver.data){
                    console.log(flowers.colour);
                    printNameToScreen(flowers.colour);
                }
            })
        }
    }).catch((err) => {
        console.error(err);
    })
}

const createFlowers = () => {

    const colourValue = createColour.value;
    const heightValue = createHeight.value;
    const poisonousValue = createPoisonous.value;
    const priceValue = createPrice.value;
    const typeValue = createType.value;
    console.log(poisonousValue);

    let data = {
        colour: colourValue,
        height: heightValue,
        poisonous: poisonousValue,
        price: priceValue,
        type: typeValue
    }

    console.log(data);

    fetch("http://localhost:8082/flower/create",{
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*"
        }
    })
    .then(response=>response.json())
    .then(info =>{
        console.log(info);
    })
    .catch(err => console.error('ERROR!' + err));
}