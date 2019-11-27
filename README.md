My Business Cards app is hosted on Firebase at: https://business-cards-f8fdb.firebaseapp.com
The Github URL is: https://github.com/nathan-chmielewski/business-cards

My application has the following functionality: 
* Login
* Logout
* Search by first name, last name, or organization (case-sensitive)
* Upload business card with webcam image, using Google Vision API text detection
* Update business card contents
* Delete business card
* Page not found

This project was an exercise in building a full-fledged prototype web app using Angular. The basic functions of the app work as expected, though you may experience a few quirks that can be resolved by a quick logout/clear browser. There are many components of the app that I would like to improve on in the near future, including improving text detection accuracy, the ability to update the business card image and contents from that image of a currently saved business card, improving search functionality (such as removing case-sensitivity, adding dynamic queries), multi-user support (using firebase UID to build separate databases), social login, improving routing (such as passing params, child routes across certain paths, login redirect), as well as design (currently using Bootstrap 4). 