Getting Started with Node.js on IBM Cloud

The following tutorial walks you through the steps to enable an existing Node.js application for deployment to IBM Cloud and add IBM DB2 database.

The following instructions are for deploying the application as a Cloud Foundry application.

Prerequisites
You'll need the following:

1) IBM Cloud account
2) Cloud Foundry CLI
3) Git
4) Node.js
5) Sublime or VS code editor
6) Basic knowledge of SQL

What is Db2?
Db2 is a Relational Database Management System(RDBMS). It organizes the storage of a vast array of types of data, and optimizes the later retrieval of that data. It implements the standard concepts of a relational database, as well as the SQL standard query language that is available on relational database systems. It also allows storage in non-relational formats such as XML and JSON.

1) Download Assignment_1 and change into its directory.

2) download people.csv (Excel file). It holds information about individual person details. You are going to use it as data set.

Step 1: Provision the SQL Database
Start by creating an instance of the Db2 on Cloud service.

1) Visit the IBM Cloud® dashboard. Click on Catalog in the top navigation bar.

2) select Db2.

3) Select a region (eg Dallas), Select plan (select Lite as it is Free and student friendly just to explore the feature).Configure your resoursces are pre populated.

4) Click on Create. The provisioning starts.

5) Get your username and password by clicking the “Service Credentials” link to the left and selecting “New Credentials”.

6) After creating the credentials expand the created credential to get "dns". copy and paste this dns in a notepad or somewhere we will need this to add in our Node.js application to connect to the database.

example
"dsn": "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-12.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=xyzz88990;PWD=yourpassword;",

[Note:- Do not copy paste the above thing it won't work it's just an example]

7) Click on Manage -> Open Console to launch the database console.

Step 2: Create a table and Load data
You need a table to hold the sample data. Create it using the console.For this tutorial, you are going to upload data from your machine. During that process, you adapt the table structure and data format to fully match the file content.

1) In the console for Db2.In the top navigation click on Load and Load data. Then, after clicking My Computer, under File selection, click on browse files to locate and pick the file "people.csv" you downloaded.

2) Click Next to get to the schema overview. Choose the schema of your choice, then click on new table create the table PEOPLE. Click on Next again.

3) Now customize how the data from the file "people.csv" is interpreted during the load process. First, disable Detect data types.

4) Click Next and you are offered to review the load settings. Agree and click Begin Load to start loading the data into the PEOPLE table. The progress is displayed. Once the data is uploaded it should only take few seconds until the load is finished and some statistics are presented.

5) Click on View Table to browse the data. You may scroll down or click on column names to change the sort order.

Step 3: Verify Loaded Data Using SQL

The data has been loaded into the relational database. There were no errors, but you should run some quick tests anyway. Use the built-in SQL editor to type in and execute some SQL statements.

1) In the top navigation click on RUN SQL to get back to the SQL editor. Click on the + symbol (Add new script) and Blank to create a new editor tab.

2) In the editor type

select * from people;

3) In the editor select the text of the above statement. Click the Run selected button. Only this statement should be executed now.

Step 4: Adding the dns in Node.js app

1) Go to clonned Node.js app

2) Open connection.js file and update "const connStr" with your dns credentials and save.

Step 5: Deploy the application code

Change back to the terminal and the directory with the cloned repository. Now you are going to deploy the application code.

1) Push the application to the IBM Cloud. You need to be logged in to the location, org and space to which the database has been provisioned. Copy and paste these commands one line at a time.

cf login -a https://api.ng.bluemix.net
cf push –m 128M APPLICATION NAME

wait for some timefor deployment to get completed.Once completed type the following in new tab and check your deployed app at 

http://APPLICATION NAME.mybluemix.net/profile

To run locally

Run your application locally.

View your app at: http://localhost:8000/profile

Update profile.js with appropriate queries.

Remember to stop the application when not in use

To stop the application on IBM cloud

1) Access your IBM Cloud account.
2) Click the three parallel lines in the upper left corner of the page and select Dashboard.
3) Click the specific application name in the Apps section of the dashboard.
4) Click the 3 dots to the right of the specific application in the application list.
5) Select Stop App
