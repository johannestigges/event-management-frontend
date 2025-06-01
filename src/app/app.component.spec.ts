import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideRouter} from "@angular/router";
import {routes} from "./app-routes";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[
        provideRouter(routes)
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
