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
exports.userController = void 0;
const prisma_1 = require("../prisma");
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username)
                throw new Error('Nome de usuário não informado');
            if (!password)
                throw new Error('Senha não informada');
            const userAlreadyCreated = yield prisma_1.prisma.user.findFirst({
                where: {
                    username: username
                },
            });
            if (userAlreadyCreated)
                throw new Error('Este usário já está cadastrado');
            const user = yield prisma_1.prisma.user.create({
                data: {
                    username,
                    password
                }
            });
            return res.json(user);
        });
    }
}
exports.userController = new UserController();
