import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  currentItem = "pikachu"
  currentItem2 = "charmander"
  number = Math.floor(Math.random() * 500) + 1
  items = [0]

  constructor() { }

  ngOnInit(): void {
    this.items = Array.from({length: 4}, () => Math.floor(Math.random() * 400));
  }
 
  createRange(){
  return this.items
}

}
