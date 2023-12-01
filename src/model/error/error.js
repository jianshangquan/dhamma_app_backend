

export const DBErrorCode = Object.freeze({
    DOCUMENT_NOT_FOUND: 'document-not-found',
    UNKNOWN_ERROR: 'unknown-error'
})

export class DBError extends Error{
    constructor({ msg, name, code }){
        super();
        this.message = msg;
        this.name = name;
        this.code = code;
    }
}