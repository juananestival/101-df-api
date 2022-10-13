const express = require('express')
require('dotenv').config()
const dialogflow = require('@google-cloud/dialogflow-cx')
const fs = require('fs')
const PORT = process.env.PORT


const CREDENTIALS = JSON.parse(fs.readFileSync('/Users/juanantonioestival/.keys/hospitality-demo-361210-a223fae5fb99.json'))
const projectId = CREDENTIALS.project_id;
const location = 'global';
const agentId = 'fcb0a3b6-8299-4a9d-87e0-3731db89eab2';
const query = 'Estado de mi pedido';
const languageCode = 'es'
const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS['private_key'],
        client_email: CREDENTIALS['client_email']
    }
}
const {SessionsClient} = require('@google-cloud/dialogflow-cx');
/**
 * Example for regional endpoint:
 *   const location = 'us-central1'
 *   const client = new SessionsClient({apiEndpoint: 'us-central1-dialogflow.googleapis.com'})
 */
const client = new SessionsClient(CONFIGURATION);
const sessionId = Math.random().toString(36).substring(7);
    const sessionPath = client.projectLocationAgentSessionPath(
      projectId,
      location,
      agentId,
      sessionId
    );
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
        },
        languageCode,
      },
    };

/*
async function detectIntentText() {
    const sessionId = Math.random().toString(36).substring(7);
    const sessionPath = client.projectLocationAgentSessionPath(
      projectId,
      location,
      agentId,
      sessionId
    );
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
        },
        languageCode,
      },
    };
    const [response] = await client.detectIntent(request);
    for (const message of response.queryResult.responseMessages) {
      if (message.text) {
        console.log(`Agent Response: ${message.text.text}`);
      }
    }
    if (response.queryResult.match.intent) {
      console.log(
        `Matched Intent: ${response.queryResult.match.intent.displayName}`
      );
    }
    console.log(
      `Current Page: ${response.queryResult.currentPage.displayName}`
    );
  }
  */
 
  const app = express()
  app.use(express.json())

  app.get('/', (req, res)=>{
    res.send('Hola')
  })
  app.post('/api/dialogflow', async(req, res) => {
    const request = {
        //session: sessionPath,
        session:client.projectLocationAgentSessionPath(
            projectId,
            location,
            agentId,
            req.body.sessionId
          ),
        queryInput: {
          text: {
            text: req.body.queryText,
          },
          languageCode:req.body.languageCode,
        },
      };
    const [response] = await client.detectIntent(request);
    res.send(response)
  })
  app.listen(PORT, ()=> {
    console.log(`Server runing ${PORT}`)
  })