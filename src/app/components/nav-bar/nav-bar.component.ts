import { Component } from '@angular/core';

interface route {
  name: string,
  route: string,
  icon?: string
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  public navLinks: route[] = [
    {
      name: 'Home',
      route: '',
    },
    {
      name: 'About Me',
      route: '/about-me',
    },
    {
      name: 'What is Play Therapy?',
      route: '/what-is-play-therapy',
    },
    {
      name: 'Contact',
      route: '/contact',
    }
  ]

  public openNav() {
    document.getElementById("mySidenav")!.style.width = "100%";
  }

  public closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
  }
}
