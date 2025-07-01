export const configs = {
	site_title: 'Event Deck',
	server_api: import.meta.env.VITE_SERVER_API as string,
	token_key: 'event-deck-token',
	user_key: 'event-deck-user',
	theme_name: 'event-deck-theme',
} as const;
