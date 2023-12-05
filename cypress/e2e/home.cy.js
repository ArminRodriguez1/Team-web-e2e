describe("Home", () => {
	it("[Error H-1] Redirect to /login page when token is not provided", () => {
		cy.visit("/");
		cy.url().should(
			"eq",
			"http://pruebas-soft.s3-website.us-east-2.amazonaws.com/login"
		);
	});
	it("[Successful H-2] Home correct", () => {
		cy.login().then(({ token, user }) => {
		  expect(token).to.exist;
		  expect(user).to.exist;
		  expect(user.name).to.exist;
	  
		  cy.visit("/", {
			failOnStatusCode: false,
		  });
	  
		  cy.get('h2').should('contain', `Welcome ${user.name},`);
		});
	  });
	  
});
