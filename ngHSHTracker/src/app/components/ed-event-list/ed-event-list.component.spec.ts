import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdEventListComponent } from './ed-event-list.component';

describe('EdEventListComponent', () => {
  let component: EdEventListComponent;
  let fixture: ComponentFixture<EdEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdEventListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
