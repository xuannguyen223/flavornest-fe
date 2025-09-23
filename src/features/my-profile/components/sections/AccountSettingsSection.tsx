import { Button } from '@/components/ui/button';
import Sections from '@/features/my-profile/components/sections/Sections';
import FormInput from '@/components/common/FormInput';
import { useState } from 'react';

function AccountSettingsSection() {
	const [email, setEmail] = useState('alinadcruz@example.com');

	return (
		<Sections title="Account Settings">
			<div className="space-y-2">
				<FormInput
					as="input"
					label="Email"
					value={email}
					onChange={setEmail}
					placeholder="Email"
					className="space-y-4"
				/>
			</div>

			<section>
				<p className="text-xs sm:text-sm lg:text-base xl:text-lg text-(--shadow-gray-color)">
					Your security is our priority. Click the button below and we'll send a password reset link
					to your email address.
				</p>
				<Button
					type="submit"
					className="w-full sm:w-auto h-8 sm:h-8 lg:h-10 xl:h-14 font-medium text-sm sm:text-base lg:text-lg xl:text-xl text-white px-4 sm:px-5 py-3 sm:py-4 lg:py-5 xl:py-6 bg-(--primary-color) rounded-full mt-4"
					onClick={() => {}}>
					Reset Password
				</Button>
			</section>
		</Sections>
	);
}

export default AccountSettingsSection;
