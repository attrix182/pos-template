import { Component, HostListener } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'os-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
@HostListener('scroll', ['$event'])
export class NavComponent {
  public toggle: boolean = true;
  public activeUrl: string = this.router.url;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         console.log(event.url);
        this.setActiveItem(event.url);
      }
    });
  }

  setActiveItem(item: string) {
    this.clearActives();
    item = item.replace('/', '');
    let element = document.querySelector(`#${item}`) as HTMLElement;
    element.classList.add('active');
  }

  clearActives() {
    if (document.querySelector('#navList li.active') !== null) {
      document.querySelector('#navList li.active').classList.remove('active');
    }
   
  }

  toggleSidebar() {
    let element = document.querySelector('.wrapper') as HTMLElement;

    if (this.toggle) {
      element.classList.add('collapsed', 'animate__slideInLeft');
      element.classList.remove('show');
      this.toggle = false;
    } else {
      element.classList.remove('collapsed');
      element.classList.add('show', 'animate__fadeInLeft');
      this.toggle = true;
    }
  }

  goToProducts() {
    this.router.navigateByUrl('/products');
  }

  goToPanel() {
    this.router.navigateByUrl('/panel');
  }

  goToSales() {
    this.router.navigateByUrl('/sales');
  }

  goToConfig() {
    this.router.navigateByUrl('/config');
  }
}
