import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import { CheckBox } from './widgets/checkbox'; 

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
checkBox.move(10, 70);


checkBox.onClick(() => {
    checkBox.text = "Accepted Terms";

    console.log(checkBox.checked ? "Checkbox is checked" : "Checkbox is unchecked");
});


checkBox.size = { width: 50, height: 30 };
checkBox.fontSize = 14;
