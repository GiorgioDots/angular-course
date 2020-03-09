import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs'; //www.learnrxjs.io
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private obsSubscr: Subscription;
  constructor() { }

  ngOnInit() {
    // this.obsSubscr = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("Count is greater than 3"));
        }
        count++;
        // observer.error();
        // observer.complete();
      }, 1000);
    });

    ;

    this.obsSubscr = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe((count) => {
      console.log(count);
    }, error => {
      console.log(error);
      alert(error.message)
    }, () => {
      console.log("Completed!")
    }
    )
  }

  ngOnDestroy() {
    this.obsSubscr.unsubscribe();
  }

}
