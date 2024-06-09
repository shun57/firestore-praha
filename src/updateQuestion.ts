import { firestoreDB } from './lib/firestoreDB';

const updateQuestion = async (questionId: string, title: string, description: string) => {
    try {

        const usersSnapshot = await firestoreDB.collection('users').get();
        const batch = firestoreDB.batch()
        // 各ユーザーの課題を更新
        usersSnapshot.forEach(userDoc => {
            const questionDocRef = userDoc.ref.collection('questions').doc(questionId)
            batch.update(questionDocRef, { title: title, description: description })
        })

        // 課題を更新
        const questionDoc = firestoreDB.collection('questions').doc(questionId);
        batch.update(questionDoc, { title: title, description: description });

        await batch.commit()
        console.log(`課題ID ${questionId} を更新しました`)
    } catch (error) {
        console.log(error)
    }
};

const questionId = '1'
const title = '課題1（更新済み）'
const description = '課題1です（更新済み）'

updateQuestion(questionId, title, description);