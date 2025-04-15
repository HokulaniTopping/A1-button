import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import { CheckBox } from './widgets/checkbox'; 
import { radioButton } from "./widgets/radiobutton";

let w = new Window(window.innerHeight-10,'100%');




let lbl1= new Heading(w);
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);








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










const checkBox = new CheckBox(w);
checkBox.text = "Accept Terms";
checkBox.move(10, 80);


checkBox.onClick(() => {
    checkBox.text = "Accepted Terms";
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