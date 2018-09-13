import { Component } from '@angular/core';
import { MarvelService } from './service/marvel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  idsComics = [];
  characters = [];
  character: any;
  comics = [
    { label: "The Avengers", value: "avengers" },
    { label: "The X-men", value: "x-men" },
    { label: "Spiderman Friends", value: "spider-man" },
    { label: "Wolverine Friends", value: "wolverine" }
  ];

  comicName: any;

  constructor(private marvelService: MarvelService) {
  }

  ngOnInit() {
    console.log("array", this.comics);
  }

  findComicsByName() {
    this.characters = [];
    let idsComics: any = [];
    if (this.comicName) {
      this.marvelService.getComicsByName(this.comicName).subscribe(data => {
        data.data.results.forEach(function (value) {
          idsComics.push(value.id);
        });
      }, err => {
        console.log("the error..!!!:err:", err);
      });
    }
    this.idsComics = idsComics;
  }

  findCharacters() {
    this.characters = [];
    let characters = [];
    let promises = [];
    this.idsComics.forEach(id => {
      promises.push(this.marvelService.getCharactersByComicId(id));
    });

    Promise.all(promises).then((responses) => {
      console.log('res', responses);
      responses.forEach(coms => {
        coms.data.results.forEach(element => {
          // console.log(element.name);
          characters.push({ id: element.id, name: element.name });
        });
      });
    });
    this.characters = characters;

    console.log("--findCharactersByComicId..... ", JSON.stringify(this.characters));
  }

}
