import { BrowserOptions } from '@sentry/browser';
import { Backend } from '@sentry/core';
import { Scope } from '@sentry/hub';
import { Breadcrumb, SentryEvent, SentryResponse } from '@sentry/types';
/**
 * Configuration options for the Sentry Cordova SDK.
 * @see CordovaFrontend for more information.
 */
export interface CordovaOptions extends BrowserOptions {
}
/** The Sentry Cordova SDK Backend. */
export declare class CordovaBackend implements Backend {
    private readonly options;
    private browserBackend;
    private deviceReadyCallback;
    /** Creates a new cordova backend instance. */
    constructor(options?: CordovaOptions);
    /**
     * @inheritDoc
     */
    install(): boolean;
    /**
     * @inheritDoc
     */
    eventFromException(exception: any): Promise<SentryEvent>;
    /**
     * @inheritDoc
     */
    eventFromMessage(message: string): Promise<SentryEvent>;
    /**
     * @inheritDoc
     */
    sendEvent(event: SentryEvent): Promise<SentryResponse>;
    nativeCall(action: string, ...args: any[]): Promise<any>;
    private runNativeInstall;
    private isCordova;
    /**
     * @inheritDoc
     */
    storeBreadcrumb(breadcrumb: Breadcrumb): boolean;
    /**
     * @inheritDoc
     */
    storeScope(scope: Scope): void;
}
