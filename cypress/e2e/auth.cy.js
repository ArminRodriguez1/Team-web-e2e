describe("Login", () => {
	it("[Error L-2] invalid credentials", () => {
		cy.visit("/login", {
			failOnStatusCode: false,
		});
		cy.get('input[id="login-email"').type("correo@incorrecto.cl");
		cy.get('input[id="login-password"').type("correo");
		cy.get("button").click();

		cy.get(".text-negative").should("text", "invalid credentials");
	});

	it("[Successful L-1] valid credentials", () => {
		cy.visit("/login", {
			failOnStatusCode: false,
		});
		cy.get('input[id="login-email"').type("j.cortez01@ufromail.cl");
		cy.get('input[id="login-password"').type("e4VgaSDE");
		cy.get("button").click();

		cy.on("url:changed", () => {
			cy.url().should("eq", `${Cypress.config().baseUrl}/`);
		});
	});
});