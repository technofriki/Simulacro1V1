import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoDetail } from './producto-detail';

describe('ProductoDetail', () => {
  let component: ProductoDetail;
  let fixture: ComponentFixture<ProductoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
