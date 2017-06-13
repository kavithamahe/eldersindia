import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
export declare class Ng2EmojiPipe implements PipeTransform {
    private _sanitizer;
    constructor(_sanitizer: DomSanitizer);
    transform(value: string, args: any[]): SafeHtml;
}
