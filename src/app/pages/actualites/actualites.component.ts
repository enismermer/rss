import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  imports: [NgFor, HttpClientModule],
  styleUrls: ['./actualites.component.scss'],
  standalone: true,
})
export class ActualitesComponent implements OnInit {
  region: string = '';
  rssItems: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.region = params.get('region') || '';

      let feedUrl = '';

      switch (this.region) {
        case 'asie-pacifique':
          feedUrl = 'https://api.allorigins.win/raw?url=https://www.lemonde.fr/asie-pacifique/rss_full.xml';
          break;
        case 'europe':
          feedUrl = 'https://api.allorigins.win/raw?url=https://www.lemonde.fr/europe/rss_full.xml';
          break;
        case 'ameriques':
          feedUrl = 'https://api.allorigins.win/raw?url=https://www.lemonde.fr/ameriques/rss_full.xml';
          break;
        case 'afrique':
          feedUrl = 'https://api.allorigins.win/raw?url=https://www.lemonde.fr/afrique/rss_full.xml';
          break;
        case 'proche-orient':
          feedUrl = 'https://api.allorigins.win/raw?url=https://www.lemonde.fr/proche-orient/rss_full.xml';
          break;
        case 'royaume-uni':
          feedUrl = 'https://api.allorigins.win/raw?url=https://www.lemonde.fr/royaume-uni/rss_full.xml';
          break;
        case 'etats-unis':
          feedUrl = 'https://api.allorigins.win/raw?url=https://www.lemonde.fr/etats-unis/rss_full.xml';
          break;
        default:
          feedUrl = '';
      }

      if (feedUrl) {
        this.loadRSS(feedUrl);
      }
    });
  }

  async loadRSS(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const data = await response.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'text/xml');
      const items = Array.from(xml.querySelectorAll('item'));

      this.rssItems = items.map(item => ({
        title: item.querySelector('title')?.textContent,
        link: item.querySelector('link')?.textContent,
        description: item.querySelector('description')?.textContent,
        pubDate: item.querySelector('pubDate')?.textContent,
        media: item.querySelector('content')?.getAttribute('url'), // Ajout de l'élément media
      }));
    } catch (error) {
      console.error('Erreur lors du changement du flux RSS :', error);
    };
  }
}

