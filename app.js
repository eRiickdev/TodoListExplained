//select element which are inside our html codes
const clear = document.querySelector(".clear"); //this clears out our input area.//The querySelector checks to see if the action has been performed
//You would notice that .clear wasa used instead of clear. this is because clear is a class not an id.
//and then clears off the text area if the action has been performed.. When you hit enter in the app it automatically wipes off the text area
const date /*f2*/ = document.getElementById("date"); //this would show todays date.
const list = document.getElementById("list"); //where ur items would be listed..
//   the syntax: document.getElementById used almost every time you want to manipulate, or get info from, an element on your document.
const input = document.getElementById("input");// what we wld be inputing


//Store input in a local storage ( storage of the web browser)
// we say let LIST = [];( the LIST is each set of data inputed including the check button and the delete button)
//let id = 0;
/*5*/ let LIST, id;

let data = localStorage.getItem("TODO");

if(data)
{
LIST =JSON.parse(dataloadToDo(LIST));
id = LIST.length;

}
else
{
    LIST = [];
    id = 0;
}

function loadList(array){array.forEach(function(item)
    {
        addmyInput(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function()//this is called when the clear button is clicked
{
    localStorage.clear();
    location.reload();
});
//shows today's date.
//You would be needing to declare two variable, because time doesnt change its better you use constants that cant be changed
// first constant describes the format with which you want your date to take. We have the option of using
// {weekday : "long" or "short", month:"short" or "long", day:"numeric"
//secondly we create a date object using the syntax: let x = new Date();
// thirdly input the object into our app with the use of the innerHTML: x.innerHTML = y.toLocaleDateString("en-US", x)

/*1*/const format/*f4*/ = {weekday : "long", month:"short", day:"numeric"};// display option for the date. f1
const newDate/*f3*/ = new Date(); //creates a new date object with the current date and time:
date/*f2*/.innerHTML = newDate/*f3*/.toLocaleDateString("en-US", format/*f4*/); // The options enable us to be able to determine which method we want to use for the dte format here f1//The toLocaleString() method returns
// a string with a language sensitive representation of this date
//remember in const dateElement = document.getElementById("date");  above. we assigned our ("date") to dateElement
//options Optional
// object with some or all of the following properties:

//dateStyle
//The date formatting style to use when calling format().Possible values include:
//"full"
//"long"
//"medium"
//"short"
//timeStyle
//The time formatting style to use when calling format().Possible values include:
//"full"
//"long"
//"medium"
//"short"
//The .innerHTML  insert content to a specified id of an element. Here it inserts the date into the date element



//classes names: Names of classes we would be using
/*6*/
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

function addmyInput(myInput, id, done, trash)// the function addToDO(toDo)
{
   if(trash){return;}// means if item is in trash then no need to run the code. But if trash is false, the code would run
   const DONE=done? CHECK : UNCHECK;
   const LINE = done? LINE_THROUGH : "";
  /*3*/  const item =
// for each item that is goin to be entered we want it in this settings:
  /*  const item = <li class="item">
        <i class="co fa fa-circle-thin" job="complete"></i>
        <p class="text">Drink coffee</p>
        <i class="de fa fa-trash-o" job="delete"></i>
    </li> */ 
    `
  
     <li class="item">
    <i class= "fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete"  id="${id}"></i> 
    </li>
    `;
    const position = "beforeend";// every item written wld be placed at the end
   /*2*/ list.insertAdjacentHTML(position, item);//insertAdjacentHTML is used to add items to a page without overiding the previously entered items.
   //It also determines which position you want to place your newly entered item: 
  
   //beforebegin: items would be placed before the element as a whole so it wnt appear
  
   //afterbegin: items would be place first on the list i.e if you have an already existing item on the list whichis number one,
   // it wld be pushed to number two while what you have just entered is made number 1.

   //beforend: Items would be placed last on the list i.e  if you have an already existing item on the list which is number one,
   // it would remain number one while the item you just entered would be made number 2.
  
  
  //
   //note innerHTML WOULD override the items already in the list 
}


/*4a*/ document.addEventListener("keyup",function(event)//an eventlistener looks out for a particular event that its assigned to,
 //Here it is assigned to the keyup event, It measn the event listener would be triggered whenever  KEYButton is pressed on the keyboard
 { 
    /*4b*/ if(event.keyCode == 13)// the number for the enter key on the keyboard is 13.So if the user presses the enter button, it activates the eventlistener
     //and so activate the function for the event. 
     {
     /*4c*/   const myInput = input.value; // we are storing what we input inside const toDo
       
       /*4d*/ if(myInput)//if the string is empty it wont run
        {
           /*4e*/ addmyInput(/*4f*/myInput, id, false, false);//since we are working with 4 parameters here. 1 is the input, 2 is the done, 3 is the trash and 4 the id
            LIST.push({ //this adds our our inputs into the array
                name: toDo,
                id: id,
                done:false,
                trash: false
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
      /*4g*/  input.value = "";// this resets the value of the input to make it empty
     }
 }
 )

 /*6*/ function completemyInput(element)// Tis function indicate if the task is done or not. so basically it checks if you marked the task as done or not
 //and take appopriate actions
 {
     element.classList.toggle(CHECK);// THE toggle is used to switch between classes. here it switches between check and uncheck class
     // So if the user ticks the check, it removes the check class and replaces it with the unchecked class. so that way you can easily make switches between two options
     element.classList.toggle(UNCHECK);
     element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
     //element here is refering to the  check and uncheck button. the classList returns the class name of the element
     //So when you click on the element, the toggle checks if the current class is in the classList, if it doesnt it adds it, and removes the class that uisnt supposed to be there. The classList controls the output of the element
     // ParentNode explained We have 3 elemnts in display .1 heck/uncheck button (Node) 2. The text entered(Node) 3. The delete button(Node). 
     //the .parentNode is the immediate section containing the elements. While the parentNode.parentNode is the section sourrounding the parentNode
     //So to get the text which is the second element we use the element.parentNode.In order for us to make our line through on the specific element. check screenshot for diagram
     //we had to make sure we are firstly on the right element. The toggle looks into the last element that is written and then take action on it  
    // We then select the text element using querySelector (the text element is the input type in our html file).

    //so now we want to update our LIST 
    //remember our id has been initiated to 0, and an increment of id++ has also been initialised
    //so for item added our id  is incremented so our list has to be updated 
     LIST[element.id].done = LIST[element.id].done? false: true;// the question mark is a short form of writing if statement
     // it means if the element.id is done then it wld be set to false but if its not done it wld be set to true then the LIST[] is updated
     //this is what our LIST array looks like:
     //LIST[0]: 
     //{item: 'Drink coffee",
     //   id:  0,
     // done: false,      
     //trash: false,
     // }
     // and what we are trying to do right now is to update the done if the task is indeed done
 }

/*7*/  function removemyInput(element)//When the user clicks on the delete button it triggers the remove function
 {
     element.parentNode.parentNode.removeChild(element.parentNode);//we need to delete the whole element.parentNode
     LIST[element.id].trash = true;//then we update our LIST[]
 }
 
/*8*/ list.addEventListener("click", function(event)//In our code so far we havent used an eventListener that would trigger the functions for the
// delete and and complete button. so we do that here
 {
const element = event.target;
const elementJob = element.attributes.job.value;
if(elementJob == "complete"){completemyInput(element);}
else if(elementJob == "delete"){removemyInput(element);}

     localStorage.setItem("TODO", JSON.stringify(LIST));// we use this to store 
 });
  