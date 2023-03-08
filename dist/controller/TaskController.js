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
exports.taskController = void 0;
const prisma_1 = require("../prisma");
class TaskController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID, title, description } = req.body;
            if (!userID || !title || !description)
                throw new Error('Informe todos os dados');
            const task = yield prisma_1.prisma.tasks.create({
                data: {
                    titile: title,
                    description: description,
                    userID: userID,
                }
            });
            return res.json(task);
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.params;
            const userExists = yield prisma_1.prisma.user.findFirst({ where: { id: userID } });
            if (!userExists)
                throw new Error('Usuário não existe');
            const tasks = yield prisma_1.prisma.tasks.findMany({
                where: {
                    userID: userID
                }
            });
            return res.json(tasks);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, status, taksID } = req.body;
            if (!taksID)
                throw new Error('Informe o id da tarefa');
            const taksExists = yield prisma_1.prisma.tasks.findFirst({ where: { id: taksID } });
            if (!taksExists)
                throw new Error('Crie uma tarefa antes de a atualizar');
            const task = yield prisma_1.prisma.tasks.update({
                data: {
                    titile: title || taksExists.titile,
                    description: description || taksExists.description,
                    status: status || taksExists.status,
                    userID: taksExists.userID,
                },
                where: {
                    id: taksID
                }
            });
            return res.json(task);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskID } = req.params;
            if (!taskID)
                throw new Error('Informe um ID de uma tarefa para deletar');
            const taskExist = yield prisma_1.prisma.tasks.findFirst({ where: { id: taskID } });
            if (!taskExist)
                throw new Error('Informe um id válido');
            yield prisma_1.prisma.tasks.delete({
                where: {
                    id: taskID
                }
            });
            return res.json({ message: 'tarefa deletada' });
        });
    }
}
exports.taskController = new TaskController();
