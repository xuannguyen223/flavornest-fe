import SidebarItem from './SidebarItem';

export const MY_PROFILE_NAV = [
	{
		key: 'EDIT_PROFILE',
		label: 'Edit Your Profile',
		path: '/my-profile/edit-profile',
		isDefault: true,
	},
	{
		key: 'ACCOUNT_SETTINGS',
		label: 'Account Settings',
		path: '/my-profile/account-settings',
	},
	{
		key: 'MY_RECIPES',
		label: 'My Recipes',
		path: '/my-profile/my-recipes',
	},
	{
		key: 'SAVED_RECIPES',
		label: 'Saved Recipes',
		path: '/my-profile/saved-recipes',
	},
] as const;

function SidebarList() {
	return (
		<ul className="space-y-1">
			{MY_PROFILE_NAV.map(item => (
				<SidebarItem
					key={item.key}
					label={item.label}
					to={item.path}
				/>
			))}
		</ul>
	);
}

export default SidebarList;
