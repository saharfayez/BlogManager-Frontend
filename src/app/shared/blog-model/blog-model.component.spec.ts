import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogModelComponent } from './blog-model.component';

describe('BlogModelComponent', () => {
  let component: BlogModelComponent;
  let fixture: ComponentFixture<BlogModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
