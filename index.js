
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


//Firebase confing
const admin = require("firebase-admin")
const secretKey = require('./safety.json');
admin.initializeApp({
    credential: admin.credential.cert(secretKey)
    
});

const fireStore = admin.firestore();

const auth = admin.auth();
app.use(bodyParser.json());

app.post('/cars',(req, res,next) => {
    const car = req.body;
    if(car === undefined){
        res.status(500).send("Error Cars is underfined")
    }else{
        fireStore.collection("cars").doc().create(car).then(()=>{
            res.status(200).send(car)
        }).catch(error => res.status(500).send(error.message))

    };
});

//create a car
app.get('/cars',(req, res, next)=> {
    const allCars = [];
        fireStore.collection('cars').get().then((cars)=> {
            cars.forEach(cars => {
                allCars.push({
                    id:car.id,...car.data()
                })
            })
            res.status(200).send(allCars);

        }).catch(error => res.status(500).send(error.message))
});

//Get one car

app.get('/cars/:id',(req,res, next) => {
    const id = req.params.id;
    if(id ===undefined){
        res.status(500).send("The car is not available")

    }
    else{
        firestore.collection("cars").doc(id).get().then(response => {
            res.status(200).send({
                id:response.id,
                ...response.data()
            })
        })
    }
})

//Delete one car

app.delete('/car/:id', function(req,res, next){
    const id = req.params.id;
    if(id ===undefined){
        res.status(500).send('Car id is not defined')

    } else{
        firebase.collection('cars').doc(id).delete().then(car =>{
            res.status(200).send('Car has been deleted')
        })
    }
})





      
 

app.set('port', process.env.port || 4000)

app.get('/', (req, res, next) => {
    res.send('Hello world');
})

app.listen(app.get('port'), server => {
    console.info(`Server listern on port ${app.get('port')}`);
})