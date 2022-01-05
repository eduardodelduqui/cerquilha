export default class User {

    constructor (username='', email='', password='', userDate='', cep='', state='', city='', street='', complement='') {
        this.username = username;
        this.email = email;
        this.password = password;
        this.userDate= userDate;
        this.cep = cep;
        this.state = state;
        this.city = city;
        this.street = street;
        this.complement = complement;
    }
}


