import { useState } from 'react'
import { Check, Info, User, Lock, LogOut, ChevronDown } from 'lucide-react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { useUpdateCheck } from '../hooks/useUpdateCheck'
import { useI18n } from '../hooks/useI18n'
import { renderMarkdown } from '../utils/markdown'

declare const __APP_VERSION__: string

type Tab = 'dashboard' | 'tools'

interface Props {
	activeTab?: Tab | null
	onTabChange?: (tab: Tab) => void
	username?: string
	authDisabled?: boolean
	onLogout?: () => void
	onPasswordChange?: () => void
}

export function Header({ activeTab, onTabChange, username, authDisabled, onLogout, onPasswordChange }: Props) {
	const [userMenuOpen, setUserMenuOpen] = useState(false)
	const [langMenuOpen, setLangMenuOpen] = useState(false)
	const {
		hasUpdate,
		latestVersion,
		releaseNotes,
		releaseUrl,
		isLoading: updateLoading,
		error: updateError,
	} = useUpdateCheck()
	const { t, locale, setLocale } = useI18n()

	const languages = [
		{ code: 'en', label: 'English' },
		{ code: 'zh-CN', label: '简体中文' },
	]

	return (
		<header className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-3">
					<img src="/logo.svg" alt="qbitwebui" className="w-8 h-8" />
					<span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
						qbitwebui
					</span>
				</div>
				<div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
					{[
						{ id: 'dashboard' as Tab, label: t('header.dashboard') },
						{ id: 'tools' as Tab, label: t('header.tools') },
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() => onTabChange?.(tab.id)}
							className="px-3 py-1 rounded-md text-xs font-medium transition-all"
							style={{
								backgroundColor: activeTab === tab.id ? 'var(--bg-primary)' : 'transparent',
								color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-muted)',
								boxShadow: activeTab === tab.id ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
							}}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>
			<div className="flex items-center gap-3">
				<div className="relative">
					<button
						onClick={() => setLangMenuOpen(!langMenuOpen)}
						className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors"
						style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}
						title={t('settingsBehavior.language')}
					>
						<span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
							{languages.find((l) => l.code === locale)?.label || 'English'}
						</span>
						<ChevronDown
							className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`}
							style={{ color: 'var(--text-muted)' }}
							strokeWidth={2}
						/>
					</button>
					{langMenuOpen && (
						<>
							<div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)} />
							<div
								className="absolute right-0 top-full mt-2 z-20 w-48 py-1 rounded-lg border shadow-xl overflow-hidden"
								style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}
							>
								{languages.map((lang) => (
									<button
										key={lang.code}
										onClick={() => {
											setLocale(lang.code)
											setLangMenuOpen(false)
										}}
										className="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors"
										style={{
											backgroundColor:
												locale === lang.code ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
											color: locale === lang.code ? 'var(--accent)' : 'var(--text-secondary)',
										}}
									>
										<span className="text-xs font-medium truncate">{lang.label}</span>
										{locale === lang.code && <Check className="w-3 h-3 ml-auto shrink-0" strokeWidth={3} />}
									</button>
								))}
							</div>
						</>
					)}
				</div>
				<ThemeSwitcher />
				<div className="relative group">
					<div
						className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono"
						style={{
							backgroundColor: 'var(--bg-tertiary)',
							borderColor: 'var(--border)',
							color: 'var(--text-muted)',
						}}
						title={hasUpdate ? t('header.updateAvailable', { version: latestVersion }) : t('header.upToDate')}
						tabIndex={0}
					>
						v{__APP_VERSION__}
						{hasUpdate ? (
							<Info className="w-3.5 h-3.5" style={{ color: 'var(--warning)' }} strokeWidth={2} />
						) : (
							<Check className="w-3.5 h-3.5" style={{ color: '#a6e3a1' }} strokeWidth={2.5} />
						)}
					</div>
					<div className="absolute right-0 top-full mt-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition">
						<div
							className="w-80 max-h-80 overflow-auto rounded-lg border shadow-xl p-3"
							style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
						>
							<div className="flex items-center justify-between mb-2">
								<span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
									{t('header.releaseNotes')}
									{latestVersion ? ` v${latestVersion}` : ''}
								</span>
								{releaseUrl && (
									<a
										href={releaseUrl}
										target="_blank"
										rel="noreferrer"
										className="text-[10px] uppercase tracking-wide"
										style={{ color: 'var(--accent)' }}
									>
										{t('header.view')}
									</a>
								)}
							</div>
							{updateLoading ? (
								<p className="text-xs" style={{ color: 'var(--text-muted)' }}>
									{t('header.loadingReleaseNotes')}
								</p>
							) : updateError ? (
								<p className="text-xs" style={{ color: 'var(--error)' }}>
									{t('header.failedToLoadReleaseNotes')}
								</p>
							) : releaseNotes ? (
								<div className="space-y-2">{renderMarkdown(releaseNotes)}</div>
							) : (
								<p className="text-xs" style={{ color: 'var(--text-muted)' }}>
									{t('header.noReleaseNotes')}
								</p>
							)}
						</div>
					</div>
				</div>
				{!authDisabled && username && (
					<div className="relative">
						<button
							onClick={() => setUserMenuOpen(!userMenuOpen)}
							className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--bg-tertiary)]"
							style={{ backgroundColor: 'var(--bg-secondary)' }}
						>
							<User className="w-5 h-5" style={{ color: 'var(--text-muted)' }} strokeWidth={1.5} />
						</button>
						{userMenuOpen && (
							<>
								<div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
								<div
									className="absolute right-0 top-full mt-2 z-20 min-w-[160px] rounded-lg border shadow-lg overflow-hidden"
									style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
								>
									<div className="px-3 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
										<span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
											{username}
										</span>
									</div>
									{onPasswordChange && (
										<button
											onClick={() => {
												setUserMenuOpen(false)
												onPasswordChange()
											}}
											className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-tertiary)] transition-colors flex items-center gap-2"
											style={{ color: 'var(--text-primary)' }}
										>
											<Lock className="w-4 h-4" style={{ color: 'var(--text-muted)' }} strokeWidth={1.5} />
											{t('header.changePassword')}
										</button>
									)}
									{onLogout && (
										<button
											onClick={() => {
												setUserMenuOpen(false)
												onLogout()
											}}
											className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-tertiary)] transition-colors flex items-center gap-2"
											style={{ color: 'var(--error)' }}
										>
											<LogOut className="w-4 h-4" strokeWidth={1.5} />
											{t('header.logout')}
										</button>
									)}
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</header>
	)
}
