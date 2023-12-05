describe("Club", () => {
	it("[SUCCESS C-1] club details", () => {
		cy.login().then((token) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get(`div[id=${clubes[0]._id}]`).click();
				cy.get('span[class="text-h3"]').contains(clubes[0].name);
			});
		});
	});

	it("[INVALID C-2] invalid token",()=>{
		cy.visit('/');
    	cy.url().should('include', '/login');
	});

/*	it("[SUCCESS C-3] add member",()=>{
		cy.login().then((token) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get(`div[id=${clubes[0]._id}]`).click();	
			});
			cy.get(`div[for="add-member"]`).click({ multiple: true });
				cy.get(`input[name="member-name"]`).type("Armin");
				cy.get(`input[name="member-lastname"]`).type("Mayorga");
				cy.get(`input[name="member-email"]`).type("aehter@gmail.com");
				cy.get(`button[class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable text-primary"]`).click();
				cy.get('table td').eq(2).should('contain.text',"Armin Mayorga");
		});
	});
*/
	it("[INVALID C-4] email invalid",()=>{
		cy.login().then((token) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get(`div[id=${clubes[0]._id}]`).click();	
			});
			cy.get(`div[for="add-member"]`).click({ multiple: true });
				cy.get(`input[name="member-name"]`).type("Armin");
				cy.get(`input[name="member-lastname"]`).type("Mayorga");
				cy.get(`button[class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable text-primary"]`).click();
				cy.get('p').should('contain.text',"email is required and must be a valid email");
		});
	});

	it("[SUCCESS C-5] member delete",()=>{
		cy.login().then((token) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get(`div[id=${clubes[0]._id}]`).click();	
			});
			cy.get('button[class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--rounded text-negative q-btn--actionable q-focusable q-hoverable q-btn--dense"]').click({ multiple: true });
			cy.get('div[role="alert"]').should('exist');
		});
	});
});
