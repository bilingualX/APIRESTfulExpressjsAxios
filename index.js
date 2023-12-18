import express from 'express';
import axios from 'axios';

const app = express ();

const API_URL = "https://secrets-api.appbrewery.com";

app.use(express.static('public'));

/*app.get("/", (req, res) => {
    res.render('index.ejs', {secret: secret})
})
*/
app.get("/", async (req, res) => {
    try {
      // Make a GET request to the API to fetch the secret
      const apiResponse = await axios.get(API_URL + "/random");
      
      // Assuming the API response contains a 'secret' property
      const secret = apiResponse.data.secret;
      const user = apiResponse.data.username;

      // Render the 'index.ejs' view and pass the 'secret' variable
      res.render("index.ejs", { secret: secret, user: user });
    } catch (error) {
      // Handle errors, e.g., log the error and render an error page
      console.error("Error fetching secret:", error.message);
      res.render("error.ejs", { errorMessage: "Failed to fetch secret." });
    }
  });

app.listen(3000, () => {
    console.log('working')
})

// HINTS:

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
