import { Component } from '@angular/core';
import { HeroSectionComponent } from "./hero-section/hero-section.component";

@Component({
    selector: 'app-content',
    standalone: true,
    templateUrl: './content.component.html',
    styleUrl: './content.component.scss',
    imports: [HeroSectionComponent]
})
export class ContentComponent {

}
