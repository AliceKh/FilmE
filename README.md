![](https://lh3.googleusercontent.com/C47AC9F4oY7pKNM_cz5oU5kzYmA7LmTJYTnIGsZLsptE2DPl9zmi1V9Lv8Z57BfW0qioIpzMlE2_6byLKq9TQAleXPoU8q_Yu7FjMuHgxDf5i9RdCKjPHSMZD5pPmkqBPUVJOORHw4Gm)

  


**FilmE**

**Final Project Design**

  
  
  


By Team 128:

Alice Khodorkovsky

Rashel Tankilevich

Daniel Akulich

Dan Geimanson

Supervisor:

Dr. Eliahu Khalastchi

Git:

<https://github.com/AliceKh/FilmE>

**Table of Contents**

[**1. Project description**** ****3**](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.bfex7cqbredk)

[**2. Related Work**** ****3**](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.odcr0oqg9clk)

[**3. Functional Description / Requirements**** ****3**](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.hikpgnt7n8en)

[**4. Architecture**** ****4**](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.leox1uq33l1s)

[4.1. Each Module description 4](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.hdop8zl8wmpo)

[**5. Work plan**** ****5**](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.pz879zlzipu)

[**6. Client side**** ****6**](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.yyas3wfl3m7f)

[6.1. Usage Illustration 6](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.t8tln5lvjfkq)

[6.2. Mockup 7](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.9c7b0keefwnw)

[**7. Server Side**** ****9**](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.b1cuzntp10ez)

[7.1. API 9](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.c67tfrtrw4)

[**8. References**** ****9**](https://docs.google.com/document/d/1JTd2Dyp_pkPHFAk64en-LggUcb4ItEgl/edit#heading=h.g0b3ssuk1qfj)

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


1. **# Project description**

FilmE is a platform that enables content creators to upload and share audio and video materials such as songs and videos. Users can provide authentic feedback by capturing their facial expressions as they watch or listen to the content using our real-time facial recognition technology. This allows us to analyze the data and provide creators with an accurate assessment of their content's reception.

2. **# Related Work**

After conducting a thorough search of existing content uploading platforms, we discovered that none of them offer the capability for users to provide authentic, real-time feedback for audio and video materials. While we did find some applications that allow for static responses such as photos or text, none of them provide the ability to analyze and interpret emotional responses. The BeReal app, for example, allows users to share unedited photos of their current activities, but does not offer any analysis of emotional responses to the content being shared. Our platform aims to fill this gap by using facial recognition technology to analyze users' emotional reactions to content in real time. This allows creators to receive accurate, data-driven feedback on their content.

3. **# Functional Description / Requirements**

FilmE is a platform that helps young artists reach a larger audience and get valuable feedback on their work. Artists can create profiles and upload audio or video content for users to watch and provide feedback on. Using facial recognition technology, the application analyzes users' emotional reactions and provides artists with an overall assessment of their content's reception. This allows artists to get a sense of how their work is being received and, if the content is not yet released, make any necessary adjustments before it is officially published. To maintain the authenticity of users' reactions, individual responses are kept private and the overall conclusion is shared only with the artist.

  


Functionality:

- For Artists:

  - A page featuring all the artist's uploaded content
  - Ability to upload audio or video content
  - Visualization of users' reactions to content
  - Graph showing users' emotional responses to content
  - Option to create "follower-only" or “pre-released” content

- For All Users:

  - Content viewing page (Explore Page)
  - Filtering options by artist name/genre and content type (audio or video)
  - Ability to provide authentic emotional response to content using facial recognition technology
  - Option to leave a text or emoji response, with the requirement of providing a authentic emotional response before submitting                             

   

4. **# Architecture**

![](https://lh4.googleusercontent.com/hwjYOLCNmdhSakpvqhDLo2omRvZR-9fv8DYNT8KQg0UrHdD0l_69j6lE9dUPgWuy8l61XGi984oMXpyEvUDKFjz2c4b8RHF_jqNjdYZfe9sJ7LjpDmpZRuqp0qhMrgXn3YrNUkQPPTnI)

  


FilmE is a platform that enables content creators to share audio and video materials such as songs and videos with a wide audience. The application for FilmE will be a mobile app written in Java language, allowing users to access the platform from their personal devices. The app is designed to accommodate two types of users: artists and regular viewers. Artists can upload their content for others to view and react to, while regular viewers can provide feedback on the content using our real-time facial recognition technology. This technology allows us to analyze the data and provide creators with an accurate assessment of their content's reception.

The back-end server for the app will be created with Node.js and is responsible for handling requests from the clients and providing appropriate responses. This ensures smooth and efficient operation of the platform, allowing artists and regular viewers to easily share and engage with content. Whether you are an artist looking to share your work or a viewer seeking new content to enjoy, FilmE provides a user-friendly and intuitive platform for you to do so.

  


1. **_## App Users_**

FilmE users can be divided into two categories: artists and regular viewers. Artists are those who upload their own audio or video content to the platform for others to view and react to. Regular viewers are those who watch and provide feedback on content created by artists.

2. **_## Mobile Application_**

The FilmE mobile application will be an android app developed in the Java programming language. It will feature all of the pages and layouts necessary for users to navigate the app and access its features.

3. **_## Backend Server_**

The backend server for FilmE will be created using NodeJS, a JavaScript runtime environment. It will handle all requests made by clients and provide appropriate responses.

4. **_## Service_**

The facial recognition technology used in FilmE is an external service that is called upon by the app's service module whenever a user is reacting to content. This technology analyzes the user's facial expressions and assigns a corresponding emotion to them. The service module is responsible for communicating with the facial recognition service and using the data it receives to provide the app with an accurate assessment of the user's reactions.

5. **_## Database_**

The database for FilmE will be powered by MongoDB, a popular NoSQL database management system. It will be used to store and organize all of the data related to the app, including user profiles, content uploaded by artists, and reactions from viewers.

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


5. **# Work plan**

Responsibilities:

- Project manager 
- Full-stack developer 
- Back-end developer 
- Front-end developer
- DevOps engineer
- Artificial intelligence developer
- UX/UI designer
- Quality assurance

**Milestone 1:** Organizing the project team and assigning roles

- Responsibility: Project manager

**Milestone 2:** Designing the user interface and user experience

- Responsibility: UX/UI designer

**Milestone 3:** Setting up the development environment and necessary IT infrastructure (e.g. databases, Kubernetes)

- Responsibility: DevOps engineer

**Milestone 4:** Testing and researching the facial recognition technology

- Responsibility: Artificial intelligence developer

**Milestone 5:** Implementing the emotional analysis feature

- Responsibility: Artificial intelligence developer

**Milestone 6:** Developing the back-end of the app (e.g. implementing the upload and feedback features)

- Responsibility: Back-end developer

**Milestone 7:** Developing the front-end of the app (e.g. creating the user interface)

- Responsibility: Front-end developer

**Milestone 8:** Integrating the back-end and front-end of the app

- Responsibility: Full-stack developer

**Milestone 9:** Testing and debugging the app

- Responsibility: Quality assurance

**Milestone 10:** Launching the app

- Responsibility: Project manager

This revised work plan assigns specific responsibilities to each team member for each milestone, but also acknowledges that the team will be working together on all tasks. This allows for flexibility and collaboration among team members as they work on the various tasks needed to complete the project. It's important to use a team management software like Monday, Trello, or Jira to track the progress of the project and ensure that all tasks are being completed on time.

- **NOTE: More detailed milestones and user stories will be added later.**

6. **# Client side**

Our mobile application features a visually striking design with a dark theme and bright, cool colors that are used consistently throughout the app to create a cohesive look. The use of arrows as a navigation tool allows users to easily move around the app and access different features, similar to navigating a cube. As the logo suggests, this arrow-based navigation system is central to the app's design.

In addition to its attractive appearance, our app also serves as a media player for audio and video content. When playing a piece, a window will appear on the screen allowing users to view themselves and align their faces in order to accurately capture their reactions. This is an important feature of the app, as it ensures that no emotional responses are missed and allows for the most accurate analysis of users' reactions using our facial recognition technology. Whether you are an artist looking for feedback on your work or a viewer looking to discover new content, our app provides an engaging and intuitive platform for you to do so.

1. **_## Usage Illustration_**

The FilmE app is designed to be intuitive and easy to use for all users. The app follows a cube-like navigation structure, as indicated by the logo, with swipes allowing users to access different pages and features.

When the app is first opened, users are presented with the main page, which offers three options: upload, react, or see profile. If the user wants to upload their own content, such as a song or video, they can swipe up to access the upload page. Here, they can choose to upload audio or video content and then will be directed to their profile page once the upload is complete.

Alternatively, users can choose to react to content by swiping right to access the Explore page. On this page, they can browse through recommended content or search for a specific artist or type of content. Once they have selected a piece to react to, the cube will turn to the right and the reaction process will begin. The user's face will be recorded as they listen to the audio or watch the video, and they will be asked to align their face within the square on the screen to ensure optimal detection by the facial recognition algorithm. If the user's face is not properly aligned, a popup will appear asking them to adjust their position.

After the content has finished playing, users will have the option to leave a comment or continue reacting to other pieces of content. They can access their own profile by swiping down from the main page, where they can view their uploaded content, see the reactions and comments received, and link their account to other social media platforms.

For artists using the app, they can access their profile and select a specific piece of content to view the overview page. This page shows them the most common emotions felt by users who have reacted to their content, as well as a color-coded graph showing the emotions felt by users at each point in the content. They can also see the parts of the content that elicited the strongest emotions in most users, such as the "happiest" or "saddest," and easily access those parts using the provided button. This information can help the artist understand how their content is being received and make any necessary adjustments before official release.

  


2. **_## Mockup_**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![](https://lh4.googleusercontent.com/v4D4kL1ev6d4vMz0I_xQODhd4sI-RH17Dt-6UFWeENTiAFH-UsuNpSuILakBi6QR3FYbrDRp6U4RJ0dFW4FNjxtVSjH4oJ_Q9NW7S3AnxhzURPR0bIZOglqOgcUlW9CEKA0GpL2BsQ1t)                                                                                                                                                                                                                                                                                                                                     | ![](https://lh5.googleusercontent.com/_f1PLMSzayFeQwLdJYGzag5cXIee6dRVr63OdYKgclpajnGM6yXRYpRMUrT4BScSyY1xkCBI1m5dxdlqL9yjvCFm7mCCSmQ7iYdZ2DfC2FM8UikssnxHb4BrW11mPBlS7U-J0DY4PsD3)                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ![](https://lh6.googleusercontent.com/ufkO4PK3PCBVxzD1lC28QY4mqqaZCe1BAX9HcDwHSbKEoJVUbR2UupQLfWvKrRirKNezuUJMkz_pEZ_o6_JNDOEsPdb2jp2D0IclncIuj6OjAPl5UKiefqVWQyjXzw8L7P8vFDHn3AnK)                                                                                                                                                                                                                                                                                |
| First Page:This is the initial page that users will see when they open the application. Using the arrow-based navigation, users can go up to the upload page, down to the profile page, or right to the Explore page where they can react to the available content using our facial recognition technology.                                                                                                                                                                                                             | The Explore page:On this page, users can view all of the available content and react to it by swiping right according to the arrow prompts. They can also search for specific songs, videos, artists, or content creators using the search function.                                                                                                                                                                                                                                                                                                                                                                                   | The reaction visualization:On this page, users can view specific data on a particular piece of art or content. It displays the top three emotional reactions and then presents a full graph of all the reactions using a color scheme to show emotions by color. Below the graph, users can see the "most \_\_\_\_" section, which includes the most happy and most sad parts of the content , as well as a feature to rewatch or listen to those parts again.     |
| From the explore page, the cube turns right for a reaction:                                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ![](https://lh3.googleusercontent.com/k1qkH8OC54RQ1XPj8pJov2U4YUV861yA55Djb9rkOMf_Tj07lkW4cxdbS2mW7PQ3_22_mzyUob_bOzTqeH4MgCRbJ-kKi7DlAyL9KYFJG_HBtgihcpTfj4nCLpDuIq0k5S3njGNjDmVS)                                                                                                                                                                                                                                                                                                                                     | ![](https://lh3.googleusercontent.com/LrQhYQ2ZWSFhBTT5hD20wGVyr1p5xE4GVFVVylnAPQ93nhtIH0leQ1tQFo4c7lK5OOJLWe2lk74CgMVyCSCHhEg2HJBLR_IxJpDTbl_-tdMsy9Dtb1QQM1nci1NYIKXhS8u_1jDEqFKp)                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ![](https://lh3.googleusercontent.com/N06K0XpIXKwAEL2R4grvArhWMm0nWpEz8FyFlZWnr-nbAIGSqX_jOoywH7uUUdaFbwVC7ApfIxtqohnCIV7eYUoWR_Cc0-o20QIBe4XkYaWlowQJGTscfS8G01MyAXLohyNgbs-3i7zN)                                                                                                                                                                                                                                                                                |
| Listening to Audio:While listening to an audio piece, users can see their progress within the song and a colorful visual video similar to the old Windows music player. This helps to keep users engaged and ensures that their reactions are properly captured. If a user's face is not properly aligned with the camera, a popup will appear. There is also a comment section where users can view and leave comments, but this becomes available only after their reaction has been recorded to ensure authenticity. | Not in Frame popup:If a user's face is not properly aligned with the camera while using FilmE, a popup will appear stating that they are not in frame. The video or audio will pause and become blurred until the user adjusts their position and aligns their head within the designated green square on the screen. This ensures that the facial recognition technology can accurately capture the user's reaction. The popup also includes an explanation of the issue and a view of the user's camera to help them properly align their head. Once the user is ready, they can press the button to continue watching or listening. | Watching a Video:The video is displayed horizontally, similar to TikTok. While watching the video, users' reactions are recorded and analyzed using facial recognition technology. If a user's face is not properly aligned with the camera, the video will pause and a popup will appear. There is also a comment section where users can view and leave comments, but this becomes available only after their reaction has been recorded to ensure authenticity. |
| From the main page, swipe down and one of three pages will appear:                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ![](https://lh6.googleusercontent.com/RzklMTe509x2HXMBoe3a5S3GQgt05kNyF1N6y74Q6JmZ6y3tPi16r6u4vJMuu-UdoPdEMwLk9nXNSN929dSd75evUV-3XC-u-FkxmPRDUgO0XCKpAF9VVAYEzAzLwVX9dUYKbEFRyvuM)                                                                                                                                                                                                                                                                                                                                     | ![](https://lh3.googleusercontent.com/yb8WDW6ysiK7Gh_teE258MazZa1ge4ivYwPD3jcdgpUtWAxVhn7tGAWhTZ2DnYSeQz4iDl4fMGQT6_nVB4oCKUZyH380dBzhEwTTxCO1lDdA8A06bqj9_EuGkea5zbjeg7LHTkypE_ll)                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ![](https://lh6.googleusercontent.com/TFn6I949ZomhLAO0I1P6MnhffNJ8_H4ggerVvb7fyJdfYMHLT6id16eaGuCIEGixa60k-CdJ081p7TogcFbvy9eFk1mmsfE3KLX_ANDGdn2hXVxMY13Fr1cFF8vk8R_c30XAZh9qwv5U)                                                                                                                                                                                                                                                                                |
| Log In:The login page features a minimalist version of the FilmE logo and a hint of the purple and cyan color scheme on a white background. Users can log in by entering their email and password.                                                                                                                                                                                                                                                                                                                      | Sign Up:The sign up page also features a minimalist version of the FilmE logo and a hint of the purple and cyan color scheme on a white background. Users can create an account by entering their email, name, and password.                                                                                                                                                                                                                                                                                                                                                                                                           | User Profile:The user profile page in FilmE includes a basic user's profile functions. They can see instead of a "likes" count, FilmE measures engagement with a "reactions" count, similar to views on other platforms. On the user profile page, users can also link their account to other platforms such as Spotify, TikTok, YouTube, or Instagram. The profile page is divided into two tabs: one for the user's uploaded content and another for alerts.     |

7. **# Server Side**

The server side of the FilmE application will be built using NodeJS and Express. It will handle requests from the client side, retrieve data from the database as needed, and send a response back to the client. Additionally, the server will utilize an emotion recognition algorithm to analyze the emotional responses of users after they have watched or listened to content on the platform. This data will be used by the client to generate graphs and other visualizations. The application will utilize a REST API over HTTP, using various types of requests such as GET, POST, and PUT.

1. **_## API_**

Registration and LoginBy registering for the FilmE application, users will fill a short form and their information will be added to the database upon successful registration. To log in to the application, users can use the username and password they provided during registration. The server will verify this information and grant access to the user.

Get content (popular)Users will be able to access a list of the most popular content available to watch or listen to, as determined by the server using data from the database. The server will retrieve this information and send it back to the user's device.

Get content of specific typeUsers can easily find the content they are interested in by using the filter feature. Simply type in the name of the desired genre or topic, and the server will return a list of relevant content for the client to browse. This allows users to easily access the content they want without having to sift through unrelated material.

Get content of specific userBy using the filter function, users can easily search for content created by specific artists or other users. Simply type in the name of the desired artist and the server will provide a list of relevant content for the client to view. This feature allows users to easily access content from their favorite artists or other users without having to search through unrelated content.

Send reactionUsers can select specific content they wish to watch or listen to and then record their live reaction by filming themselves while experiencing the content. The recorded data is transmitted to the server, which processes it using an emotion recognition algorithm and stores the results in the database. This enables the application to capture and analyze the user's emotional response to the content.

Add commentOnce a live reaction has been recorded, users will have the option to add a textual comment to the artist's content. To do so, they can type their comment and submit it to the server, which will then save it to the database for others to see.

Upload contentUsers who wish to share their audio or video content can upload it to their profile on the FilmE application. The server will receive this data and make it available to users. Content that receives more live reactions from users will become more popular and will be ranked higher on the list for new users to discover.

Display statistics of specific contentUsers can view the emotional response statistics for their content on the FilmE application. By selecting a specific piece of content, the user can request data on the emotions it elicited from viewers. The server will retrieve this information from the database and transmit it back to the user's device, where it will be displayed in the form of graphs and numerical data. 

8. **# References**

List of all the references used in the doc:

- Tools we used in client design:

  - Figma
  - Visio

- application we mentioned:

  - TikTok
  - Spotify
