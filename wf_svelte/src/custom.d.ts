declare module "virtual:wf-custom" {
    type CustomClientContext = {
        app: unknown;
        root: HTMLElement;
    };

    export default function initializeCustomClient(
        context: CustomClientContext,
    ): void | Promise<void>;
}
