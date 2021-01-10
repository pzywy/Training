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
    constructor()
    {
        this.Content=[];
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
        }
        else
        {
            console.log('taka wartość nie istnieje w tej grupie!');
        }
    }
    

}