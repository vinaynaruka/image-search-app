import { Component, OnInit } from '@angular/core';
import { ACCESS_KEY } from 'src/app/core/constants';
import { ImageInfo, ImageSearchResponse } from 'src/app/core/models';
import { ImageDataService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  keywords = 'yellow flowers'
  loading = false;
  searchResult: ImageInfo[][] = [];
  numOfCols = 3;
  access_key = ACCESS_KEY;
  constructor(public dataService: ImageDataService ) { }

  submitted = false;

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.submitted = true;
    const searchTerm = this.keywords?.trim()?.split(' ')?.join('+');
    console.log('text = '+ searchTerm);
    if (searchTerm?.length) {
      this.loading = true;
      this.dataService.getImageData(1, searchTerm).subscribe(data => {
        this.loading = false;
        console.log(data);
        this.splitDataIntoChunks(data.results);
        this.submitted = false;
      },
      error => {
        this.loading = false;
        console.log('Error occurred. Please try Again!');
      })
    }
  }

  splitDataIntoChunks(results: ImageInfo[]) {
    if (results?.length) {
      const chunkSize = Math.floor(results.length/this.numOfCols);
      this.searchResult = Array(this.numOfCols).fill(null).map((val, index) => {
        if (index === this.numOfCols-1) {
          return results.slice(index * chunkSize, results.length)
        } else {
          return results.slice(index * chunkSize, ++index * chunkSize);
        }
      })
    }

    console.log(this.searchResult);

  }

}
