
export default function handleFormSubmission() {
	const sendEmailForm = document.getElementById( 'send-email-form' );
	if ( ! sendEmailForm ) {
		return;
	}
	sendEmailForm.addEventListener( 'submit', async ( e ) => {
		e.preventDefault();
		const emails = document.getElementById(
			'recipient-email'
		) as HTMLInputElement;
		const recipient = emails.value;
		setIsLoading( true );
		try {
			grecaptcha.enterprise.ready( async () => {
				const token = await grecaptcha.enterprise.execute( '6Lft8sYrAAAAAHKlzEUY35Ii37kloEeW4f5MHvoS', { action: 'SUBMIT' } );
				const postId = sendEmailForm.getAttribute( 'data-post-id' );
				const response = await fetch( `/wp-json/cno/v1/post/${ postId }`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': window.cnoData.nonce,
					},
					body: JSON.stringify( {
						recipient_email: recipient,
						token,
					} ),
				} );
				await addAlertDiv( response );
			} );
		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.error( err );
		} finally {
			setIsLoading( false );
		}
	} );
}

function setIsLoading( isLoading:boolean ) {
	const sendEmailButton = document.getElementById( 'send' ) as HTMLButtonElement;
	sendEmailButton.disabled = isLoading;
	sendEmailButton.innerHTML = isLoading
		? `
		<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  		<span role="status">Sending...</span>
		`
		: `Send Test Email`;
}

/**
 * Add an alert div to display success or error message
 * @param response - Response object from fetch API
 */
async function addAlertDiv( response:Response ) {
	let alertDiv = document.getElementById( 'email-alert' );
	if ( ! alertDiv ) {
		alertDiv = document.createElement( 'div' );
		alertDiv.id = 'email-alert';
		document.getElementById( 'send-email-form' )!.insertAdjacentElement( 'afterend', alertDiv );
	}
	const classList = [ 'alert', 'alert-dismissible', 'fade', 'show' ];
	let innerHTML = '';
	if ( response.ok ) {
		classList.push( 'alert-success' );
		innerHTML = 'Email sent successfully.';
	} else {
		classList.push( 'alert-danger' );
		const data = await response.json();
		if ( data && data.message ) {
			innerHTML = data.message;
		} else {
			innerHTML = 'Failed to send email.';
		}
	}
	alertDiv.className = classList.join( ' ' );

	alertDiv.innerHTML = `${ innerHTML } <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
}
