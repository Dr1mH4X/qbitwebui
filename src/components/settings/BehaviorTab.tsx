import { useTranslation } from 'react-i18next'
import { FileText } from 'lucide-react'
import type { QBittorrentPreferences } from '../../types/preferences'
import { Toggle, Select, Checkbox } from '../ui'

interface Props {
	preferences: Partial<QBittorrentPreferences>
	onChange: (updates: Partial<QBittorrentPreferences>) => void
}

export function BehaviorTab({ preferences, onChange }: Props) {
	const { t } = useTranslation()

	const LOCALES = [
		{ value: 'en', label: t('locales.en') },
		{ value: 'en_AU', label: t('locales.en-AU') },
		{ value: 'en_GB', label: t('locales.en-GB') },
		{ value: 'de', label: t('locales.de') },
		{ value: 'es', label: t('locales.es') },
		{ value: 'fr', label: t('locales.fr') },
		{ value: 'it', label: t('locales.it') },
		{ value: 'ja', label: t('locales.ja') },
		{ value: 'ko', label: t('locales.ko') },
		{ value: 'nl', label: t('locales.nl') },
		{ value: 'pl', label: t('locales.pl') },
		{ value: 'pt_BR', label: t('locales.ptBR') },
		{ value: 'pt_PT', label: t('locales.ptPT') },
		{ value: 'ru', label: t('locales.ru') },
		{ value: 'tr', label: t('locales.tr') },
		{ value: 'uk', label: t('locales.uk') },
		{ value: 'zh', label: t('locales.zh') },
		{ value: 'zh_TW', label: t('locales.zhTW') },
	]

	const FILE_LOG_AGE_TYPES = [
		{ value: 0, label: t('settingsBehavior.days') },
		{ value: 1, label: t('settingsBehavior.months') },
		{ value: 2, label: t('settingsBehavior.years') },
	]

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
					{t('settingsBehavior.language')}
				</label>
				<Select
					value={preferences.locale ?? 'en'}
					onChange={(v) => onChange({ locale: v })}
					options={LOCALES}
					minWidth="180px"
				/>
			</div>

			<div className="h-px" style={{ backgroundColor: 'var(--border)' }} />

			<div>
				<div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
					{t('settingsBehavior.transferList')}
				</div>
				<Checkbox
					label={t('settingsBehavior.confirmDelete')}
					checked={preferences.confirm_torrent_deletion ?? true}
					onChange={(v) => onChange({ confirm_torrent_deletion: v })}
				/>
			</div>

			<div className="h-px" style={{ backgroundColor: 'var(--border)' }} />

			<div>
				<div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
					{t('settingsBehavior.interface')}
				</div>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					<div className="flex items-center justify-between">
						<span className="text-xs" style={{ color: 'var(--text-muted)' }}>
							{t('settingsBehavior.showExternalIp')}
						</span>
						<Toggle
							checked={preferences.status_bar_external_ip ?? false}
							onChange={(v) => onChange({ status_bar_external_ip: v })}
						/>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-xs" style={{ color: 'var(--text-muted)' }}>
							{t('settingsBehavior.performanceWarning')}
						</span>
						<Toggle
							checked={preferences.performance_warning ?? true}
							onChange={(v) => onChange({ performance_warning: v })}
						/>
					</div>
				</div>
			</div>

			<div className="h-px" style={{ backgroundColor: 'var(--border)' }} />

			<div>
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2">
						<FileText
							className="w-4 h-4"
							style={{ color: preferences.file_log_enabled ? 'var(--accent)' : 'var(--text-muted)' }}
							strokeWidth={1.5}
						/>
						<span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
							{t('settingsBehavior.fileLog')}
						</span>
					</div>
					<Toggle checked={preferences.file_log_enabled ?? false} onChange={(v) => onChange({ file_log_enabled: v })} />
				</div>

				{preferences.file_log_enabled && (
					<div className="space-y-2 pl-6">
						<div>
							<label className="block text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>
								{t('settingsBehavior.logPath')}
							</label>
							<input
								type="text"
								value={preferences.file_log_path ?? ''}
								onChange={(e) => onChange({ file_log_path: e.target.value })}
								className="w-full px-2 py-1.5 rounded border text-xs"
								style={{
									backgroundColor: 'var(--bg-tertiary)',
									borderColor: 'var(--border)',
									color: 'var(--text-primary)',
								}}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div>
								<label className="block text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>
									{t('settingsBehavior.maxSize')}
								</label>
								<input
									type="number"
									value={preferences.file_log_max_size ?? 65}
									onChange={(e) => onChange({ file_log_max_size: parseInt(e.target.value) || 65 })}
									className="w-full px-2 py-1.5 rounded border text-xs font-mono"
									style={{
										backgroundColor: 'var(--bg-tertiary)',
										borderColor: 'var(--border)',
										color: 'var(--text-primary)',
									}}
								/>
							</div>
							<div>
								<label className="block text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>
									{t('settingsBehavior.deleteAfter')}
								</label>
								<input
									type="number"
									value={preferences.file_log_age ?? 1}
									onChange={(e) => onChange({ file_log_age: parseInt(e.target.value) || 1 })}
									className="w-full px-2 py-1.5 rounded border text-xs font-mono"
									style={{
										backgroundColor: 'var(--bg-tertiary)',
										borderColor: 'var(--border)',
										color: 'var(--text-primary)',
									}}
								/>
							</div>
							<div>
								<label className="block text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>
									&nbsp;
								</label>
								<Select
									value={preferences.file_log_age_type ?? 1}
									onChange={(v) => onChange({ file_log_age_type: v })}
									options={FILE_LOG_AGE_TYPES}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							<div className="flex items-center justify-between">
								<span className="text-xs" style={{ color: 'var(--text-muted)' }}>
									{t('settingsBehavior.backupLogFile')}
								</span>
								<Toggle
									checked={preferences.file_log_backup_enabled ?? true}
									onChange={(v) => onChange({ file_log_backup_enabled: v })}
								/>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-xs" style={{ color: 'var(--text-muted)' }}>
									{t('settingsBehavior.deleteOldLogs')}
								</span>
								<Toggle
									checked={preferences.file_log_delete_old ?? true}
									onChange={(v) => onChange({ file_log_delete_old: v })}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
