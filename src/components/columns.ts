export type SortKey =
	| 'name'
	| 'size'
	| 'progress'
	| 'downloaded'
	| 'uploaded'
	| 'dlspeed'
	| 'upspeed'
	| 'ratio'
	| 'state'
	| 'category'
	| 'tags'
	| 'num_seeds'
	| 'num_leechs'
	| 'last_activity'
	| 'save_path'
	| 'tracker'
	| 'seeding_time'
	| 'added_on'
	| 'completion_on'
	| 'eta'

export type ColumnLabelKey =
	| 'progress'
	| 'eta'
	| 'status'
	| 'size'
	| 'downloaded'
	| 'uploaded'
	| 'dlspeed'
	| 'upspeed'
	| 'ratio'
	| 'seeding_time'
	| 'added_on'
	| 'completion_on'
	| 'category'
	| 'tags'
	| 'num_seeds'
	| 'num_leechs'
	| 'last_activity'
	| 'save_path'
	| 'tracker_name'
	| 'tracker'

export interface ColumnDef {
	id: string
	label: string
	sortKey: SortKey | null
}

export function createColumns(t: (key: ColumnLabelKey) => string): ColumnDef[] {
	return [
		{ id: 'progress', label: t('progress'), sortKey: 'progress' },
		{ id: 'eta', label: t('eta'), sortKey: 'eta' },
		{ id: 'status', label: t('status'), sortKey: null },
		{ id: 'size', label: t('size'), sortKey: 'size' },
		{ id: 'downloaded', label: t('downloaded'), sortKey: 'downloaded' },
		{ id: 'uploaded', label: t('uploaded'), sortKey: 'uploaded' },
		{ id: 'dlspeed', label: t('dlspeed'), sortKey: 'dlspeed' },
		{ id: 'upspeed', label: t('upspeed'), sortKey: 'upspeed' },
		{ id: 'ratio', label: t('ratio'), sortKey: 'ratio' },
		{ id: 'seeding_time', label: t('seeding_time'), sortKey: 'seeding_time' },
		{ id: 'added_on', label: t('added_on'), sortKey: 'added_on' },
		{ id: 'completion_on', label: t('completion_on'), sortKey: 'completion_on' },
		{ id: 'category', label: t('category'), sortKey: 'category' },
		{ id: 'tags', label: t('tags'), sortKey: 'tags' },
		{ id: 'num_seeds', label: t('num_seeds'), sortKey: 'num_seeds' },
		{ id: 'num_leechs', label: t('num_leechs'), sortKey: 'num_leechs' },
		{ id: 'last_activity', label: t('last_activity'), sortKey: 'last_activity' },
		{ id: 'save_path', label: t('save_path'), sortKey: 'save_path' },
		{ id: 'tracker_name', label: t('tracker_name'), sortKey: 'tracker' },
		{ id: 'tracker', label: t('tracker'), sortKey: 'tracker' },
	]
}

export const DEFAULT_VISIBLE_COLUMNS = new Set([
	'progress',
	'status',
	'downloaded',
	'uploaded',
	'dlspeed',
	'upspeed',
	'ratio',
	'seeding_time',
	'added_on',
])

export const DEFAULT_COLUMN_ORDER = [
	'progress',
	'eta',
	'status',
	'size',
	'downloaded',
	'uploaded',
	'dlspeed',
	'upspeed',
	'ratio',
	'seeding_time',
	'added_on',
	'completion_on',
	'category',
	'tags',
	'num_seeds',
	'num_leechs',
	'last_activity',
	'save_path',
	'tracker_name',
	'tracker',
]

/** Static column IDs for storage validation (customViews, etc.) */
export const COLUMN_IDS = DEFAULT_COLUMN_ORDER
