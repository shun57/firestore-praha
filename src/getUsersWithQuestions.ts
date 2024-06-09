import { firestoreDB } from './lib/firestoreDB';

const getUsersWithQuestions = async () => {
  try {
    const usersSnapshot = await firestoreDB.collection('users').get();
    const usersData = [];

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const questionsSnapshot = await userDoc.ref.collection('questions').get();
      const questionsData = questionsSnapshot.docs.map(questionDoc => questionDoc.data());

      usersData.push({
        ...userData,
        questions: questionsData
      });
    }

    console.log(JSON.stringify(usersData, null, 2));
  } catch (error) {
    console.error(error);
  }
};

getUsersWithQuestions()
