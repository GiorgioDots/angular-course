export class User {
    constructor(
        public email: string, 
        id: string, 
        private _token: string, 
        private _tokenExpirationDate:  Date
    ){}

    get token(){//property++ :)
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token
    }
}