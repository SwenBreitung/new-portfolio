import { Component } from '@angular/core';
import { ContentComponent } from "./content/content.component";
import { HeaderComponent } from "./header/header.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    imports: [ContentComponent, HeaderComponent]
})
export class MainComponent {

}
