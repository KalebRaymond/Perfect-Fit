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


## Aside (for future reference)

I chose to use MySQL for this project because I wanted to learn about databases, but because SELECT queries return arrays, creating outfits quickly becomes inefficient and hard to maintain when they consist of more than three articles, as it will have to loop over that many arrays.

A more efficient approach might be to store the user's clothes as a graph. 

![ClothesGraph](https://i.imgur.com/gGfzfs0.png "test")

Now inserting an article would require a BFS. For every node that matches with the new node, an edge is created. For an adjacency list this would take O(V + E) time. Deletions are essentially the same thing but with removing edges instead.

Every cycle in the graph that contains the selected article, exactly one shirt, and exactly one pair of pants is a potential outfit (it is possible for the cycle to contain an article that matches with individual pieces but doesn't fit in with the whole outfit.) Since finding the longest simple cycle of a graph is NP-Complete, finding every simple cycle of a graph is also NP-Complete. However, if there is a predetermined maximum number of articles that an outfit can contain, this would limit the amount of vertices that can be visited from the selected article, and perhaps it would reduce the search space enough to get a decent runtime...
