//Require the userModel we made 

const getUsers = async (req, res) => {
    //use the .find() function, which by default grabs all instances in our users collections

    //Do a 404 check based on whether the users length is === 0

    //res.json your const with the users you are going to return
};

const getUserByName = async (req, res) => {

    //use the .findOne({...}) function with username: req.params.username as your parameter

    //404 check to see if there is a single user returned

    //res.json your user
};

//make the getRecentUsers function with async (req, res)

//use the find() function with the .sort in descending order, and then limit your amount to 10
//Hint: .limit(10)

const createUser = async (req, res) => {
    const { email, username, password, bio } = req.body;

    // Check if all required fields are provided
    if (!email || !username || !password)
        return res.status(400).json({ error: "Email, username, and password are required." });

    // Check if the username is already taken
    if (await User.findOne({ username }))
        return res.status(409).json({ error: "That username is already taken." });

    // Check if the email is already in use
    if (await User.findOne({ email }))
        return res.status(409).json({ error: "That email is already in use." });

    const user = await User.create({ email, username, password, bio });

    // Remove the password before sending the user back
    const { password: _removed, ...safeUser } = user.toObject();

    // Return the user 
    res.json(safeUser);

};

const login = async (req, res) => {
    const { username, password } = req.body;

    // Check if the username and password are provided
    if (!username || !password)
        return res.status(400).json({ error: "Username and password are required." });

    // Check if the username and password provided are valid 
    const user = await User.findOne({ username });
    if (!user || user.password !== password)
        return res.status(401).json({ error: "Invalid username or password." });

    // Remove the password before sending the user back
    const { password: _removed, ...safeUser } = user.toObject();

    // Return the user 
    res.json(safeUser);

};

const addPastGame = async (req, res) => {

    const { word, guessed_words } = req.body;

    // Check if all required fields are provided
    if (!word || !Array.isArray(guessed_words) || guessed_words.length === 0)
        return res.status(400).json({ error: "word and guessed_words are required." });

    // Check if the user exists
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found." });

    // A win means the last guess was the word. The server works this out
    // itself instead of trusting a "won" flag from the browser.
    const won =
        guessed_words[guessed_words.length - 1].toUpperCase() === word.toUpperCase();

    // Push the new game to the top of the user's past games
    user.past_games.push({ word, guessed_words, date: new Date() });

    // Update the user's streak if won 
    user.streak = won ? user.streak + 1 : 0;

    // Save the updated user 
    await user.save();

    // Return the result 
    res.json({ game: user.past_games.at(-1), streak: user.streak });

};

//Add your functions into the list below as exports!
module.exports = {
    login,
    createUser,
    addPastGame,
}; 