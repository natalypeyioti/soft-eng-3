import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Services } from '../providers/services';

interface NavItem {
  text: string;
  route: string;
  canAccess: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  headerLinks: NavItem[] = [
    { text: 'Points', route: 'sessionsPerPoint', canAccess: 'stationadmin' }
    , { text: 'Stations', route: 'sessionsPerStation', canAccess: 'stationadmin' }
    , { text: 'Providers', route: 'sessionsPerProvider', canAccess: 'stationadmin' }
    , { text: 'Sessions Per EV', route: 'sessionsPerEV', canAccess: 'owner' }
    , { text: 'Charge', route: 'charge', canAccess: 'owner' }
    , { text: 'Map', route: '/', canAccess: 'owner' }
    , { text: 'Invoice', route: '/', canAccess: 'owner,stationadmin' }
    , { text: 'Logout', route: '/', canAccess: 'owner,stationadmin' }
  ];
  constructor(private services: Services, private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url)
  }

  showNavItems(): boolean {
    return !(
      this.router.url == '/'
      || this.router.url == '/login'
      || this.router.url == '/landing'
      || this.router.url == '/owner'
      || this.router.url == '/stationAdmin'
    );
  }

  getNavItemsForUser(): NavItem[] {
    return this.headerLinks.filter(x => x.canAccess.split(',').find(x => x == this.services.getUserRole()))
  }

}
