// notifier.js
const EventEmitter = require('events');

class Notifier extends EventEmitter {
    registerUser(email) {
        console.log(`Registering user with email: ${email}`);
        this.emit('userRegistered', { email });
    }
}

module.exports = Notifier;