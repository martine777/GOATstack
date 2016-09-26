import { Component, OnInit } from '@angular/core';

import { WonderService } from '../../services/wonder.service';

export class Wonder {
    _id: number;
    name: string;
    xcoor: number;
    ycoor: number;
}

@Component({
    selector: 'home-section',
    providers: [WonderService],
    moduleId: module.id,
    templateUrl: 'home.html',
    styleUrls: ['home.css']
})

export class HomeComponent implements OnInit {
    errorMessage: string;
    wonders: Wonder[];

    constructor(private wonderService: WonderService) { }

    ngOnInit() {
        
    }

    getWonders() {
        this.wonderService.getWonders()
            .subscribe(wonders => this.wonders = wonders,
              error => this.errorMessage = <any>error,
              () => {
              console.log(this.wonders);
            });
    }

    testWonders() {
        this.getWonders();
    }
}
