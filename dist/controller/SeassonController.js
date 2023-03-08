"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seasonController = void 0;
const prisma_1 = require("../prisma");
const jsonwebtoken_1 = require("jsonwebtoken");
class SeasonController {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password)
                throw new Error('Informe o nome de usuário e a senha');
            const user = yield prisma_1.prisma.user.findFirst({
                where: {
                    username: username
                }
            });
            if (!user)
                throw new Error('Usuário não existe');
            if (String(user.password) != String(password))
                throw new Error('Nome de usuário ou senha incorreta');
            const token = (0, jsonwebtoken_1.sign)({ username: user === null || user === void 0 ? void 0 : user.username }, process.env.JWT_KEY, { subject: user.id });
            return res.json({ username: user.username, id: user.id, token: token });
        });
    }
}
exports.seasonController = new SeasonController();
