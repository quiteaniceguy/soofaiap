# Soofaiap
Soofaiap is a prototype location-rating tool written in Javascript(This is all just copied from Molly's email). It analyzes information about a city collected from a variety of freely-accessible APIs (Google Maps, Yelp, etc.) and then displays this information to users in the form of a heat map and weighted averages. For instance, the Google Food Data gives an indication of how many food businesses are in the area based on Google Maps data. Some metrics are weighted by metadata, such as the number and quality of reviews.

View it live here: https://soofaiap-7b415.web.app

Changes to the original application:
  - Added function that automatically identifies the best locations to maxamize scores, users can choose both which datasets to use and number of locations to find
  - restructured code to promote modularization and general organization
  - added testing using jest
  - minor display updates: included soofa logo, and added bootstrap, honestly still kinda ugly though
  - hosted using Firebase
  
To-Do:
  - restructure code more; disturbing amount of global variables and lack of modularization, everything is currently thrown in one giant script file, which should be split into smaller functions.
  - Display is still ugly, major overhaul would be nice. Also renders differently on different screens, should be designed with other formats in mind
  - implement testing for functions other than k-means
  - get new google maps access key
  

  


