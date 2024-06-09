import { firestoreDB } from './lib/firestoreDB';

const deleteQuestion = async (questionId: string) => {
    try {

        const usersSnapshot = await firestoreDB.collection('users').get();
        const batch = firestoreDB.batch()
        // 各ユーザーの課題を削除
        usersSnapshot.forEach(userDoc => {
            const questionDocRef = userDoc.ref.collection('questions').doc(questionId)
            batch.delete(questionDocRef)
        })

        // 課題を削除
        const questionDoc = firestoreDB.collection('questions').doc(questionId);
        batch.delete(questionDoc);

        await batch.commit()
        console.log(`課題ID ${questionId} を削除しました`)
    } catch (error) {
        console.log(error)
    }
};

const questionId = '3'

deleteQuestion(questionId);