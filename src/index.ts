import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import { CheckBox } from './widgets/checkbox'; 
import { radioButton } from "./widgets/radiobutton";
import { ScrollBar } from "./widgets/scrollbar";
import { ProgressBar } from "./widgets/progressbar";
import { ColorPaletteSelector } from "./widgets/colorpalleteselector";



let w = new Window(window.innerHeight-10,'100%');




let lbl1= new Heading(w);
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,40);






let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 14
btn.move(12, 50)

const heading = new Heading(w); 
heading.text = "Original Heading Text";

btn.onClick(() => {
    heading.text = "Button Clicked!";
    heading.update();
});








let clickNum = 0;

const checkBox = new CheckBox(w);
checkBox.text = "Accept Terms";
checkBox.move(10, 80);


checkBox.onClick(() => {
    clickNum = clickNum + 1;
    if (clickNum % 2 == 0){
        checkBox.text = "Accept Terms";
    }
    else if (clickNum % 2 != 0) {
        checkBox.text = "Accepted Terms";
    }
    
    console.log(checkBox.checked ? "Checkbox is checked" : "Checkbox is unchecked");
});


checkBox.size = { width: 50, height: 30 };
checkBox.fontSize = 14;







// Create a group reference for radio buttons
const group = {}; // This could be an object or array depending on your needs

// Create multiple radio buttons with the same group
const radiobutton1 = new radioButton(w, group);
radiobutton1.text = "Option 1";
radiobutton1.move(10, 150);

radiobutton1.onClick(() => {
    console.log(radiobutton1.checked ? "Option 1 is selected" : "Option 1 is unselected");
});

radiobutton1.size = { width: 20, height: 20 };
radiobutton1.fontSize = 14;

const radiobutton2 = new radioButton(w, group);
radiobutton2.text = "Option 2";
radiobutton2.move(10, 180);

radiobutton2.onClick(() => {
    console.log(radiobutton2.checked ? "Option 2 is selected" : "Option 2 is unselected");
});

radiobutton2.size = { width: 20, height: 20 };
radiobutton2.fontSize = 14;

const radiobutton3 = new radioButton(w, group);
radiobutton3.text = "Option 3";
radiobutton3.move(10, 210);

radiobutton3.onClick(() => {
    console.log(radiobutton3.checked ? "Option 3 is selected" : "Option 3 is unselected");
});

radiobutton3.size = { width: 20, height: 20 };
radiobutton3.fontSize = 14;









//MAKE THE LABEL WORK
let positionForViewer = 0;

let scrollBar = new ScrollBar(w);
scrollBar.scrollBarHeight = 300;

const positionLabel = new Heading(w);

// positionLabel.text = `Thumb position: ${positionForViewer}`;
positionLabel.move(50, 50);

scrollBar.onThumbMove((event) => {
    positionForViewer = positionForViewer + 1;
    positionLabel.text = `Thumb position: ${positionForViewer}`;
    positionLabel.update();
});


scrollBar.move(10, 450);












// Create a progress bar instance
let progressBar = new ProgressBar(w);
progressBar.move(10, 300)
// Set the width and increment value
progressBar.progressBarWidth = 300;
progressBar.incrementValue = 20;


// Create a Heading or Text widget to display progress information
const progressText = new Heading(w);

progressText.move(50, 350); // Position it below the progress bar
progressText.text = `Progress bar at ${progressBar.progressBarWidth}`;



// Register the event handler for increment
progressBar.onIncrement((event) => {
    console.log(`Progress bar incremented to: ${progressBar._progressValue}`);
});

// Register the event handler for state change
progressBar.onStateChange((event) => {
    console.log(`State changed for progress bar`);
});

// Simulate incrementing the progress bar
progressBar.increment(30);  // Increment to 30%

// Example of setting a specific increment value
progressBar.increment(50);  // Increment to 50%









let colorPalette1 = new ColorPaletteSelector(w);
colorPalette1.render();
colorPalette1.move(400, 50); // Position the color palette

// Create the text widget to show selected color
const colorText = new Heading(w);
colorText.text = `The color selected is: ${colorPalette1._selectedColor}`;
colorText.move(40, 50); // Position the text

// Explicitly call update() to ensure text is rendered properly
colorText.update();

// Register an event to update colorText whenever a color is selected
colorPalette1.addEventListener("colorSelect", (event) => {
    // Update the text to reflect the selected color
    colorText.text = `The color selected is: ${colorPalette1._selectedColor}`;

    // Ensure that the text is updated visually on the screen
    colorText.update();  
});