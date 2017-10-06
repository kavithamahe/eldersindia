/// <reference path="../summernote.d.ts" />
import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class SummernoteComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private element;
    options: SummernoteOptions;
    disabled: boolean;
    whitespaceEmpty: boolean;
    private _empty;
    emptyChange: EventEmitter<boolean>;
    empty: boolean;
    textChange: EventEmitter<string>;
    private _disabled;
    private _options;
    private onTouched;
    private onChange;
    constructor(element: ElementRef);
    private _value;
    value: string;
    private refreshOptions();
    private addCallbacks();
    private refreshEmpty();
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(code: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
