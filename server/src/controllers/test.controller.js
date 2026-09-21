require("dotenv").config();
const mongoose = require("mongoose");
const { getUsers, getUserByName, getRecentUsers, createUser } = require("./user.controller");

function mockRes() {
    return {
        statusCode: 200,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(data) {
            console.log(`[${this.statusCode}]`, data);
            return this;
        }
    };
}

(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "wordle-clone" });

    //Uncomment these two lines of code to test your getUsers function!
    // console.log("Running getUsers()... ");
    // await getUsers({}, mockRes());

    //Uncomment these two lines of code to test your getUserByName function!
    // console.log("Running getUserByName() with input of nik...");
    // await getUserByName({ params: { username: "nik" } }, mockRes());
    // If you want to search for any other users, just replace the username "nik" above

    //Uncomment these two lines of code to test your getRecentUsers function!
    // console.log("Running getRecentUsers()...");
    // await getRecentUsers({}, mockRes());

    //Uncomment these seven lines of code to test your createUser function!
    // console.log("Running createUser()");
    // await createUser({ body: {
    //     email: "testemail@email.com",
    //     username: "testUser",
    //     password: "testPassword",
    //     bio: "I already finished the wordle on NY Times so I had to come here."
    // }}, mockRes());

    await mongoose.disconnect();
})();