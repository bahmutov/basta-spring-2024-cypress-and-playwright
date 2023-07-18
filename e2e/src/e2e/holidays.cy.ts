describe('misc', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should count the holidays according to the API', () => {
    let holidaysCount = 0;
    cy.request('https://api.eternal-holidays.net/holiday').then(
      (res) => (holidaysCount = res.body.length)
    );
    cy.openMenu('Holidays');
    cy.get('app-holiday-card').should(($cards) =>
      expect($cards).to.have.lengthOf(holidaysCount)
    );
  });
});
