import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IActionResponse, IDerivedDataFilter, RestApiService } from '../../services/rest-api.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-picture-maker',
  imports: [],
  templateUrl: './picture-maker.html',
  styleUrl: './picture-maker.css'
})
export class PictureMaker {
[x: string]: any;
  sourceData$ = {} as IActionResponse;
  processData$ = {} as IActionResponse;
  
  constructor(private api: RestApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }    

  loadData() {
    let filter: IDerivedDataFilter = { 
      name: "Combined NCP (Miniature)", 
      compressedData: ""
    };
    this.api.getToken()
    .pipe(
      switchMap(token => {        
        this.api.setToken(token.access_token);
        return this.api.getPictureMakerSourceData(filter);
      }))
    .pipe(
      switchMap(response => {        
        //console.log("API|getPictureMakerSourceData():", response);
        this.sourceData$ = response;
        filter.compressedData = response.content;        
        return this.api.getPictureMakerProcessData(filter);
      }))
    .subscribe({ 
        next: response => {
          //console.log("API|getPictureMakerProcessData():", response);
          this.processData$ = response;
          this.cdr.detectChanges();
      },
      error: error => console.error(`API|Error: ${error}`),
      complete: () => console.log(`API|End of process`)
    });
  }
}
