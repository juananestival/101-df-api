import { Component, OnInit } from '@angular/core';
import { DialogflowService } from '../../services/dialogflow.service'

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  isBot = false
  dfRequest = {
    "queryText":"hola",
    "languageCode":"es",
    "sessionId":"abcd1235"
  }

  constructor(private dfService:DialogflowService) { }

  ngOnInit(): void {
  }
  detectIntent (){
    this.dfService.getDfIntent(this.dfRequest).subscribe(data => console.log(data.queryResult.responseMessages[0].text.text) )

  }

}
