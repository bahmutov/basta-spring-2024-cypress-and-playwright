import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// import { beforeEach, describe, expect } from '@jest/globals';
import { NewsletterComponent } from './newsletter.component';
import { createMock } from '@testing-library/angular/jest-utils';
import { HttpClient } from '@angular/common/http';
import { asyncScheduler, scheduled } from 'rxjs';

describe('NewsletterComponent', () => {
  let component: NewsletterComponent;
  let fixture: ComponentFixture<NewsletterComponent>;
  const httpClient = createMock(HttpClient);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewsletterComponent],
      providers: [{ provide: HttpClient, useValue: httpClient }],
    });
    fixture = TestBed.createComponent(NewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not subscribe with DOM interaction', () => {
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    const messageBox = fixture.debugElement.query(By.css('p'))
      .nativeElement as HTMLParagraphElement;
    fixture.detectChanges();
    expect(messageBox.textContent).toBe('Please provide an email');
  });

  it('should subscribe with DOM interaction', fakeAsync(() => {
    httpClient.post.mockReturnValue(scheduled([true], asyncScheduler));
    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    input.value = 'user@host.com';
    input.dispatchEvent(new CustomEvent('input')); // DOM Events

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    const messageBox = fixture.debugElement.query(By.css('p'))
      .nativeElement as HTMLParagraphElement;

    tick(); // Asynchrony
    fixture.detectChanges(); // CD

    expect(messageBox.textContent).toBe('Thank you for your subscription');
  }));

  describe.skip('unit testing style', () => {
    it('should subscribe without DOM interaction', () => {
      component.formGroup.setValue({ email: 'user@host.com' });
      component.handleSubmit();
      expect(component.message()).toBe('Thank you for your subscription');
    });

    it('should not subscribe without DOM interaction', () => {
      component.handleSubmit();
      expect(component.message()).toBe('Please provide an email');
    });

    it('should subscribe in mixed mode', () => {
      const input = fixture.debugElement.query(By.css('input'))
        .nativeElement as HTMLInputElement;
      input.value = 'user@host.com';
      input.dispatchEvent(new CustomEvent('input'));

      component.handleSubmit();
      fixture.detectChanges();
      const messageBox = fixture.debugElement.query(By.css('p'))
        .nativeElement as HTMLParagraphElement;
      expect(messageBox.textContent).toBe('Thank you for your subscription');
    });
  });
});
