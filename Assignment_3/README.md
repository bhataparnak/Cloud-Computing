Getting Started with Node.js on Microsoft Azure

The following tutorial walks you through the steps to enable an existing Node.js application for deployment to Azure Cloud
Assignment_3 folder is an example of in-memory caching using REDIS to improve performance.

The following instructions are for deploying the application as a web apps application.

Web apps are a part of Azure app services. It provides a fully manageable platform that enables you to build, deploy, and scale enterprise-grade Web Apps in no time.

Prerequisites You'll need the following:
1) An Azure account with an active subscription.
For new account you will get $200 credit for 30days.
2) The Azure App Service extension for VS Code (installed from within VS Code).
3) Git
4) Node.js and npm, the Node.js package manager.
5) Sublime or VS code editor
6) Basic knowledge of SQL
7) REDIS account
8) Microsoft SQL Server Management Studio

Creating the webapp

1) Login to your Microsoft Azure account

2) Click on the all service option in your portal.
Search for web apps. Choose the one under “App service”

3) Now click on the add icon. You are now in the marketplace. The marketplace houses a number of the software which we could use and develop on to deploy the cloud software.
Choose the “Web app” image developed by Microsoft. This image has no boilerplate code so we can develop our app from the ground up.

4) Once you have selected “Web App” click on “Create”.
The page you are in now after clicking on create lets azure know more about your web app. These are the options you will have to fill:
   1) App name: Is the name of the app as well as the URL you will use. Make sure you are getting a green tick after you have entered the app’s name. If not azure will help you with it. Use only alphanumeric characters ('A-Z', 'a-z', and '0-9') and hyphens ('-').
   2) Subscription: Let’s azure know on which of the subscription to bill this web app. I choose “Pay-As-You-Go Dev/Test”.
   3) Resource group: In a nutshell resources group help in making a logical group of the services that you are using for an application, they can contain web apps, databases or other Azure services such as cognitive services and ML API endpoints etc. Choose “Create new”. If you have selected “Create new” you would have to name your resource group.
   4) OS: Choose Linux.
   5) Publishing option: Code.

5) App service plan: This is an important step. The options selected here can affect your apps basic performance.
   1) Choose “Create new”.
   2) Fill in the details. Make sure you choose the “Location” option which is nearest to you or the region where the app is going to be deployed.
   3) For the pricing tier: Choose the cheapest option under dev/test if you are building this for a small scale application or for experimenting with the platform. If you are building an enterprise-grade application choose the plan which suits you the best. Then click on apply. The plan I chose “B2 tier” and it’s free for 30 days after that will be charged.You can select the F1 Free pricing tier. You will get 60 minutes of free computing per day under free tire.

6) Runtime Stack: Choose the one which suits your application the best. I want my node application to use the latest version of node, So I chose the latest version.

Click on “Create” once you have filled all the necessary information.


Create an Azure SQL Database single database

1) From the Search bar, search for and select Azure SQL.

2) On the Azure SQL page, select Add.

3) On the Select SQL deployment option page, select the SQL databases tile, with Single database under Resource type. You can view more information about the different databases by selecting Show details.

4) Select Create.

5) On the Basics tab of the Create SQL database form, under Project details, select the correct Azure Subscription if it isn't already selected.

6) Under Resource group, select Create new, enter desired name and select OK.

7) Under Database details, for Database name enter desired name (eg adbdb).

8) For Server, select Create new, and fill out the New server form as follows:

 a) Server name: Enter server name (eg mysqlserver), and some characters for uniqueness.
 
 b) Server admin login: Enter desired name (eg adbdb).
 
 c) Password: Enter a password that meets requirements, and enter it again in the Confirm password field.(eg pwd123)
 
 d) Location: Drop down and choose a location, such as (US) East US.

 e) Select OK.

Copy and Paste the server admin login and password along with database name in notepad we will need to add this in our node application in "connection.js" file.

9) On the Networking tab, under Connectivity method, select Public endpoint.

10) Under Firewall rules, set Add current client IP address to Yes.

11) Select Review + create at the bottom of the page.

12) After the deployment completes, select SQL databases from the Azure portal menu or search for and select SQL databases from any page.

13) Select yourDatabase on the SQL databases page. The overview page for your database opens, showing you the fully qualified Server name (such as your_servername.database.windows.net) and provides options for further configuration.

Copy this fully qualified server name for use to connect to your server and databases from SQL Server Management Studio.

14) Click Set server firewall on the toolbar. The Firewall settings page for the server opens.

15) Click Add client IP on the toolbar to add your current IP address to a new IP firewall rule.Click Save.Click OK and then close the Firewall settings page.

Your IP address can now pass through the IP firewall. You can now connect to your database using SQL Server Management Studio or another tool of your choice.

Connection.js file in the node application should look like this (open this file and update details. This file is present in the Assignment_3 folder)

// Create connection to database
const config={
 authentication:{
 options:{
 userName:"Your_username", //update this
 password:"Your_password", //update this

},
 type:"default"
},
 server:"Your_servername", //update this
 options:{
 database:"Your_Database", //update this
 encrypt:true,
 rowCollectionOnRequestCompletion:true,
 useColumnNames:true,
 multipleStatements: true,
 
}
};
 

