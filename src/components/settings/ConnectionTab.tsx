import { useTranslation } from 'react-i18next'
import type { QBittorrentPreferences } from '../../types/preferences'
import { Select, Checkbox } from '../ui'

interface Props {
	preferences: Partial<QBittorrentPreferences>
	onChange: (updates: Partial<QBittorrentPreferences>) => void
}

export function ConnectionTab({ preferences, onChange }: Props) {
	const { t } = useTranslation()
	const proxyEnabled = (preferences.proxy_type ?? 0) > 0

	const PROTOCOL_OPTIONS = [
		{ value: 0, label: t('settingsConnection.tcpUtp') },
		{ value: 1, label: t('settingsConnection.tcp') },
		{ value: 2, label: t('settingsConnection.utp') },
	]

	const PROXY_TYPES = [
		{ value: 0, label: t('settingsConnection.none') },
		{ value: 1, label: t('settingsConnection.http') },
		{ value: 2, label: t('settingsConnection.socks5') },
		{ value: 3, label: t('settingsConnection.httpAuth') },
		{ value: 4, label: t('settingsConnection.socks5Auth') },
		{ value: 5, label: t('settingsConnection.socks4') },
	]

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<label className="text-xs w-36 shrink-0" style={{ color: 'var(--text-muted)' }}>
					{t('settingsConnection.peerProtocol')}
				</label>
				<Select
					value={preferences.bittorrent_protocol ?? 0}
					onChange={(v) => onChange({ bittorrent_protocol: v as number })}
					options={PROTOCOL_OPTIONS}
				/>
			</div>

			<div className="h-px" style={{ backgroundColor: 'var(--border)' }} />

			<div>
				<div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
					{t('settingsConnection.port')}
				</div>
				<div className="grid grid-cols-2 gap-3">
					<div className="flex items-center gap-2">
						<label className="text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>
							{t('common.port')}
						</label>
						<input
							type="number"
							value={preferences.listen_port ?? 6881}
							onChange={(e) => onChange({ listen_port: parseInt(e.target.value) || 6881 })}
							className="w-24 px-2 py-1.5 rounded border text-xs font-mono"
							style={{
								backgroundColor: 'var(--bg-tertiary)',
								borderColor: 'var(--border)',
								color: 'var(--text-primary)',
							}}
						/>
						<button
							type="button"
							onClick={() =>
								onChange({ random_port: true, listen_port: Math.floor(Math.random() * (65535 - 49152) + 49152) })
							}
							className="px-2 py-1.5 rounded border text-xs"
							style={{
								backgroundColor: 'var(--bg-tertiary)',
								borderColor: 'var(--border)',
								color: 'var(--text-muted)',
							}}
						>
							{t('settingsConnection.random')}
						</button>
					</div>
					<Checkbox
						label={t('settingsConnection.useUpnp')}
						checked={preferences.upnp ?? true}
						onChange={(v) => onChange({ upnp: v })}
					/>
				</div>
			</div>

			<div className="h-px" style={{ backgroundColor: 'var(--border)' }} />

			<div>
				<div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
					{t('settingsConnection.connectionLimits')}
				</div>
				<div className="grid grid-cols-2 gap-x-6 gap-y-2">
					<div className="flex items-center gap-2">
						<Checkbox
							label={t('settingsConnection.globalMaxConnections')}
							checked={(preferences.max_connec ?? 500) > 0}
							onChange={(v) => onChange({ max_connec: v ? 500 : 0 })}
						/>
						<input
							type="number"
							value={preferences.max_connec ?? 500}
							onChange={(e) => onChange({ max_connec: parseInt(e.target.value) || 0 })}
							className="w-16 px-2 py-1 rounded border text-xs font-mono"
							style={{
								backgroundColor: 'var(--bg-tertiary)',
								borderColor: 'var(--border)',
								color: 'var(--text-primary)',
							}}
						/>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							label={t('settingsConnection.perTorrent')}
							checked={(preferences.max_connec_per_torrent ?? 100) > 0}
							onChange={(v) => onChange({ max_connec_per_torrent: v ? 100 : 0 })}
						/>
						<input
							type="number"
							value={preferences.max_connec_per_torrent ?? 100}
							onChange={(e) => onChange({ max_connec_per_torrent: parseInt(e.target.value) || 0 })}
							className="w-16 px-2 py-1 rounded border text-xs font-mono"
							style={{
								backgroundColor: 'var(--bg-tertiary)',
								borderColor: 'var(--border)',
								color: 'var(--text-primary)',
							}}
						/>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							label={t('settingsConnection.globalUploadSlots')}
							checked={(preferences.max_uploads ?? 8) > 0}
							onChange={(v) => onChange({ max_uploads: v ? 8 : 0 })}
						/>
						<input
							type="number"
							value={preferences.max_uploads ?? 8}
							onChange={(e) => onChange({ max_uploads: parseInt(e.target.value) || 0 })}
							className="w-16 px-2 py-1 rounded border text-xs font-mono"
							style={{
								backgroundColor: 'var(--bg-tertiary)',
								borderColor: 'var(--border)',
								color: 'var(--text-primary)',
							}}
						/>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							label={t('settingsConnection.perTorrent')}
							checked={(preferences.max_uploads_per_torrent ?? 4) > 0}
							onChange={(v) => onChange({ max_uploads_per_torrent: v ? 4 : 0 })}
						/>
						<input
							type="number"
							value={preferences.max_uploads_per_torrent ?? 4}
							onChange={(e) => onChange({ max_uploads_per_torrent: parseInt(e.target.value) || 0 })}
							className="w-16 px-2 py-1 rounded border text-xs font-mono"
							style={{
								backgroundColor: 'var(--bg-tertiary)',
								borderColor: 'var(--border)',
								color: 'var(--text-primary)',
							}}
						/>
					</div>
				</div>
			</div>

			<div className="h-px" style={{ backgroundColor: 'var(--border)' }} />

			<div>
				<div className="flex items-center gap-2 mb-2">
					<Checkbox
						label=""
						checked={preferences.i2p_enabled ?? false}
						onChange={(v) => onChange({ i2p_enabled: v })}
					/>
					<span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
						{t('settingsConnection.i2p')}
					</span>
				</div>
				{preferences.i2p_enabled && (
					<div className="flex items-center gap-4 pl-6">
						<div className="flex items-center gap-2">
							<label className="text-xs" style={{ color: 'var(--text-muted)' }}>
								{t('common.host')}
							</label>
							<input
								type="text"
								value={preferences.i2p_address ?? '127.0.0.1'}
								onChange={(e) => onChange({ i2p_address: e.target.value })}
								className="w-28 px-2 py-1.5 rounded border text-xs"
								style={{
									backgroundColor: 'var(--bg-tertiary)',
									borderColor: 'var(--border)',
									color: 'var(--text-primary)',
								}}
							/>
						</div>
						<div className="flex items-center gap-2">
							<label className="text-xs" style={{ color: 'var(--text-muted)' }}>
								{t('common.port')}
							</label>
							<input
								type="number"
								value={preferences.i2p_port ?? 7656}
								onChange={(e) => onChange({ i2p_port: parseInt(e.target.value) || 7656 })}
								className="w-20 px-2 py-1.5 rounded border text-xs font-mono"
								style={{
									backgroundColor: 'var(--bg-tertiary)',
									borderColor: 'var(--border)',
									color: 'var(--text-primary)',
								}}
							/>
						</div>
						<Checkbox
							label={t('settingsConnection.mixedMode')}
							checked={preferences.i2p_mixed_mode ?? false}
							onChange={(v) => onChange({ i2p_mixed_mode: v })}
						/>
					</div>
				)}
			</div>

			<div className="h-px" style={{ backgroundColor: 'var(--border)' }} />

			<div>
				<div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
					{t('settingsConnection.proxyServer')}
				</div>
				<div className="flex items-center gap-3 mb-3">
					<Select
						value={preferences.proxy_type ?? 0}
						onChange={(v) => onChange({ proxy_type: v as number })}
						options={PROXY_TYPES}
						minWidth="140px"
					/>
					{proxyEnabled && (
						<>
							<input
								type="text"
								value={preferences.proxy_ip ?? ''}
								onChange={(e) => onChange({ proxy_ip: e.target.value })}
								placeholder={t('common.host')}
								className="flex-1 px-2 py-1.5 rounded border text-xs"
								style={{
									backgroundColor: 'var(--bg-tertiary)',
									borderColor: 'var(--border)',
									color: 'var(--text-primary)',
								}}
							/>
							<input
								type="number"
								value={preferences.proxy_port ?? 8080}
								onChange={(e) => onChange({ proxy_port: parseInt(e.target.value) || 8080 })}
								placeholder={t('common.port')}
								className="w-20 px-2 py-1.5 rounded border text-xs font-mono"
								style={{
									backgroundColor: 'var(--bg-tertiary)',
									borderColor: 'var(--border)',
									color: 'var(--text-primary)',
								}}
							/>
						</>
					)}
				</div>

				{proxyEnabled && (
					<div className="space-y-2 pl-2">
						<Checkbox
							label={t('settingsConnection.hostnameLookup')}
							checked={preferences.proxy_hostname_lookup ?? false}
							onChange={(v) => onChange({ proxy_hostname_lookup: v })}
						/>
						<div className="p-2 rounded space-y-2" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
							<Checkbox
								label={t('settingsConnection.authentication')}
								checked={preferences.proxy_auth_enabled ?? false}
								onChange={(v) => onChange({ proxy_auth_enabled: v })}
							/>
							{preferences.proxy_auth_enabled && (
								<div className="flex items-center gap-3 pl-6">
									<input
										type="text"
										value={preferences.proxy_username ?? ''}
										onChange={(e) => onChange({ proxy_username: e.target.value })}
										placeholder={t('common.username')}
										className="w-32 px-2 py-1.5 rounded border text-xs"
										style={{
											backgroundColor: 'var(--bg-secondary)',
											borderColor: 'var(--border)',
											color: 'var(--text-primary)',
										}}
									/>
									<input
										type="password"
										value={preferences.proxy_password ?? ''}
										onChange={(e) => onChange({ proxy_password: e.target.value })}
										placeholder={t('common.password')}
										className="w-32 px-2 py-1.5 rounded border text-xs"
										style={{
											backgroundColor: 'var(--bg-secondary)',
											borderColor: 'var(--border)',
											color: 'var(--text-primary)',
										}}
									/>
								</div>
							)}
						</div>
						<div className="grid grid-cols-2 gap-2">
							<Checkbox
								label={t('settingsConnection.useForBittorrent')}
								checked={preferences.proxy_bittorrent ?? true}
								onChange={(v) => onChange({ proxy_bittorrent: v })}
							/>
							{preferences.proxy_bittorrent && (
								<Checkbox
									label={t('settingsConnection.useForPeers')}
									checked={preferences.proxy_peer_connections ?? false}
									onChange={(v) => onChange({ proxy_peer_connections: v })}
								/>
							)}
							<Checkbox
								label={t('settingsConnection.useForRss')}
								checked={preferences.proxy_rss ?? true}
								onChange={(v) => onChange({ proxy_rss: v })}
							/>
							<Checkbox
								label={t('settingsConnection.useForGeneral')}
								checked={preferences.proxy_misc ?? true}
								onChange={(v) => onChange({ proxy_misc: v })}
							/>
						</div>
					</div>
				)}
			</div>

			<div className="h-px" style={{ backgroundColor: 'var(--border)' }} />

			<div>
				<div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
					{t('settingsConnection.ipFiltering')}
				</div>
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Checkbox
							label={t('settingsConnection.filterPath')}
							checked={preferences.ip_filter_enabled ?? false}
							onChange={(v) => onChange({ ip_filter_enabled: v })}
						/>
						<input
							type="text"
							value={preferences.ip_filter_path ?? ''}
							onChange={(e) => onChange({ ip_filter_path: e.target.value })}
							disabled={!preferences.ip_filter_enabled}
							placeholder=".dat, .p2p, .p2b"
							className="flex-1 px-2 py-1.5 rounded border text-xs disabled:opacity-50"
							style={{
								backgroundColor: 'var(--bg-tertiary)',
								borderColor: 'var(--border)',
								color: 'var(--text-primary)',
							}}
						/>
					</div>
					<Checkbox
						label={t('settingsConnection.applyToTrackers')}
						checked={preferences.ip_filter_trackers ?? false}
						onChange={(v) => onChange({ ip_filter_trackers: v })}
					/>
					<div>
						<label className="text-xs mb-1 block" style={{ color: 'var(--text-muted)' }}>
							{t('settingsConnection.bannedIps')}
						</label>
						<textarea
							value={preferences.banned_IPs ?? ''}
							onChange={(e) => onChange({ banned_IPs: e.target.value })}
							rows={3}
							placeholder={t('settingsConnection.onePerLine')}
							className="w-full px-2 py-1.5 rounded border text-xs font-mono resize-none"
							style={{
								backgroundColor: 'var(--bg-tertiary)',
								borderColor: 'var(--border)',
								color: 'var(--text-primary)',
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
