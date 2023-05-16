# Senderos Serpenteantes - No Frills App for Hikers

Senderos Serpentantes is a no-frills app for hikers to learn about, share, and save trails.
- [Senderos Serpentantes Trello Board](https://trello.com/b/BCFgb0eM/senderos-serpenteantes)
- [ERD](https://lucid.app/lucidchart/9fd9a54e-3255-4d84-8ff8-6b8d88bce402/edit?viewport_loc=-158%2C141%2C1591%2C863%2C0_0&invitationId=inv_2c3fd439-226b-40e8-9ba6-8214980554d3)

## ERD
![ERD](https://i.imgur.com/1PohWJV.png)

## Wireframes

**Home Page**
![Home Page](https://i.imgur.com/uehY9Xm.png)

**All the Trails**
![All the Trails](https://i.imgur.com/Yh2DuZA.png)

**Add Trails**
![Add Trails](https://i.imgur.com/WI9SHIH.png)

**Show Trail**
![Show Trail](https://i.imgur.com/bOAL3WM.png)

**User Profile**
![User Profile](https://i.imgur.com/26B2L1K.png)

## Technologies Used

- HTML
- CSS
- Javascript

## User Stories

As a user, I want:
- To login to the app, so that I can research and/or log trails.
- To be able to log out of the app.
- To be able to learn about trails by reading about them on a unique page.
- To be able to add new trails.
- To be able to edit a trail.
- To leave a review for a trail.
- To be able to add completed trails to my profile.
- To make lists of my favorite trails.
- To see lists of trails made by other users.
- To see all trails in an area rendered on a map.
- To see the trails I've hiked rendered on a map on my user profile.
- To be able to search for trails by region.
- To be able to filter trails by length.
- To be able to filter trails by features.
- To be able to filter trails by review.

## Pseudocode

- **User Authentication**
  - `function login(username, password)`: Verify user credentials and log them into the app. Return logged-in user object.
  - `function logout(user)`: Log out the user from the app.

- **Trail Operations**
  - `function get_trail(trail_id)`: Retrieve trail details based on the provided trail ID. Return trail object.
  - `function add_trail(trail_data)`: Add a new trail to the app's database using the provided trail data. Return newly added trail object.
  - `function edit_trail(trail_id, updated_data)`: Update the trail details for the specified trail ID using the provided updated data. Return updated trail object.

- **Review Operations**
  - `function add_review(trail_id, review_data)`: Add a review for the specified trail using the provided review data. Return newly added review object.

- **User Profile Operations**
  - `function add_completed_trail(user, trail_id)`: Add the specified trail to the completed trails list for the user. Update user profile information.
  - `function create_favorite_list(user, list_name)`: Create a new favorite trails list for the user with the provided list name. Return newly created list object.
  - `function get_user_lists(user)`: Retrieve all the favorite trails lists for the user. Return a list of list objects.

- **Trail Filtering and Searching**
  - `function search_trails_by_region(region)`: Search and retrieve trails based on the specified region. Return a list of matching trail objects.
  - `function filter_trails_by_length(trails, min_length, max_length)`: Filter the given list of trails based on the provided minimum and maximum lengths. Return a filtered list of trail objects.
  - `function filter_trails_by_features(trails, features)`: Filter the given list of trails based on the provided features. Return a filtered list of trail objects.
  - `function filter_trails_by_review(trails, min_rating)`: Filter the given list of trails based on the provided minimum rating. Return a filtered list of trail objects.

- **Map Rendering**
  - `function render_trails_on_map(trails)`: Render the given trails on a map display. Display markers or overlays representing the trails.

