import { Widget, Window, EventArgs, RoleType } from "../core/ui";
import { Rect, Text, Box } from "../core/ui";
import { SVG } from '@svgdotjs/svg.js'; // If you're using svg.js module

class ScrollBar extends Widget {
    private _track: Rect;
    private _thumb: Rect;
    private _upButton: Rect;
    private _text: Text;
    private _input: string;
    private _downButton: Rect;
    private _trackHeight: number;
    public _thumbHeight: number;
    private _thumbPosition: number;
    private _trackY: number;
    public _positionForViewer: number;
    private _onThumbMove: (event: EventArgs) => void;

    // Custom property to set height of the scroll bar
    set scrollBarHeight(value: number) {
        this._trackHeight = value;
        this.update(); // Re-render after height change
    }

    get scrollBarHeight(): number {
        return this._trackHeight;
    }

    // Custom property to get the position of the scroll thumb
    get thumbPosition(): number {
        return this._thumbPosition;
    }


    constructor(parent: Window) {
        super(parent);
        this._trackHeight = 200; // Default track height
        this._thumbHeight = 20; // Default thumb height
        this._thumbPosition = 100; // Default thumb position
        this._trackY = 450; // Y position of the track
        this._onThumbMove = () => {}; // Event handler for thumb move
        this.role = RoleType.scrollbar; // Set the role as scrollbar for accessibility
        this._positionForViewer = 0;
        this.render();
    }

    // Create and render the scrollbar UI
    render(): void {
        const cornerRadius = 5;
        
        this._group = (this.parent as Window).window.group();
        
        // Create the scroll track
        this._track = this._group.rect(20, this._trackHeight).fill("#FFE9EC");
        this._track.stroke("black");
        this._track.move(0, this._trackY);
        
        // Create the scroll thumb
        this._thumb = this._group.rect(20, this._thumbHeight).fill("pink");
        this._thumb.move(20, this._trackY);
        
        // Create up and down buttons
        this._upButton = this._group.rect(20, 20).fill("pink").move(0, this._trackY );
        this._downButton = this._group.rect(20, 20).fill("pink").move(0, (this._trackY + this._trackHeight) - 20);
        
        // Register events for up, down, and track clicks
        this.registerEvents();
        this.outerSvg = this._group;
    }



    set text(newText: string) {
        this._input = newText;
        this._text.text(newText);
    }

    get text(): string {
        return this._input;
    }



    private registerEvents(): void {

        
        // Button click event to move the thumb up or down
        this._upButton.mouseup(() => this.moveThumb(-10));  // Move thumb up
        this._downButton.mouseup(() => this.moveThumb(10)); // Move thumb down
    

        this._track.mouseup((event: MouseEvent) => {
            const offsetY = event.offsetY;
            const position = offsetY - this._trackY - this._thumbHeight / 2;
            this.moveThumbTo(position);
        });
    }
    
    private moveThumb(offset: number): void {

        // Move the thumb up or down by the given offset
        let newPosition = this._thumbPosition + offset;
    
        // Keep the thumb within the track bounds
        if (newPosition < 0) newPosition = 10;
        if (newPosition > this._trackHeight - this._thumbHeight) newPosition = this._trackHeight - this._thumbHeight;



        //TRYING TO UPDATE THE THUMB POSITION FOR VIEWER
        if (this._upButton.mouseup) {
            this._positionForViewer = this._positionForViewer + 1;
        }
        else if (this._downButton.mouseup) {
            this._positionForViewer = this._positionForViewer - 1;
        }
        

        this.moveThumbTo(newPosition);
    }
    
    private moveThumbTo(position: number): void {
        // Set the thumb's position based on the track's top position and the thumb's calculated position
        this._thumbPosition = position;
        this._thumb.move(10, this._trackY + this._thumbPosition);  // Move the thumb within the track's bounds
        console.log("Thumb moved");

    
        // Optionally, notify consuming code about the thumb movement
        this.raise(new EventArgs(this));
    }
    

    onThumbMove(callback: (event: EventArgs) => void): void {
        this._onThumbMove = callback;

    }

    override update(): void {
        this._thumb.size(20, this._thumbHeight);
        this._thumb.move(10, this._trackY + this.thumbPosition);
        super.update();

    }

    idleupState(): void {
        this._thumb.fill("pink");
    }

    idledownState(): void {
        // throw new Error("Method not implemented.");

    }
    
    pressReleaseState(): void{
        // throw new Error("Method not implemented.");
    }

    pressedState(): void {
        // throw new Error("Method not implemented.");

    }

    hoverState(): void {
        this._thumb.fill("pink");  // Change thumb color on hover
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

export { ScrollBar }































