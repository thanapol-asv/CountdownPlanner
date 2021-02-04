import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FprofilePage } from './fprofile.page';

describe('FprofilePage', () => {
  let component: FprofilePage;
  let fixture: ComponentFixture<FprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
