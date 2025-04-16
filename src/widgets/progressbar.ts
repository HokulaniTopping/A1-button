import { Widget, Window, EventArgs, RoleType } from "../core/ui";
import { Rect, Text, Box } from "../core/ui";
import { SVG } from '@svgdotjs/svg.js'; // If you're using svg.js module

class ProgressBar extends Widget {
    private _track: Rect;
    private _fill: Rect;
    private _incrementValue: number;
    private _text: Text;
    private _input: string;
    private _width: number;
    private _maxWidth: number;
    public _progressValue: number;
    private _onIncrement: (event: EventArgs) => void;
    private _onStateChange: (event: EventArgs) => void;

    constructor(parent: Window) {
        super(parent);
        this._maxWidth = 300;
        this._width = 300;
        this._progressValue = 0;
        this._incrementValue = 10;
        this._onIncrement = () => {};
        this._onStateChange = () => {};
        this.role = RoleType.window;
        this.render();
    }

    set progressBarWidth(value: number) {
        this._width = value;
        this.update();
    }

    get progressBarWidth(): number {
        return this._width;
    }


    set text(newText: string) {
        this._input = newText;
        this._text.text(newText);
    }

    get text(): string {
        return this._input;
    }




    // Custom property to set the increment value of the progress bar
    set incrementValue(value: number) {
        this._incrementValue = value;
    }

    // Custom property to get the increment value of the progress bar
    get incrementValue(): number {
        return this._incrementValue;
    }

    // Custom method to increment the value of the progress bar
    increment(value: number): void {
        if (value >= 0 && value <= 100) {
            this._progressValue = value;
            this.updateFill();
            this.raise(new EventArgs(this)); // Notify when the progress is incremented
        }
    }

    // Create and render the progress bar UI
    render(): void {
        this._group = (this.parent as Window).window.group();

        // Create the progress track
        this._track = this._group.rect(this._width, 20).fill("#FFE9EC");
        this._track.stroke("black");

        // Create the progress fill FFB8BF
        this._fill = this._group.rect(0, 20).fill("#FFB8BF");
        

        this._track.move(10, 50); // Adjust this if needed for positioning
        this._fill.move(10, 50);  // Same position as the track

        this.outerSvg = this._group;
    }

    // Update the fill based on the progress value (0-100)
    updateFill(): void {
        const fillWidth = (this._progressValue / 100) * this._width; // Calculate the fill width based on progress value
        this._fill.size(fillWidth, 20);  // Update the fill width accordingly
    }

    // Register the increment event handler
    onIncrement(callback: (event: EventArgs) => void): void {
        this._onIncrement = callback;
    }

    onStateChange(callback: (event: EventArgs) => void): void {
        this._onStateChange = callback;
    }

    private raiseIncrementEvent() {
        this._onIncrement(new EventArgs(this));
    }

    private raiseStateChangeEvent() {
        this._onStateChange(new EventArgs(this));
    }

    override update(): void {
        this.updateFill();
        super.update();
    }
    pressReleaseState(): void {
        // Not needed in this example
    }

    idledownState(): void {
        // Not needed in this example
    }

    pressedState(): void {
        // Not needed in this example
    }

    hoverState(): void {
        // this._thumb.fill("pink");
    }

    idleupState(): void {
        // this._thumb.fill("pink");
    }

    hoverPressedState(): void {
        // Not needed in this example
    }

    pressedoutState(): void {
        // Not needed in this example
    }

    moveState(): void {
        // Not needed in this example
    }

    keyupState(keyEvent?: KeyboardEvent): void {
        // Not needed in this example
    }
}


export { ProgressBar }


