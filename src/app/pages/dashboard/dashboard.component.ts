import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {



  constructor(private logger: NGXLogger) {}
  

  ngOnInit() {

  }

  log(lvl){

    switch(lvl) {

      case 0 : 
      this.logger.debug('mensaje debug');
      break;

      case 1 : 
      this.logger.info('mensaje info');
      break;

      case 2 : 
      this.logger.log('mensaje log');
      break;

      case 3 : 
      this.logger.warn('mensaje warn');
      break;

      case 4 : 
      this.logger.error('mensaje error, tenemos un gran problema');
      break;

    }
  }

}
