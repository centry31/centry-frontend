import { useParams } from 'react-router';
import { Spinner, Tab, Tabs } from '@heroui/react';
import { Calendar, Settings, Users } from 'lucide-react';

import { useGetSpace } from 'entities/Space';

import { Header } from './Header';
import { MembersTab } from './MembersTab';
import { OverviewTab } from './OverviewTab';
import { SettingsTab } from './SettingTab';
import { TabTitle } from './TabTitle';

export const SpaceDetailsPage = () => {
	const { spaceId = '' } = useParams();

	const { data: space, isLoading } = useGetSpace({ spaceId });

	if (isLoading || !space) {
		return (
			<div className="flex min-h-[50dvh] items-center justify-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-5xl px-3 py-4 sm:px-6 sm:py-6">
			<Header space={space} />

			<Tabs aria-label="space-tabs" className="mt-4">
				<Tab
					key="overview"
					title={<TabTitle icon={<Calendar size={16} />} label="Обзор" />}
				>
					<OverviewTab />
				</Tab>

				<Tab
					key="members"
					title={<TabTitle icon={<Users size={16} />} label="Участники" />}
				>
					<MembersTab spaceId={space.id} />
				</Tab>

				<Tab
					key="settings"
					title={<TabTitle icon={<Settings size={16} />} label="Настройки" />}
				>
					<SettingsTab space={space} />
				</Tab>
			</Tabs>
		</div>
	);
};
