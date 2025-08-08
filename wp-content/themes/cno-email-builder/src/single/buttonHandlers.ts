window.addEventListener( 'DOMContentLoaded', () => {
	const downloadButton = document.getElementById( 'download' );
	if ( downloadButton ) {
		downloadButton.addEventListener( 'click', () => {
			const htmlContent = window.cnoData.content;
			const blob = new Blob( [ htmlContent ], { type: 'text/html' } );
			const link = document.createElement( 'a' );
			link.href = URL.createObjectURL( blob );
			link.download = 'email.html';
			document.body.appendChild( link );
			link.click();
			document.body.removeChild( link );
			URL.revokeObjectURL( link.href );
		} );
	}

	const sendEmailForm = document.getElementById( 'send-email-form' );
	if ( sendEmailForm ) {
		sendEmailForm.addEventListener( 'submit', async ( e ) => {
			e.preventDefault();
			const extraEmail = document.getElementById(
				'recipient-email'
			) as HTMLInputElement;
			const recipient = extraEmail.value;
			const htmlContent = window.cnoData.content;
			const response = await fetch( '/wp-json/cno/v1/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-NONCE': window.cnoData.nonce,
				},
				body: JSON.stringify( {
					recipient_email: recipient,
					content: htmlContent,
				} ),
			} );
			let alertDiv = document.getElementById( 'email-alert' );
			if ( ! alertDiv ) {
				alertDiv = document.createElement( 'div' );
				alertDiv.id = 'email-alert';
				sendEmailForm.insertAdjacentElement( 'afterend', alertDiv );
			}
			if ( response.ok ) {
				alertDiv.innerHTML =
					'<div class="alert alert-success alert-dismissible fade show" role="alert">Email sent successfully.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
			} else {
				alertDiv.innerHTML =
					'<div class="alert alert-danger alert-dismissible fade show" role="alert">Failed to send email.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
			}
		} );
	}
} );
