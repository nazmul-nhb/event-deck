import type { GenericObject, QueryObject } from 'nhb-toolbox/object/types';
import type { ReactNode } from 'react';
import type { Location, To } from 'react-router';

export type LocationState = Location<{
	from?: {
		pathname: string;
	};
}>;

export type TNavLink = { title: ReactNode; path: To; private?: boolean };

export type Theme = 'dark' | 'light' | 'system';

export type ThemeProviderProps = {
	children: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

export type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

export interface DBItem {
	_id: string;
	created_at: string;
	updated_at: string;
}

export interface IQueryParams<T extends GenericObject> extends QueryObject {
	search?: string | number;
	sort_by?: Extract<keyof T, string>;
	sort_order?: 'asc' | 'desc';
	filter?: string;
	page?: number;
	limit?: number;
}
