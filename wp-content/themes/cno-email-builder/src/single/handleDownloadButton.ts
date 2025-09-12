export default function handleDownloadButton() {
	const downloadButton = document.getElementById( 'download' );
	if ( ! downloadButton ) {
		return;
	}
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
