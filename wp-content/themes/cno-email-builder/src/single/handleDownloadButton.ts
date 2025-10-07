/* eslint-disable no-alert,no-console */

export default function handleDownloadButton() {
	const downloadButton = document.getElementById( 'download' );
	if ( ! downloadButton ) {
		return;
	}
	downloadButton.addEventListener( 'click', async () => {
		const postId = downloadButton.getAttribute( 'data-post-id' );
		if ( ! postId ) {
			alert( 'Post ID not found.' );
			return;
		}
		try {
			const response = await fetch(
				`/wp-json/cno/v1/html/${ postId }`,
				{}
			);
			if ( ! response.ok ) {
				throw new Error( `Error: ${ response.statusText }` );
			}
			const data = await response.json();
			const blob = new Blob( [ data.html ], { type: 'text/html' } );
			const link = document.createElement( 'a' );
			link.href = URL.createObjectURL( blob );
			link.download = 'email.html';
			document.body.appendChild( link );
			link.click();
			document.body.removeChild( link );
			URL.revokeObjectURL( link.href );
		} catch ( error ) {
			alert( 'Failed to fetch email content.' );
			console.error( error );
		}
	} );
}
