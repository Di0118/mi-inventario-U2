const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Antes de guardar el usuario se encripta la clave (Seguridad)
UsuarioSchema.pre('save', async function() {
    if (!this.isModified('password')) return ;
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('Usuario', UsuarioSchema);