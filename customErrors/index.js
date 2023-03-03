
exports.AccountNotSignUp = class extends Error {
    constructor(message = 'Account not Sign Up') {
        super(message)
        this.name = 'AccountNotSignUp'
        this.code = 2001
    }
}

exports.AccountOrPwd = class extends Error {
    constructor(message = 'Password or account error') {
        super(message)
        this.name = 'AccountOrPwd'
        this.code = 2002
    }
}

exports.AccountExists = class extends Error {
    constructor(message = 'Account already exists') {
        super(message)
        this.name = 'AccountExists'
        this.code = 2003
    }
}

exports.FormValidate = class extends Error {
    constructor(message = 'Form validation failed') {
        super(message)
        this.name = 'FormValidate'
        this.code = 2004
    }
}

exports.PermissionDenied = class extends Error {
    constructor(message = 'Permission denied') {
        super(message)
        this.name = 'PermissionDenied'
        this.code = 2005
    }
}

exports.NotFoundRouter = class extends Error {
    constructor(message = 'Not Found Router') {
        super(message)
        this.name = 'NotFoundRouter'
        this.code = 2006
    }
}





// const list = [
//     { name: 'AccountNotSignUp', code: 2001, message: 'Account not Sign Up' },
//     { name: 'AccountOrPwd', code: 2002, message: 'Password or account error' },
//     { name: 'AccountExists', code: 2003, message: 'Account already exists' },
//     { name: 'FormValidator', code: 2004, message: 'Form validation failed' },
//     { name: 'PermissionDenied', code: 2005, message: 'Permission denied' },
// ]

// const errors = {}

// list.map(item => {
//     errors[item.name] = 
//     class extends Error {
//         constructor(message = item.message) {
//             super(message)
//             this.name = item.name
//             this.code = item.code
//         }
//     }
// })

// module.exports = errors