Connect to the database

Use SQL Server Management Studio to establish a connection to your database.

1) Open SQL Server Management Studio.

2) In the Connect to Server dialog box, enter the following information:
 a) Server name
 b) Login
 c) Password

3) Click Options in the Connect to server dialog box. In the Connect to database section, enter yourDatabase to connect to this database.

4) Click Connect. The Object Explorer window opens in SSMS.

5) In Object Explorer, expand Databases and then expand yourDatabase to view the objects in the database.


Create tables in your database

I am importing a CSV formatted file into my database using SQL Server Management Studio. 

1) Expand Databases, right-click a database, point to Tasks, and click Import Flat File above Import Data.

2) Then use the Browse button to select the CSV file.(for this example use l.csv and q.csv from the folder)

3) The new table name should be unique, and the wizard does not allow you to move further if not. (Give table names same as csv file names i.e l and q)
Spend some time configuring the data import before clicking the Next > button.

4) Click on Finish

5) If a green check mark appears, it was a success, otherwise you may need to review your configuration or input file for any errors.

To query database

In Object Explorer, right-click yourDatabase and select New Query. A blank query window opens that is connected to your database.

What is Caching?
Caching is the process of storing data into a cache. A cache is a temporary data store where data is kept for later use.
A cache as a data store is easier for the client (or server) to reach, as opposed to a permanent data store that might be located on a different service, which takes more time and resources to reach (a database or an external API endpoint).

What is Redis? Why use Redis?
Redis is a high performance open source NoSQL database primarily used as a caching solution for various types of applications. What is surprising is that it stores all its data in the RAM and promises highly optimized data reads and writes. 

Setup Redis
There are multiple ways to run Redis. The easiest way to start is to sign-up for the free Redis Cloud service offered by Redis Labs. You can then connect to the Redis Cloud database from your app that runs on any platform (Mac, Windows, Linux), or on cloud or PaaS.

Redis Cloud
Redis Labs offers Redis Cloud as a fully managed database as a service for free for datasets up to 30 MB. You can choose to run the Redis Cloud database as a service on Amazon Web Services, Microsoft Azure, or Google Cloud Platform. It is also available in many different regions of the world. 
Creating a Redis instance with Redis Cloud 

1) Sign-up for a free Redis Cloud account: Visit the Redis Labs Get Started page, and click on SIGN UP under “Cloud Hosted” section.
2) Setup a database endpoint: Once you create and verify your email address, you can login to your Redis Cloud account and create a new database. Your Redis Cloud database will be password protected. The URL to your endpoint will look like:
redis-11111.c1.us-east-1-1.ec2.cloud.redislabs.com:12345
 
In this example, 12345 is the port number of your Redis Cloud service.
 
redis-11111.c1.us-east-1-1.ec2.cloud.redislabs.com is the URL of your Redis service.

Profile.js (Present in Assignement_3/routes) should look like this.Update the details by addiding your credentials.

var redis = require("redis");
var redisHost = 'redis.us-east-1-1.ec2.cloud.redislabs.com'; //update this
var redisPort = process.argv[3] || 12345; //update this
var redisAuth = 'Your_Auth_Key'; //update this
var client = redis.createClient ({
    port : redisPort,
    host : redisHost
    });  
    client.auth(redisAuth, function(err, response){
    if(err){
    throw err;
    }
    else{
        console.log("Connection estabished to redis");
    }
    });


Deploy Node.js to Azure App Service using Visual Studio Code

Note:- You can use Git also to push the application. I am using App service extension to push my code onto Azure cloud.

1) Install the Azure App Service extension
2) Once you've installed the Azure extension in VS Code, sign into your Azure account by navigating to the Azure explorer, select Sign in to Azure, and follow the prompts. (If you have multiple Azure extensions installed, select the one for the area in which you're working, such as App Service, Functions, etc.)
3) After signing in, verify that the email address of your Azure account (or "Signed In") appears in the Status Bar and your subscription(s) appears in the Azure explorer.

Note
If you see the error "Cannot find subscription with name [subscription ID]", this may be because you are behind a proxy and unable to reach the Azure API. Configure HTTP_PROXY and HTTPS_PROXY environment variables with your proxy information in your terminal.

4) Select the Azure icon to open the Azure App Service explorer, expand your subscription node, right-click the name of the web app you just created, and select Deploy to web App.

5) Once deployment is complete, select Browse Website in the prompt to view your freshly deployed web app.

6) (Optional): You can make changes to your code files, then use the deploy button again to update the web app.


Testing the app
The URL of the web app can be found in the overview tab.Once the app is open in the browser you will observe the URL is not localhost any longer instead it is the app name you have given before.


Stopping/deleting the Web App
1) Go to the overview tab of the web app
2) Click on Stop/Delete.
3) Stop just stop all the processes running the web app but you have to pay for other services such as memory and other services running the app. Stopped can be used when you are adding new features or for other such changes in the apps. Delete on the other hand Delete removes all the services and processes working along with the webapp. You are billed no more for that specific web app.


Running Locally
start the node application
View your app at: http://localhost:8000/profile

Update profile.js with appropriate queries.

