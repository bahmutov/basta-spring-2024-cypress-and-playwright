import { NewsletterComponent } from '@app/newsletter/newsletter.component';
import { provideHttpClient } from '@angular/common/http';
import { mount } from 'cypress/angular';
import { Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { fromCustomer } from '@app/customer/+state/customer.selectors';

it('should subscribe', () => {
  cy.intercept('http://some.host.com/newsletter/subscribe', { body: true });
  mount(NewsletterComponent, {
    providers: [provideHttpClient()],
  });

  cy.get('[data-testid=inp-email]').type('user@host.com');
  cy.get('[data-testid=btn-subscribe]').click();
  cy.get('[data-testid=p-message]')
    .should('have.text', 'Thank you for your subscription')
    .and(() => {
      expect(
        TestBed.inject(Store).select(fromCustomer.selectAll)
      ).to.have.length(10);
    });
});
