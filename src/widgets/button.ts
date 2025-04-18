// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";
import { SVG } from '@svgdotjs/svg.js';  // If you're using svg.js module

class Button extends Widget{
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private defaultText: string= "Button";
    private defaultFontSize: number = 18;
    private defaultWidth: number = 80;
    private defaultHeight: number = 30;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        // set Aria role
        this.role = RoleType.button;
        // render widget
        this.render();
        // set default or starting state
        this.setState(new IdleUpWidgetState());
        // prevent text selection
        this.selectable = false;
    }
    

    set fontSize(size:number){
        this._fontSize= size;
        this.update();
    }

    private positionText(){
        let box:Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height()/2)) - (box.height/2));
        this._text.x(+this._rect.x() + 4);
        if (this._text_y > 0){
            this._text.y(this._text_y);
        }
    }

    render(): void {
        const cornerRadius = 25;
        
        this._group = (this.parent as Window).window.group();
        // Create a path for the rounded rectangle
        this._rect = this._group.rect(this.width, this.height);
            // Create a path for the rounded rectangle
        this._rect.stroke("pink");
        this._rect.fill("#FFB8BF");
        this._text = this._group.text(this._input);
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to 
        // prevent selection cursor and to handle mouse events
        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(eventrect);
    }
    set text(newText: string) {
        this._input = newText;
        this._text.text(newText);
    }
    
    get text(): string {
        return this._input;
    }
    set size(newSize: { width: number, height: number }) {
        this.width = newSize.width;
        this.height = newSize.height;
        this._rect.size(this.width, this.height); // Update the size of the button
    }
    
    get size(): { width: number, height: number } {
        return { width: this.width, height: this.height }; // Return the current size
    }

    override update(): void {
        if(this._text != null)
            this._text.font('size', this._fontSize);
            this._text.text(this._input);
            this.positionText();

        if(this._rect != null)
            this._rect.fill(this.backcolor);
        
        super.update();
    }

    pressReleaseState(): void{
        if (this.previousState instanceof PressedWidgetState)
            this.raise(new EventArgs(this));
    }

    
    //TODO: implement the onClick event using a callback passed as a parameter
    onClick(callback: () => void):void{this._group.click(() => {
        callback();
    });
}


    //widget
    idleupState(): void {
        this._rect.fill("#FFB8BF");
        // throw new Error("Method not implemented.");
    }
    idledownState(): void {
        // throw new Error("Method not implemented.");
    }
    pressedState(): void {
        this._rect.fill("#FFB8BF");

        // throw new Error("Method not implemented.");
    }
    hoverState(): void {
        this._rect.fill("#FB9AAC");
        // throw new Error("Method not implemented.");
    }
    hoverPressedState(): void {
        // throw new Error("Method not implemented.");
    }
    pressedoutState(): void {
        // throw new Error("Method not implemented.");
    }
    moveState(): void {
        // throw new Error("Method not implemented.");
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        // throw new Error("Method not implemented.");
    }
}

export {Button}
