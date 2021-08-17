context('Control Icon', () => {
	before(() => {
		cy.login();
		cy.visit('/app/website');
	});

	function get_dialog_with_icon() {
		return cy.dialog({
			title: 'Icon',
			fields: [{
				label: 'Icon',
				fieldname: 'icon',
				fieldtype: 'Icon'
			}]
		});
	}

	it('should set icon', () => {
		get_dialog_with_icon().as('dialog');
		cy.findByRole('textbox').first().click();

		cy.get('.icon-picker .icon-wrapper[id=active]').first().click();
		cy.findByRole('textbox').first().should('have.value', 'active');
		cy.get('@dialog').then(dialog => {
			let value = dialog.get_value('icon');
			expect(value).to.equal('active');
		});

		cy.get('.icon-picker .icon-wrapper[id=resting]').first().click();
		cy.findByRole('textbox').first().should('have.value', 'resting');
		cy.get('@dialog').then(dialog => {
			let value = dialog.get_value('icon');
			expect(value).to.equal('resting');
		});
	});

	it('search for icon and clear search input', () => {
		let search_text = 'ed';
		cy.findByRole('searchbox').first().click().type(search_text);
		cy.get('.icon-section .icon-wrapper:not(.hidden)').then(i => {
			cy.get(`.icon-section .icon-wrapper[id*='${search_text}']`).then(icons => {
				expect(i.length).to.equal(icons.length);
			});
		});

		cy.findByRole('searchbox').clear().blur();
		cy.get('.icon-section .icon-wrapper').should('not.have.class', 'hidden');
	});

});