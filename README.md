# `About Sanctuary`
![Alt text](frontend/images/current_home_page.png)

## This project is being made to emulate the AirBnb web application. Rebrand to "SANCTUARY" since users will be requesting safe haven from the outdoors through a monetary exchange. At the moment, CRUD for two features have mostly been completed thus far. Locations and Reviews features are set to test their full CRUD capabilities. Home page gives you quck access to brief preview of the spot and its pricing. Clicking anywhere on the spot image or body description takes you to a further detail route with information on that spot. Here you can see reviews, make reviews, as well as delete said reviews and said spot if logged in as the owner. Both home page and spot details page have access to a nav bar at top where you can always view user profile options(login etc), create a new listing for a sanctuary, and as well as quicly navigate back to home page. Users can now create bookings for each spot land manage those bookings using user prfile dropdown.

# Technologies Used:
- React
- Redux 
- Sequel
- Sequelize 
- Javascript
- NodeJS
- CSS
- Database: PostgresSQL
- Hosting: Render

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.
   
6. Use Sequelize-cli commands to migrate and seed database.
  ```bash
   npx sequelize-cli init

   ```

   ```bash
   npx dotenv sequelize db:migrate

   ```

   ```bash
   npx dotenv sequelize-cli db:seed:all

   ```

   ```bash
   npm start
   ```
7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


# Features Directions:

### Checkout the illustrations below depicting how users can interact with basic CRUD functionality for specific features

## login/sign-up
![image](https://github.com/SleptBear/Sanctuary_Clone/assets/107887726/3952d9b2-59f4-4a4d-8ef0-02ce9544c049)


## Demo User/Log in
### Some functionality of site is locked behind a user needing to be logged in. Create a new one or use our demo user when trying to log in.
![image](https://github.com/SleptBear/Sanctuary_Clone/assets/107887726/55a010e0-3d7a-45b3-8b4e-cb5475e96c15)

## Create your sanctuary listing on our site
![image](https://github.com/SleptBear/Sanctuary_Clone/assets/107887726/34914e4a-c85b-4ae7-9f23-18286445990d)

## Current Spot Details Page on creation and no updates
![Alt text](frontend/images/spot_details_page.png)

## Create your own review about a location.
![image](https://user-images.githubusercontent.com/107887726/229395628-98d7952d-fa9e-440d-8c01-b5abb9e236a3.png)

## User can create bookings on location details page
![image](https://github.com/SleptBear/Sanctuary_Clone/assets/107887726/24f31f30-4974-490f-a6c7-8fbd2ae77583)

## User can manage bookings (RD)
![image](https://github.com/SleptBear/Sanctuary_Clone/assets/107887726/0e3b535b-7bc1-47bc-8998-ad3c68dbcc5b)

# Features Coming Soon
## Filtered Search on navbar

