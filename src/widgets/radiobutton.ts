import { IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import { Window, Widget, RoleType, EventArgs } from "../core/ui";
import { Rect, Text, Box } from "../core/ui";
import { SVG } from '@svgdotjs/svg.js'; 


class radioButton extends Widget {
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private defaultText: string = "Checkbox";
    private defaultFontSize: number = 18;
    private defaultWidth: number = 20;
    private defaultHeight: number = 20;
    public _group: any;


    private _checked: boolean = false;
    private static radioButtons: radioButton[] = []; 

    constructor(parent: Window, group: any) {
        super(parent);
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        this._group = group;
        this.role = RoleType.button;
        this.render();
        this.selectable = false;
        radioButton.radioButtons.push(this);
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
        const cornerRadius = 10;

        this._group = (this.parent as Window).window.group();
        this._rect = this._group.circle(this.width);
        this._rect.stroke("black");
        this._rect.fill("white");

        this._text = this._group.text(this._input);
        this._text.font('size', this._fontSize);
        this.outerSvg = this._group;

        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);
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
            this._rect.fill(this._checked ? "#FB9AAC" : "white");

        const checkmarkPath = this._group.children()[1];
        checkmarkPath.opacity(this._checked ? 1 : 0);

        this.positionText();
        super.update();
    }

    get checked(): boolean {
        return this._checked;
    }

    pressReleaseState(): void {
        if (!this._checked) {
            this.uncheckOtherButtons();
            this._checked = true;
            this.update();
            this.raise(new EventArgs(this));
        }
    }


    uncheckOtherButtons(): void {
        for(let button of radioButton.radioButtons) {
            if (button !== this) {
                button._checked = false;
                button.update()
            }
        }
    }

    onClick(callback: () => void): void {
        this._group.click(() => {
            this.pressReleaseState();
            callback();
        });
    }

    idleupState(): void {
        this._rect.fill("white");
    }

    idledownState(): void {
        throw new Error("Method not implemented.");

    }

    pressedState(): void {
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

export { radioButton }
