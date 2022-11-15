

export async function getUsersDB(db) {
    var usersArray = [];
    await db.collection('users').get()
    .then((users) => {
        users.forEach((doc) => {
            usersArray.push(doc.data());
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
    return JSON.stringify(usersArray);
}
