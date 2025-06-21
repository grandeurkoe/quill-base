import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostComponent } from './my-post.component';

describe('MyPostComponent', () => {
  let component: MyPostComponent;
  let fixture: ComponentFixture<MyPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPostComponent]
    });
    fixture = TestBed.createComponent(MyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
