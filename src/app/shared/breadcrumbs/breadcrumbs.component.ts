import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter} from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

titulo: string;
descripcion: string; 

  /// importamos el router , el router maneja eventos 
  // es un observable que regresa muchas cosas 
  // nos subscribimos  a los eventos ( linea de datos )
  // en el console log veremos titulo y descripcion 

  // filter : el ActivationEnd es lo que viene en la subscripcion del event 


  //// CLASE TITLE la importamos de platform 



  constructor(
    private router: Router, 
    private title: Title,
    private meta: Meta
    ) { 

   this.obtenerRutas().subscribe(data=>{
      //console.log(data);
      this.titulo = data.titulo;
      this.descripcion = data.descripcion
      this.title.setTitle(this.titulo); // con esto seteo el titulo en la solapa del navegador 
    
    
      const metaTag: MetaDefinition = {

        name: this.titulo,
        content: this.descripcion
    }

    this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {}


  obtenerRutas(){

    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter ((evento: ActivationEnd) => evento.snapshot.firstChild === null),// le pongo el tipo para que tS me ayude 
      map((evento:ActivationEnd)=> evento.snapshot.data)
    )

  }

}

