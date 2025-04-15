// importing local code, code we have written
import { IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import { Window, Widget, RoleType, EventArgs } from "../core/ui";
// importing code from SVG.js library
import { Rect, Text, Box } from "../core/ui";
import { SVG } from '@svgdotjs/svg.js';  // If you're using svg.js module

class CheckBox extends Widget {
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private defaultText: string = "Checkbox";
    private defaultFontSize: number = 18;
    private defaultWidth: number = 20; // Checkbox width
    private defaultHeight: number = 20; // Checkbox height
    private _checked: boolean = false; // Track if checkbox is checked

    constructor(parent: Window) {
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        // set Aria role for checkbox
        this.role = RoleType.button; // Keep it as button for accessibility
        // render widget
        this.render();
        // prevent text selection
        this.selectable = false;
    }

    set fontSize(size: number) {
        this._fontSize = size;
        this.update();
    }

    private positionText() {
        let box: Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height() / 2)) - (box.height / 2));
        this._text.x(+this._rect.x() + this.width + 4); // Text positioned after checkbox
        if (this._text_y > 0) {
            this._text.y(this._text_y);
        }
    }

    render(): void {
        const cornerRadius = 5;

        this._group = (this.parent as Window).window.group();
        // Create a path for the checkbox (rounded rectangle)
        this._rect = this._group.rect(this.width, this.height);
        this._rect.stroke("pink");
        this._rect.fill("pink"); // Initially white when unchecked

        // Create checkmark that will be displayed when checkbox is checked
        const checkmarkSize = this.height * 0.6;
        const checkmarkX = (this.width - checkmarkSize) / 2;
        const checkmarkY = (this.height - checkmarkSize) / 2;
        const checkmarkPath = this._group.path()
            .stroke("none")
            .fill("transparent")
            // .d(`M${checkmarkX} ${checkmarkY} L${checkmarkX + checkmarkSize} ${checkmarkY + checkmarkSize} M${checkmarkX} ${checkmarkY + checkmarkSize} L${checkmarkX + checkmarkSize} ${checkmarkY}`)
            .opacity(0); // Initially hidden

        // Text next to checkbox
        this._text = this._group.text(this._input);
        this._text.font('size', this._fontSize);
        // Set the outer svg element 
        this.outerSvg = this._group;

        // Add a transparent rect on top of checkbox to handle mouse events
        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);
        // Register objects that should receive event notifications
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
        this._rect.size(this.width, this.height);
    }

    get size(): { width: number, height: number } {
        return { width: this.width, height: this.height };
    }

    override update(): void {
        if (this._text != null)
            this._text.font('size', this._fontSize);
        if (this._rect != null)
            this._rect.fill(this._checked ? "#FB9AAC" : "white"); // Green if checked, white if unchecked

        // Update the checkmark visibility
        const checkmarkPath = this._group.children()[1]; // Access checkmark element
        checkmarkPath.opacity(this._checked ? 1 : 0); // Show or hide checkmark based on checked state

        this.positionText();
        super.update();
    }

    get checked(): boolean {
        return this._checked;
    }

    // Toggle checked state when clicked
    pressReleaseState(): void {
        this._checked = !this._checked;
        this.update();
        this.raise(new EventArgs(this)); // Notify about the state change
    }

    // Handle click events and toggle state
    onClick(callback: () => void): void {
        this._group.click(() => {
            this.pressReleaseState(); // Toggle checked state
            callback(); // Execute callback
        });
    }

    idleupState(): void {
        this._rect.fill("white"); // default state appearance
    }

    idledownState(): void {
        // this._rect.fill("lightgray"); // pressed down state appearance
        throw new Error("Method not implemented.");

    }

    pressedState(): void {
        // this._rect.fill("lightblue"); // pressed state appearance
        throw new Error("Method not implemented.");

    }

    hoverState(): void {
        this._rect.fill("lightpink");
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

export { CheckBox }
