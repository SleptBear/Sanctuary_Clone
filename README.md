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

## Current Spot Details Page on creation and no updates
![Alt text](frontend/images/spot_details_page.png)
