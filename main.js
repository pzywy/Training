function trojkat()
{
    for(i=0;i<7;i++)
    {
        line="#";

        for(j=0;j<i;j++)
        {
            line+="#";
        }
        console.log(line);
    }
}

function FizzBuzz()
{
    for(i=1; i<=100;i++)
    {
        if(i%3==0 && i%5==0)
        {
            console.log('FizzBuzz');            
        }
        else if(i%3==0)
        {
            console.log('Fizz');
        }
        else if(i%5==0)
        {
            console.log('Buzz');
        }
        else
        {
            console.log(i);
        }
    }
}

// Console to html
(function (logger) {
    console.old = console.log;
    console.log = function () {
        var output = "", arg, i;

        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            output += "<span class=\"log-" + (typeof arg) + "\">";

            if (
                typeof arg === "object" &&
                typeof JSON === "object" &&
                typeof JSON.stringify === "function"
            ) {
                output += JSON.stringify(arg);   
            } else {
                output += arg;   
            }

            output += "</span>&nbsp;";
        }

        logger.innerHTML += output + "<br>";
        console.old.apply(undefined, arguments);
    };
})(document.querySelector(".logger"));




var nameInput = document.getElementById('input');

document.querySelector('.insert').addEventListener('keyup', function (e) {
    if (event.keyCode === 13) {
        //prevent the normal submission of the form
        e.preventDefault();

        console.log(nameInput.value);    
    }
});


class Vec 
{
    //### Vector Class
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
    }

    length()
    {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    plus(vector)
    {
        return new Vec(this.x+vector.x, this.y+vector.y);
    }
    
    minus(vector)
    {
        return new Vec(this.x-vector.x, this.y-vector.y);
    }
}

class Group
{
    //#################
    //  Group that keeps only one same value at the time 
    //
    //################
    constructor()
    {
        this.Content=[];
        this.i = 0;
    }

    add(stuff) 
    {
        if(!this.has(stuff))
        {
            this.Content.push(stuff);
            return this.Content;
        }
        else
        {
            console.log('taka wartość już istnieje w tej grupie!');
        }
    }
    
    has(stuff)
    {
        return this.Content.indexOf(stuff) >=0 ? true : false;
    }


    delete(stuff)
    {
        if(this.has(stuff))
        {
            let index = this.Content.indexOf(stuff);
            this.Content.splice(index,1);
            return this.Content;
        }
        else
        {
            console.log('taka wartość nie istnieje w tej grupie!');
        }
    }
    
    //create group form array for example
    static form(object)
    {
        console.log(object);
        let newGroup = new Group();
        object.forEach(element => newGroup.add(element));
            
        
        return newGroup;
    }
    //Iterator
    next()
    {
        if(this.i == this.Content.length) return {done: true};
        let value = this.Content[this.i];
        this.i++;
        return {value, done:false};

    }
}   


// Projekt Robot z książki

//possible routes:
const roads = [
    "Dom Alicji-Dom Bartka", "Dom Alicji-Chata",
    "Dom Alicji-Poczta", "Dom Bartka-Ratusz",
    "Dom Darii-Dom Ernesta", "Dom Darii-Ratusz",
    "Dom Ernesta-Dom Grety", "Dom Grety-Farma",
    "Dom Grety-Sklep", "Rynek-Farma",
    "Rynek-Poczta", "Rynek-Sklep",
    "Rynek-Ratusz", "Sklep-Ratusz"
];

//create graph with conections:
function buildGraph(edges)
{
    let graph = Object.create(null);
    function addEdge(from, to)
    {
        if(graph[from]==null)
        {
            graph[from]=[to];
        }
        else
        {
            graph[from].push(to);
        }
    }

    for (let [from,to] of edges.map(r => r.split('-')))
    {
        addEdge(from,to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

//village object
class VillageState
{
    constructor(place,parcels)
    {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination)
    {
        if(!roadGraph[this.place].includes(destination))
        {
            return this;
        }
        else
        {
            let parcels = this.parcels.map(p => {
                if(p.place != this.place)   return p;
                if(destination==p.adress) console.log(`dostarczono do ${p.adress}`);
                return {place: destination, adress: p.adress};
            }).filter(p => p.place != p.adress);
            return new VillageState(destination,parcels);
        }
    }
}

//start robot 
function runRobot(state,robot,memory)
{
    for(let turn=0;;turn++)
    {
        if(state.parcels.length==0)
        {
            console.log(`Robot skonczył po wykonaniu ${turn} ruch`);
            break;
        }
        let action = robot(state, memory)
        state = state.move(action.direction);

        memory  =   action.memory;
        console.log(`Robot przemieścił się do: ${action.direction}`);

        
    }
}

//random pick choice from array
function radnomPick(array)
{
    let choice = Math.floor(Math.random()*array.length);
    return array[choice];
}

//Robot Strategies:
function randomRobot(state)
{
    return {direction: radnomPick(roadGraph[state.place])};
}

function routeRobot(state,memory)
        {
            if(memory.length ==0)
            {
                memory=mailRoute;
            }
            return {directin:memory[0], memory:memory.slice(1)};
        }


//Create random delivery schedule:
VillageState.random = function(parcelCount = 5)
{
    let parcels = [];

    for (let i=0; i < parcelCount; i++)
    {
        let adress = radnomPick(Object.keys(roadGraph));
        let place;
        do
        {
            place = radnomPick(Object.keys(roadGraph));
        }while (place == adress);
        parcels.push({place,adress});
    }
    randomVillage = new VillageState("Poczta", parcels);

    console.log('Miejsca Dostaw:')
    console.table(randomVillage.parcels);

    return randomVillage;
}


const mailRoute = [
    "Dom Alicji", "Chata", "Dom Alicji", "Dom Bartka",
    "Ratusz", "Dom Darii", "Dom Erniego",
    "Dom Grety", "Sklep", "Dom Grety", "Farma",
    "Rynek", "Poczta"
];


//start Delivery:
runRobot(VillageState.random(6), randomRobot);

