import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket/websocket.service';


@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer-admin.component.html',
  styleUrls: ['./footer-admin.component.css']
})
export class FooterAdminComponent implements OnInit {


  anio: number = new Date().getFullYear();
  
  constructor(public websocketService: WebsocketService) { }

  ngOnInit() {
  }

}
