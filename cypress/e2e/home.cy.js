describe("Home", () => {
	it("[Error H-1] Redirect to /login page when token is not provided", () => {
		cy.visit("/");
		cy.url().should(
			"eq",
			"http://pruebas-soft.s3-website.us-east-2.amazonaws.com/login"
		);
	});

	it("[Success H-2] Correct home using token",()=>{
		cy.login().then(()=>{
			cy.visit("/")
			const user = JSON.parse(localStorage.getItem("user")).user;
			cy.get("h2").contains(`Welcome ${user.name},`)
		});

	});
	it("[Success H-3] Get clubs with token", () => {
		cy.login().then((token) => {
		  cy.getClubs(token).then((clubes) => {
			  cy.visit("/")
			  cy.get("div[class='q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable']")
				.should("have.length", clubes.length);
			})
		});
	  });
	  it("[Success H-4] Add club", () => {
		cy.login().then((token) => {
		  cy.getClubs(token).then((clubsBefore) => {
			const initialClubCount = clubsBefore.length;

			cy.visit("/", {
			  failOnStatusCode: false,
			});

			cy.get('.material-icons:contains("add")').click();
			cy.get('input[aria-label="Club name"]').should("be.visible").type("Club de prueba");
			cy.get('input[aria-label="Club description"]').should("be.visible").type("Descripcion de prueba");
			cy.contains('button', 'Add Club').should("be.visible").click();

			cy.getClubs(token).should((clubsAfter) => {
			  const finalClubCount = clubsAfter.length;
			  expect(finalClubCount).to.eq(initialClubCount + 1);
			});
		  });
		});
	  });
	  
	  it("[Error H-5] Fail to add club due to missing name", () => {
		cy.login().then((token) => {
		  cy.visit("/", {
			failOnStatusCode: false,
		  });
		  cy.get('.material-icons:contains("add")').click();

		  cy.contains('button', 'Add Club').click();
		  cy.contains('p', 'name is required').contains("name is required");
	
		  cy.getClubs(token).should((clubs) => {
			const clubCount = clubs.length;
			expect(clubCount).to.be.greaterThan(0);
		  });
		});
	  });
});
