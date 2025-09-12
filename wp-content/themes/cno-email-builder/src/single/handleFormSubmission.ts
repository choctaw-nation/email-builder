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
		const htmlContent = window.cnoData.content;
		setIsLoading( true );
		try {
			const response = await fetch( '/wp-json/cno/v1/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( {
					recipient_email: recipient,
					content: htmlContent,
				} ),
			} );
			addAlertDiv( response );
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
function addAlertDiv( response:Response ) {
	let alertDiv = document.getElementById( 'email-alert' );
	if ( ! alertDiv ) {
		alertDiv = document.createElement( 'div' );
		alertDiv.id = 'email-alert';
		document.getElementById( 'send-email-form' )!.insertAdjacentElement( 'afterend', alertDiv );
	}
	const classList = [ 'alert', 'alert-dismissible', 'fade', 'show' ];
	if ( response.ok ) {
		classList.push( 'alert-success' );
	} else {
		classList.push( 'alert-danger' );
	}
	alertDiv.className = classList.join( ' ' );

	const innerHTML = response.ok ? 'Email sent successfully.' : 'Failed to send email.';
	alertDiv.innerHTML = `${ innerHTML } <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
}
