import { Integration } from '@sentry/types';
/** Default Breadcrumbs instrumentations */
export declare class Cordova implements Integration {
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    install(): void;
}
