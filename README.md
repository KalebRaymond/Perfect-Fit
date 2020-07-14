# Perfect-Fit

Perfect Fit lets users keep track of clothes in their wardrobe and automatically create matching outfits by picking one of their articles.  

![MyClothes](https://i.imgur.com/kvIRQRJ.png)
![Popup](https://i.imgur.com/G7V832L.png)
![PurpleShirtOutfits](https://i.imgur.com/gLda71w.png)
![BomberJacketOutfits](https://i.imgur.com/QNkltZa.png)

The angular frontend is shown here: https://kalebraymond.github.io/Perfect-Fit (although since this project uses MySQL and not Firebase, it doesn't actually do anything besides look pretty. To be able to actually add clothes and create outfits, see the installation steps below).

## Installation

Download this repo. Make sure you have MySQL installed and running.  In /Perfect-Fit-Node/server.js, in the "const con" object at the top of the file, replace the values of user, password, and database with the corresponding values of the MySQL instance you want to use. Then, in /Perfect-Fit-Node, run 'node server.js' to start the server.

In /Perfect-Fit-Angular, run 'npm install' to install the necessary node modules. Then run 'npm start' to launch the angular client. Open localhost:4200.
