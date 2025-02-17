import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApisPokemonComponent } from './apis-pokemon.component';

describe('ApisPokemonComponent', () => {
  let component: ApisPokemonComponent;
  let fixture: ComponentFixture<ApisPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApisPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApisPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
