# Server-Side-API-Weather-Dashboard

Upon start up the user will be shown this page. These elements have all been hardcoded.
![weather main](https://user-images.githubusercontent.com/91164950/144687765-0f55267b-415c-4bc1-a14f-e6994dfa3e91.PNG)
The user must input a city name from anywhere around the world

Once the name has been inputed the user will be presented with the city name, the current date in that city, an icon to display weather conditions, temperature, wind speed, humidity and a uv index. below the user will be able to also see the 5 day forecast for the city. 

![weather page](https://user-images.githubusercontent.com/91164950/144687993-dfce4d3c-4d7b-4c92-babe-7101ffc45063.PNG)

The weather dashboard uses the same API, but in order to display the uv index and the 5 day forecast different parameters need to be used. 2 seperate functions were created to handle the response based on city name, and the second function to handle the uv index and 5 day forecast based on returned data (latitude and longitude) from the first API. 

As seen above the UV index is color coded. The colors are green for safe UV, orange for a safe but higher UV and red for a dangerous UV. These colors are all displayed using if/else statements. 

On the left hand off the screen you can see previous searches. These are presented using the localStorage setItem method to set the city names into an array and the getItem method to display these elements dynamically onto the page. Additionally the previous searches are clickable and will automatically search for the cities weather conditions, as well as erase the previous displayed content/data.
