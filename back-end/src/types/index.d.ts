export { }

declare global {
    namespace Express {
        interface Request {
            user: any;
            file: any;
            // eslint-disable-next-line no-undef
            headers: IncomingHttpHeaders & {
                id: string
            }
        }
    }
}
