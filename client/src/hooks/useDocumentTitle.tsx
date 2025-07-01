import { useEffect } from 'react';

/**
 * * Sets document title on mount/update
 * @param title Title for the document page
 */
export function useDocumentTitle(title: string) {
	useEffect(() => {
		document.title = title;
	}, [title]);
}
