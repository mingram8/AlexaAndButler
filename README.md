# AlexaAndButler

<h2>What is it?</h2>
<p>Combines Butler app and Amazon Echo. Uses Echo to act as microphone and Butler to do the lifting to operate house commands. This eliminates the hassle of using IFTTT (it is incredibly slow) and allows you to do a bunch of GET calls at once. It just generally frees the Echo from its commercial smart home cage.</p>

<h2>How to use it</h2>

<p>First we need to change the Butler/src/controllers/index.controller.js file. Change the line (if process.listening == true) to if (true). This will turn off the keyword acitvation and just allow it to accept whatever.</p>

<p>Open the index.js file and edit APP_ID and banksURL. I use ngrok.io to open the port that Butler sits on since I don't have a public IP. APP_ID is the id of your Alexa skill, if you don't know that I will explain further down. Just leave it blank for now.</p>
<p>You need an AWS account to create Lambda functions. Create a Labmda function with the template "alexa-skills-kit-color-expert". Click next. Name your function whatever you want, it isn't important. Where is says code, click upload zip file. Zip the two files, AlexaSkill.js and index.js and upload the zip file. </p>

<p>Where it says "role" choose "basic execution role". Then click next. Click create function</p>

<p>It will take you to a window that says "To configure the Alexa service to work with your Lambda function, go to the Alexa Developer portal." in the table. Click the Alexa dev portal url. Sign in with whatever account you used to connect your Echo. <b>This is very important. It won't work otherwise.</b> Go to "Apps and services" and click alexa in the tabs that open. Click "get started" under Alexa skills. Click "add new skill"</p>

<p>Name your skill, pick its invocation name (use a butler name. I use banks. So my speech is "Alexa, tell Banks to turn the kitchen lights on.") the Lambda arn is in the right hand corner of your lambda function. It should have opened a new tab when yopu click the portal so tab back to the function and copy and paste it. Click next. For intent, copy and paste the IntentSchema.json file from the speechAssets directory. Click "Add Slot Type". Name is "COMMANDS" <b>It has to be that way or the intent will fail</b> Add some sample commands. It isn't that important since Alexa just passes whatever was said. Under "Sample Utterances" copy and paste the SampleUtterances.txt file in the speechAssets directory. Click Next.</p>

<h5>Now go back to skill information. Copy Application ID and paste it in the index.js file for the APP_ID variable. Rezip and upload the files to Lamda. Click save<h5>

<p> Now talk to alexa and try it out</p>
