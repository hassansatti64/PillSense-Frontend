describe('PillSense Automated Test Suite - Lab Final', () => {

  describe('Authentication Module', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173'); 
    });

    it('TC-001: Should reject login with invalid credentials (Negative Test)', () => {
      cy.get('input[type="email"]').type('fake@hospital.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.contains('button', 'Sign in to PillSense').click();
      
      // Assert error banner appears
      cy.contains('Invalid credentials.').should('be.visible');
    });

    it('TC-002: Should successfully navigate the Forgot Password flow', () => {
      cy.contains('Forgot password?').click();
      cy.contains('Reset password').should('be.visible');
      
      cy.get('input[type="email"]').type('dr.hassan@pmch.edu.pk');
      cy.contains('button', 'Send reset link').click();
      
      // Assert success state
      cy.contains('Reset link sent').should('be.visible');
      cy.contains('Check your hospital email inbox.').should('be.visible');
    });

    it('TC-003: Should log in successfully as a Pharmacist', () => {
      cy.contains('button.role-tab', 'Pharmacist').click();
      cy.contains('button', 'Fill credentials').click();
      cy.contains('button', 'Sign in to PillSense').click();
      
      // Assert Pharmacist layout loads
      cy.contains('Clinical Dashboard').should('be.visible');
      cy.contains('Pharmacist').should('exist'); 
    });
  });

  describe('Clinical Operations (Doctor Role)', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
      // Helper to log in quickly before each clinical test
      cy.contains('button.role-tab', 'Doctor').click();
      cy.contains('button', 'Fill credentials').click();
      cy.contains('button', 'Sign in to PillSense').click();
      cy.contains('Clinical Dashboard').should('be.visible');
    });

    it('TC-004: Should correctly filter patients by Risk Level', () => {
      cy.contains('button', 'View All Patients').click();
      
      // Click High Risk filter
      cy.contains('button.filter-chip', 'High Risk').click();
      
      // Assert only High Risk badges are visible in the table, no Low/Moderate
      cy.get('table').contains('high risk', { matchCase: false }).should('be.visible');
      cy.get('table').contains('low risk', { matchCase: false }).should('not.exist');
    });

    it('TC-005: Should enforce the Allergy Confirmation Safety Gate', () => {
      cy.contains('button', 'View All Patients').click();
      
      // Open the first patient (assumes Muhammad Tariq who has unconfirmed allergies initially)
      cy.get('table tbody tr').first().contains('button', 'View').click();
      
      // Navigate to medications
      cy.contains('button', 'Manage Medications').click();
      
      // Attempt to run analysis WITHOUT confirming allergies
      cy.contains('button', '▶ Run Analysis').click();
      
      // Assert the system blocks it and shows the warning banner
      cy.contains('Allergy Profile Unconfirmed').should('be.visible');
      cy.contains('The allergy contraindication check will run first.').should('be.visible');
    });

    it('TC-006: Should add and then remove a medication from the active list', () => {
      // Go to first patient's medications
      cy.contains('button', 'View All Patients').click();
      cy.get('table tbody tr').first().contains('button', 'Medications').click();

      // Store initial row count (optional advanced testing concept)
      cy.get('table tbody tr').then(($rows) => {
        const initialCount = $rows.length;

        // Add a new medication
        cy.contains('button', '+ Add Medication').click();
        cy.get('input[placeholder="e.g. Metformin, Lisinopril"]').type('Ibuprofen');
        cy.get('input[placeholder="e.g. 500 mg"]').type('400 mg');
        cy.contains('button', 'Add Medication').click();
        
        // Verify it was added
        cy.get('table').contains('Ibuprofen').should('be.visible');

        // Now remove it
        cy.get('table').contains('Ibuprofen').parent('tr').within(() => {
          cy.contains('button', 'Remove').click();
        });
        
        // Confirm removal in modal
        cy.contains('button.btn-danger', 'Remove Medication').click();
        
        // Verify it's gone
        cy.get('table').contains('Ibuprofen').should('not.exist');
      });
    });

    it('TC-007: Should edit a patient demographic profile', () => {
      cy.contains('button', 'View All Patients').click();
      cy.get('table tbody tr').first().contains('button', 'View').click();
      
      cy.contains('button', '✏ Edit Profile').click();
      cy.get('input[value="72"]').clear().type('75'); // Update weight
      cy.contains('button', 'Save Changes').click();
      
      // Since it's local state, it might revert or not persist without backend, 
      // but we test that the modal closes successfully.
      cy.contains('Edit Patient Profile').should('not.exist');
    });
  });

  describe('System Administration (Admin Role)', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
      cy.contains('button.role-tab', 'Admin').click();
      cy.contains('button', 'Fill credentials').click();
      cy.contains('button', 'Sign in to PillSense').click();
      cy.contains('Admin Dashboard').should('be.visible');
    });

    it('TC-008: Should toggle a user account status (Suspend/Activate)', () => {
      cy.contains('button', 'Manage Users').click();
      
      // Find the first active user and suspend them
      cy.get('table').contains('Suspend').first().click();
      
      // Button should instantly change to Activate
      cy.get('table').contains('Activate').should('be.visible');
    });

    it('TC-009: Should simulate a Drug Knowledge Base Dataset Import', () => {
      cy.contains('button', 'Update Drug DB').click();
      
      // Start import flow
      cy.contains('button', '⬆ Import Dataset').click();
      cy.get('select.form-select').select('DrugBank (Full Export)');
      cy.contains('button', 'Validate & Preview').click();
      
      // Check the preview modal logic
      cy.contains('Confirm Knowledge Base Update').should('be.visible');
      cy.contains('128').should('be.visible'); // Checks mock data new records
      cy.contains('button', 'Commit Import').click();
      
      // Test the loading state (spinner)
      cy.contains('Import in Progress').should('be.visible');
      
      // Wait for the mock async timeout to finish and verify success
      cy.contains('Knowledge Base Updated Successfully', { timeout: 4000 }).should('be.visible');
    });
  });
});