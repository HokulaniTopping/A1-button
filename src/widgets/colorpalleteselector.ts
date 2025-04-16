import { Widget, Window, EventArgs, RoleType } from "../core/ui";
import { Rect, Text, Box } from "../core/ui";
import { SVG } from '@svgdotjs/svg.js';

class ColorPaletteSelector extends Widget {
    public _colors: string[];
    private _colorBlocks: Rect[];
    public _selectedColor: string;
    private _colorDisplay: Rect;
    private _text: Text;
    private _input: string;
    private _listeners: { [key: string]: Function[] } = {};

    constructor(parent: Window) {
        super(parent);
        this._colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF4"];
        this._colorBlocks = [];
        this._selectedColor = this._colors[0];
        // this.render();
    }

    // Register an event listener for a specific event type
    addEventListener(event: string, callback: (event: EventArgs) => void): void {
        if (!this._listeners[event]) {
            this._listeners[event] = []; // Initialize an array for the event if not already present
        }
        this._listeners[event].push(callback); // Add the callback to the listeners array
    }

    set text(newText: string) {
        this._input = newText;
        this._text.text(newText);

    }

    get text(): string {
        return this._input;
    }

    // Dispatch an event to all registered listeners
    dispatchEvent(event: string, args: EventArgs): void {
        if (this._listeners[event]) {
            this._listeners[event].forEach(callback => callback(args)); // Call each listener's callback
        }
    }

    // Render the color palette grid
    render(): void {
        this._group = (this.parent as Window).window.group();

        for (let i = 0; i < this._colors.length; i++) {
            const color = this._colors[i];
            const colorBlock = this._group.rect(50, 50).fill(color).move(i * 60, 0); // Each block spaced 60px apart
            colorBlock.mouseup(() => this.selectColor(color)); // Event handler for color selection
            this._colorBlocks.push(colorBlock); // Add to the color blocks array
        }

        // Create a display area for the selected color
        this._colorDisplay = this._group.rect(200, 100).fill(this._selectedColor).move(10, 60);
        this.outerSvg = this._group;
    }

    // Select a color from the palette
    selectColor(color: string): void {
        console.log("pressed a new color");
        this._selectedColor = color;
        this._colorDisplay.fill(this._selectedColor); // Update the display with the selected color

        // Optionally, dispatch the 'colorSelect' event to notify consuming code
        this.dispatchEvent("colorSelect", new EventArgs(this)); // Dispatch the event
    }

    // Override the update method if needed (e.g., for dynamic changes)
    override update(): void {
        super.update();
    }

    // Implementing the abstract method pressReleaseState from Widget
    pressReleaseState(): void {
        console.log("Press Release State Triggered");
    }
    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        // this._rect.fill("#FFB8BF");
        // throw new Error("Method not implemented.");
    }

    idledownState(): void {
        // this._rect.fill("#FB928E");
        throw new Error("Method not implemented.");
    }
    pressedState(): void {
        // this._rect.fill("#FFB8BF");

        // throw new Error("Method not implemented.");
    }
    hoverState(): void {
        // this._rect.fill("#FB9AAC");
        // throw new Error("Method not implemented.");
    }
    hoverPressedState(): void {
        throw new Error("Method not implemented.");
    }
    pressedoutState(): void {
        throw new Error("Method not implemented.");
    }
    moveState(): void {
        throw new Error("Method not implemented.");
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        throw new Error("Method not implemented.");
    }

}

export { ColorPaletteSelector }
