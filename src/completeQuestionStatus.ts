import { firestoreDB } from './lib/firestoreDB';

const completeQuestionStatus = async (userId: string, questionId: string) => {
    try {
        await firestoreDB.collection('users').doc(userId).collection('questions').doc(questionId).update({ status: '完了' })
        console.log(`ユーザID ${userId} の 課題ID ${questionId} のステータスを完了に更新しました`)
    } catch (error) {
        console.log(error)
    }
};

const userId = '1'
const questionId = '3'

completeQuestionStatus(userId, questionId);